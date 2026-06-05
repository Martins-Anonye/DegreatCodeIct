// Dropbox file upload utility for admin.html
// Uses Dropbox API v2 (https://www.dropbox.com/developers/documentation/http/documentation)
// Place your Dropbox access token below (for production, use OAuth flow or server proxy)



export async function uploadToDropbox(file, path, accessToken) {
  if (!accessToken) throw new Error('Dropbox not authenticated. Please sign in.');
  const url = 'https://content.dropboxapi.com/2/files/upload';
  const args = {
    path,
    mode: 'add',
    autorename: true,
    mute: false,
    strict_conflict: false
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Dropbox-API-Arg': JSON.stringify(args),
      'Content-Type': 'application/octet-stream'
    },
    body: file
  });
  if (!res.ok) throw new Error('Dropbox upload failed');
  const meta = await res.json();

  // Try to create a shared link
  let linkUrl = '';
  const linkRes = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ path: meta.path_lower, settings: { requested_visibility: 'public' } })
  });
  
  if (linkRes.ok) {
    try {
      const linkMeta = await linkRes.json();
      linkUrl = linkMeta.url;
    } catch (parseErr) {
      console.error('Failed to parse link response:', parseErr);
      throw new Error('Failed to parse Dropbox response');
    }
  } else {
    // If link creation failed, try to read error response
    let errorMsg = 'Unknown error';
    const contentType = linkRes.headers.get('content-type');
    try {
      if (contentType && contentType.includes('application/json')) {
        const linkErrorData = await linkRes.json();
        if (linkErrorData && linkErrorData.error && linkErrorData.error['.tag'] === 'shared_link_already_exists') {
          // Link already exists, fetch it
          const listRes = await fetch('https://api.dropboxapi.com/2/sharing/list_shared_links', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ path: meta.path_lower })
          });
          if (listRes.ok) {
            try {
              const listMeta = await listRes.json();
              if (listMeta && listMeta.links && listMeta.links.length > 0) {
                linkUrl = listMeta.links[0].url;
              }
            } catch (parseErr) {
              console.error('Failed to parse list links response:', parseErr);
              throw new Error('Failed to parse Dropbox response');
            }
          } else {
            const listErrorText = await listRes.text();
            console.error('List links failed:', listErrorText);
            throw new Error('Dropbox link retrieval failed');
          }
        } else {
          errorMsg = linkErrorData?.error?.reason || JSON.stringify(linkErrorData);
          console.error('Dropbox link creation error:', linkErrorData);
        }
      } else {
        errorMsg = await linkRes.text();
        console.error('Dropbox API error (non-JSON):', errorMsg);
      }
    } catch (err) {
      console.error('Error parsing Dropbox response:', err);
      throw new Error('Dropbox link creation failed: ' + (err.message || errorMsg));
    }
    if (!linkUrl) {
      throw new Error('Dropbox link creation failed: ' + errorMsg);
    }
  }
  
  // Return both the share link and the file path for future deletion
  return {
    url: linkUrl.replace('?dl=0', '?raw=1'),
    path: meta.path_lower
  };
}

export async function deleteFromDropbox(dropboxPath, accessToken) {
  if (!accessToken) throw new Error('Dropbox not authenticated. Please sign in.');
  if (!dropboxPath) return; // No path to delete
  
  const url = 'https://api.dropboxapi.com/2/files/delete_v2';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ path: dropboxPath })
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
    console.error('Dropbox delete error:', errorData);
    // Don't throw - file might already be deleted
    return false;
  }
  
  return true;
}

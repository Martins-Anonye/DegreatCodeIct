# Degreatcode ICT LTD online class Tool Manager - Implementation Guide

## Quick Start

### For Testing (Current)
The system is fully functional with Firebase for metadata storage. Files are tracked in the database with all necessary information for later Dropbox integration.

1. **Access Admin Panel:**
   - URL: `/uploader.html`
   - Requires authentication with authorized email
   - Default: `admin@Degreatcode ICT LTD online class.com` (update in code)

2. **Access Download Portal:**
   - URL: `/downloader.html`
   - Public access (no authentication required)
   - Shows all non-expired tools and browsers

### For Full Dropbox Integration

Complete these steps to enable Dropbox file storage:

## Step 1: Create Dropbox App

1. Go to https://www.dropbox.com/developers/apps
2. Click "Create app"
3. Choose "Scoped access"
4. Select "Full Dropbox" access type
5. Name your app (e.g., "Degreatcode ICT LTD online class Tool Manager")
6. Accept terms and create

## Step 2: Get Credentials

1. In your app settings, note:
   - **App key** (Client ID) ,   copy it to be use leta
   - **App secret** (don't share)

2. Set OAuth redirect URI:
   - Add: `https://yourdomain.com/oauth-callback.html`
   - Also add: `https://yourdomain.com/oauth-callback.html?auth=done`

## Step 3: Configure OAuth Handler

Edit `dropbox-oauth-handler.js`:

```javascript
const DROPBOX_OAUTH_CONFIG = {
    clientId: 'YOUR_APP_KEY_HERE',
    redirectUri: window.location.origin + '/oauth-callback.html',
    scope: 'files.metadata.write files.content.write sharing.write',
    // ... rest of config
};
```

## Step 4: Create OAuth Callback Page

Create `oauth-callback.html` in root:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Authenticating...</title>
</head>
<body>
    <p>Authenticating with Dropbox...</p>
    <script type="module">
        import { handleOAuthCallback } from './dropbox-oauth-handler.js';
        
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');
        
        if (error) {
            console.error('OAuth error:', error);
            window.location.href = '/uploader.html?auth=failed';
        } else if (code) {
            handleOAuthCallback(code, state)
                .then(() => window.location.href = '/uploader.html?auth=done')
                .catch(err => window.location.href = '/uploader.html?auth=failed');
        }
    </script>
</body>
</html>
```

## Step 5: Implement File Upload to Dropbox

In `uploader.html`, modify the upload handler to:

1. Get Dropbox token
2. Upload file to Dropbox
3. Generate share link
4. Save metadata to Firebase with share link

Example implementation:

```javascript
// In uploadBtn click handler
const DROPBOX_ACCESS_TOKEN = await getValidDropboxToken();
const dropboxPath = `/tools/${selectedFileType[section]}/${file.name}`;

// Upload to Dropbox
const uploadResponse = await fetch(DROPBOX_CONFIG.api.fileUpload, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({
            path: dropboxPath,
            mode: 'add',
            autorename: true
        }),
        'Content-Type': 'application/octet-stream'
    },
    body: file
});

// Create share link
const shareResponse = await fetch(DROPBOX_CONFIG.api.createSharedLink, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        path: dropboxPath,
        settings: { requested_visibility: 'public' }
    })
});

const shareData = await shareResponse.json();
const shareLink = DROPBOX_CONFIG.getShareableUrl(shareData.url);

// Save to Firebase with share link
metadata.shareLink = shareLink;
await set(fileRef, metadata);
```

## Step 6: Update Download Portal

Modify `downloader.html` to use share links:

```javascript
// In tool card rendering
<button class="btn btn-download" onclick="window.open('${tool.shareLink}', '_blank')">
    📥 Download
</button>
```

## Step 7: Set Firebase Security Rules

Configure Firebase Realtime Database rules:

```json
{
  "rules": {
    "tools": {
      ".read": true,
      ".write": "auth.token.email == 'admin@Degreatcode ICT LTD online class.com'",
      ".validate": "newData.hasChildren(['fileName', 'fileSize', 'fileType'])",
      "$section": {
        "$type": {
          "$fileKey": {
            "fileName": { ".validate": "newData.isString()" },
            "fileSize": { ".validate": "newData.isNumber()" },
            "fileType": { ".validate": "newData.isString()" },
            "version": { ".validate": "newData.isString()" },
            "password": { ".validate": "newData.isString() || newData.val() == null" },
            "releaseNotes": { ".validate": "newData.isString() || newData.val() == null" },
            "shareLink": { ".validate": "newData.isString() || newData.val() == null" },
            "downloadLink": { ".validate": "newData.isString() || newData.val() == null" },
            "uploadedAt": { ".validate": "newData.isString()" },
            "uploadedBy": { ".validate": "newData.isString()" },
            "expiresAt": { ".validate": "newData.isString() || newData.val() == null" },
            ".validate": "newData.hasChildren(['fileName'])"
          }
        }
      }
    }
  }
}
```

## Step 8: Update Authorized Emails

Edit `auth-config.js`:

```javascript
export const AUTHORIZED_EMAILS = [
    'admin@Degreatcode ICT LTD online class.com',
    'your-admin-email@domain.com'
];


// main authorized email
export const AUTHORIZED_EMAIL = 'admin@Degreatcode ICT LTD online class.com'; // or your email
```

## Step 9: Configure Multiple Dropbox Accounts

For each Dropbox account you want to support:

1. Create separate apps in Dropbox
2. Get OAuth tokens for each
3. Update `auth-config.js` with account emails
4. Implement account-specific token management

```javascript
// In uploader.html
const dropboxAccount = document.getElementById('dropboxAccount').value;
const token = await getValidDropboxToken(dropboxAccount);
```

## File Structure After Implementation

```
ToolZipFileUploader/
├── uploader.html              # Admin upload (updated)
├── downloader/
│   └── downloader.html        # Public portal (updated)
├── oauth-callback.html        # OAuth handler (NEW)
├── dropbox-config.js          # Dropbox configuration
├── dropbox-oauth-handler.js   # OAuth manager
├── auth-config.js             # Authorization config
├── FirebaseConnection/
│   └── FirebaseConfiggFile.js # Firebase config
├── script/
├── images/
└── README_TOOL_MANAGER.md
```

## Testing Checklist

- [ ] Admin can upload files
- [ ] Metadata saved to Firebase
- [ ] Download portal shows files
- [ ] Dropbox authentication works
- [ ] Files upload to Dropbox
- [ ] Share links generated correctly
- [ ] Users can download via share link
- [ ] Expiration dates work
- [ ] Password indicators display
- [ ] Multi-account selection works
- [ ] Delete functionality works
- [ ] Mobile responsive

## Troubleshooting

### OAuth Not Working
1. Check Client ID in dropbox-oauth-handler.js
2. Verify redirect URI in Dropbox app settings
3. Check browser console for CORS errors
4. Ensure oauth-callback.html is accessible

### Files Not Uploading
1. Check Dropbox token expiry
2. Verify file size limits
3. Check Firebase permissions
4. Look for rate limiting errors

### Share Links Not Generating
1. Verify Dropbox API endpoint
2. Check sharing permissions in app
3. Ensure file uploaded successfully first
4. Check API response in browser DevTools

### Firebase Issues
1. Verify connection to Firebase
2. Check security rules allow writes
3. Ensure data structure matches schema
4. Check for authentication errors

## Performance Optimization

### For Large Files
- Implement chunked uploads
- Add resume capability
- Show progress bars

### For Many Files
- Implement pagination in download portal
- Add search/filter functionality
- Cache metadata locally

### For Multiple Accounts
- Store tokens securely
- Implement token refresh strategy
- Monitor API rate limits

## Security Reminders

1. **Never commit credentials** to version control
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** for all OAuth redirects
4. **Validate file types** server-side
5. **Set appropriate Firebase rules**
6. **Monitor for abuse** of download links
7. **Rotate OAuth tokens** periodically
8. **Log all admin actions** for audit trails

## Next Steps

After basic implementation:
1. Add email notifications for uploads
2. Implement download statistics
3. Add user accounts for admins
4. Create admin dashboard
5. Implement file previews
6. Add version history/rollback
7. Create backup strategy
8. Monitor storage usage
9. Set up automated cleanup for expired files
10. Add analytics and reporting

---

**Implementation Date:** [YOUR_DATE]
**Status:** [NOT_STARTED / IN_PROGRESS / COMPLETED]
**Notes:** [ADD_NOTES_HERE]


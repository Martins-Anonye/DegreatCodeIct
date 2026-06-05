// Dropbox OAuth 2.0 PKCE client-side integration
// Usage: Call startDropboxOAuth() to begin authentication
// After redirect, call finishDropboxOAuth() to get access token

const DROPBOX_CLIENT_ID = '85dx69hwg3d0dpz'; // TODO: Replace with your Dropbox app client ID
const DROPBOX_REDIRECT_URI = window.location.origin + window.location.pathname; // Current page

function base64urlencode(str) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function pkceChallengeFromVerifier(v) {
  const encoder = new TextEncoder();
  const data = encoder.encode(v);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64urlencode(digest);
}

function randomString(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, b => ('0' + b.toString(16)).slice(-2)).join('');
}

export async function startDropboxOAuth() {
  const verifier = randomString(64);
  const challenge = await pkceChallengeFromVerifier(verifier);
  sessionStorage.setItem('dropbox_pkce_verifier', verifier);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: DROPBOX_CLIENT_ID,
    redirect_uri: DROPBOX_REDIRECT_URI,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    token_access_type: 'offline',
    scope: 'files.content.write sharing.write',
  });
  window.location.href = 'https://www.dropbox.com/oauth2/authorize?' + params.toString();
}

export async function finishDropboxOAuth() {
  // First check if we already have a valid token stored
  const existingToken = localStorage.getItem('dropbox_access_token') || sessionStorage.getItem('dropbox_access_token');
  if (existingToken) {
    // Token already exists, no need to process code again
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const error = params.get('error');
  
  // Check for OAuth errors from Dropbox
  if (error) {
    console.error('Dropbox OAuth error:', error, params.get('error_description'));
    // Clear the error from URL
    window.history.replaceState({}, document.title, window.location.pathname);
    return null;
  }
  
  if (!code) return null;
  
  const verifier = sessionStorage.getItem('dropbox_pkce_verifier');
  if (!verifier) {
    console.warn('No PKCE verifier found. OAuth may have already been processed or verifier was lost.');
    return null;
  }
  
  const body = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    client_id: DROPBOX_CLIENT_ID,
    redirect_uri: DROPBOX_REDIRECT_URI,
    code_verifier: verifier
  });
  
  try {
    const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      console.error('Dropbox OAuth error:', data);
      // Clear the code from URL to prevent re-attempts
      window.history.replaceState({}, document.title, window.location.pathname);
      throw new Error('Dropbox OAuth failed: ' + (data.error_description || data.error || 'Unknown error'));
    }
    
    // Store token in localStorage for persistence
    localStorage.setItem('dropbox_access_token', data.access_token);
    sessionStorage.removeItem('dropbox_pkce_verifier');
    
    // Clear code from URL to prevent re-processing on refresh
    window.history.replaceState({}, document.title, window.location.pathname);
    
    return data.access_token;
  } catch (err) {
    console.error('Error during Dropbox OAuth token exchange:', err);
    // Clear the code from URL to prevent re-attempts
    window.history.replaceState({}, document.title, window.location.pathname);
    throw err;
  }
}

export function getDropboxAccessToken() {
  // Check localStorage first (persists across page refresh), then sessionStorage
  return localStorage.getItem('dropbox_access_token') || sessionStorage.getItem('dropbox_access_token');
}

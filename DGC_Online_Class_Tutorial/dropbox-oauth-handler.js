/**
 * Dropbox OAuth Handler
 * 
 * Manages Dropbox OAuth authentication and token refresh
 * Supports multiple Dropbox accounts
 * 
 * Setup:
 * 1. Create Dropbox app at https://www.dropbox.com/developers/apps
 * 2. Get Client ID and App Secret
 * 3. Set OAuth redirect URI to your app URL
 * 4. Configure the values below
 * 
 * Note: Client ID is dynamically loaded from active email in emailListForDropBoxStorage.html
 */

// Import Firebase config from single source
import { firebaseConfig } from './FirebaseConnection/FirebaseConfiggFile.js';

// Configuration - UPDATE THESE WITH YOUR DROPBOX APP DETAILS
const DROPBOX_OAUTH_CONFIG = {
    // Get from https://www.dropbox.com/developers/apps
    // Client ID is now dynamically loaded from active email in emailListForDropBoxStorage.html
    clientId: '', // Will be loaded from Firebase active email
    
    // List of redirect URIs configured in your Dropbox app
    redirectUri: window.location.origin + '/oauth-callback.html',
    
    // List of redirect URIs configured in your Dropbox app
    redirectUri: window.location.origin + '/oauth-callback.html',
    
    // OAuth scopes needed
    scope: 'files.metadata.write files.content.write sharing.write',
    
    // Token storage keys
    tokenKey: 'dropbox_access_token',
    refreshTokenKey: 'dropbox_refresh_token',
    expiryKey: 'dropbox_token_expiry'
};

/**
 * Get a valid Dropbox token, refreshing if necessary
 * @param {string} account - Account key ('default', 'account2', etc.)
 * @returns {Promise<string>} Valid access token
 */
export async function getValidDropboxToken(account = 'default') {
    // Ensure clientId is loaded before proceeding
    if (!DROPBOX_OAUTH_CONFIG.clientId) {
        await loadClientIdFromFirebase();
    }

    if (!DROPBOX_OAUTH_CONFIG.clientId) {
        throw new Error('No Client ID configured. Please set an active email with Client ID in emailListForDropBoxStorage.html');
    }

    const tokenKey = `${DROPBOX_OAUTH_CONFIG.tokenKey}_${account}`;
    const refreshTokenKey = `${DROPBOX_OAUTH_CONFIG.refreshTokenKey}_${account}`;
    const expiryKey = `${DROPBOX_OAUTH_CONFIG.expiryKey}_${account}`;

    let token = localStorage.getItem(tokenKey);
    const expiry = localStorage.getItem(expiryKey);
    const refreshToken = localStorage.getItem(refreshTokenKey);

    // Check if token is expired
    if (expiry && new Date(expiry) < new Date()) {
        if (refreshToken) {
            // Refresh the token
            try {
                const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken,
                        client_id: DROPBOX_OAUTH_CONFIG.clientId
                    })
                });

                if (!response.ok) {
                    throw new Error('Token refresh failed');
                }

                const data = await response.json();
                token = data.access_token;
                const newExpiry = new Date(Date.now() + data.expires_in * 1000);

                // Store new token
                localStorage.setItem(tokenKey, token);
                localStorage.setItem(expiryKey, newExpiry.toISOString());

                return token;
            } catch (error) {
                console.error('Failed to refresh token:', error);
                // Token refresh failed, need to re-authenticate
                clearDropboxTokens(account);
                throw error;
            }
        } else {
            // No refresh token, need to re-authenticate
            clearDropboxTokens(account);
            throw new Error('Token expired and no refresh token available');
        }
    }

    if (!token) {
        throw new Error('No valid Dropbox token. Please authenticate.');
    }

    return token;
}

/**
 * Initiate OAuth login flow
 * @param {string} account - Account key to authenticate
 */
export async function initiateOAuthLogin(account = 'default') {
    // Ensure clientId is loaded before proceeding
    if (!DROPBOX_OAUTH_CONFIG.clientId) {
        await loadClientIdFromFirebase();
    }

    if (!DROPBOX_OAUTH_CONFIG.clientId) {
        throw new Error('No Client ID configured. Please set an active email with Client ID in emailListForDropBoxStorage.html');
    }

    const state = generateRandomState();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await createCodeChallenge(codeVerifier);
    
    const authUrl = new URL('https://www.dropbox.com/oauth2/authorize');
    
    authUrl.searchParams.append('client_id', DROPBOX_OAUTH_CONFIG.clientId);
    authUrl.searchParams.append('redirect_uri', DROPBOX_OAUTH_CONFIG.redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('scope', DROPBOX_OAUTH_CONFIG.scope);
    authUrl.searchParams.append('code_challenge', codeChallenge);
    authUrl.searchParams.append('code_challenge_method', 'S256');

    // Store state, code verifier, and account in session for verification
    sessionStorage.setItem('dropbox_oauth_state', state);
    sessionStorage.setItem('dropbox_oauth_account', account);
    sessionStorage.setItem('dropbox_oauth_code_verifier', codeVerifier);
    sessionStorage.setItem('dropbox_oauth_origin', window.location.href);
    console.log('[OAUTH-INIT] Stored origin:', window.location.href);

    // Redirect to Dropbox
    window.location.href = authUrl.toString();
}

/**
 * Handle OAuth callback and exchange code for token
 * Should be called from oauth-callback.html
 * @param {string} code - Authorization code from Dropbox
 * @param {string} state - State parameter for verification
 */
export async function handleOAuthCallback(code, state) {
    // Ensure clientId is loaded before proceeding
    if (!DROPBOX_OAUTH_CONFIG.clientId) {
        await loadClientIdFromFirebase();
    }

    if (!DROPBOX_OAUTH_CONFIG.clientId) {
        throw new Error('No Client ID configured. Please set an active email with Client ID in emailListForDropBoxStorage.html');
    }

    const storedState = sessionStorage.getItem('dropbox_oauth_state');
    const account = sessionStorage.getItem('dropbox_oauth_account') || 'default';
    const codeVerifier = sessionStorage.getItem('dropbox_oauth_code_verifier');

    // Verify state to prevent CSRF attacks
    if (state !== storedState) {
        throw new Error('State mismatch - possible CSRF attack');
    }

    if (!codeVerifier) {
        throw new Error('Missing PKCE code verifier (sessionStorage dropbox_oauth_code_verifier)');
    }

    try {
        // Exchange code for token
        const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code: code,
                grant_type: 'authorization_code',
                client_id: DROPBOX_OAUTH_CONFIG.clientId,
                redirect_uri: DROPBOX_OAUTH_CONFIG.redirectUri
                ,code_verifier: codeVerifier
            })
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '<unable to read response>');
            const msg = `Token exchange failed (${response.status}): ${text}`;
            console.error('[DROPBOX-OAUTH] Token exchange failed:', response.status, response.statusText, text);
            throw new Error(msg);
        }

        const data = await response.json();
        const tokenKey = `${DROPBOX_OAUTH_CONFIG.tokenKey}_${account}`;
        const refreshTokenKey = `${DROPBOX_OAUTH_CONFIG.refreshTokenKey}_${account}`;
        const expiryKey = `${DROPBOX_OAUTH_CONFIG.expiryKey}_${account}`;

        // Store tokens
        localStorage.setItem(tokenKey, data.access_token);
        if (data.refresh_token) {
            localStorage.setItem(refreshTokenKey, data.refresh_token);
        }
        const expiry = new Date(Date.now() + data.expires_in * 1000);
        localStorage.setItem(expiryKey, expiry.toISOString());

        // Get origin URL before cleanup
        const originUrl = sessionStorage.getItem('dropbox_oauth_origin') || (window.location.origin + '/uploader.html');

        // Clean up session
        sessionStorage.removeItem('dropbox_oauth_state');
        sessionStorage.removeItem('dropbox_oauth_account');
        sessionStorage.removeItem('dropbox_oauth_code_verifier');
        sessionStorage.removeItem('dropbox_oauth_origin');

        return {
            success: true,
            account: account,
            originUrl: originUrl,
            message: 'OAuth authentication successful'
        };
    } catch (error) {
        console.error('OAuth callback error:', error);
        throw error;
    }
}

/**
 * Clear Dropbox tokens for an account
 * @param {string} account - Account key (optional, clears all if not specified)
 */
export function clearDropboxTokens(account = null) {
    if (account) {
        localStorage.removeItem(`${DROPBOX_OAUTH_CONFIG.tokenKey}_${account}`);
        localStorage.removeItem(`${DROPBOX_OAUTH_CONFIG.refreshTokenKey}_${account}`);
        localStorage.removeItem(`${DROPBOX_OAUTH_CONFIG.expiryKey}_${account}`);
    } else {
        // Clear all accounts
        for (const key of Object.keys(localStorage)) {
            if (key.includes(DROPBOX_OAUTH_CONFIG.tokenKey) ||
                key.includes(DROPBOX_OAUTH_CONFIG.refreshTokenKey) ||
                key.includes(DROPBOX_OAUTH_CONFIG.expiryKey)) {
                localStorage.removeItem(key);
            }
        }
    }
}

/**
 * Check if account has valid authentication
 * @param {string} account - Account key
 * @returns {boolean} True if authenticated
 */
export function isAuthenticated(account = 'default') {
    const tokenKey = `${DROPBOX_OAUTH_CONFIG.tokenKey}_${account}`;
    return localStorage.getItem(tokenKey) !== null;
}

/**
 * Get all authenticated accounts
 * @returns {Array<string>} List of authenticated account keys
 */
export function getAuthenticatedAccounts() {
    const accounts = [];
    for (const key of Object.keys(localStorage)) {
        if (key.startsWith(DROPBOX_OAUTH_CONFIG.tokenKey)) {
            const account = key.replace(`${DROPBOX_OAUTH_CONFIG.tokenKey}_`, '');
            if (account !== '') {
                accounts.push(account);
            }
        }
    }
    return accounts;
}

/**
 * Generate random state for OAuth security
 * @returns {string} Random state string
 */
function generateRandomState() {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
}

/**
 * Generate a PKCE code verifier.
 * @returns {string}
 */
function generateCodeVerifier() {
    // Generate a random 64-character string using allowed characters [0-9a-zA-Z-._~]
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < 64; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Convert ArrayBuffer to URL-safe base64 (PKCE requirement).
 */
function base64UrlEncode(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/**
 * Create a PKCE code challenge from a verifier.
 */
async function createCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(digest);
}

export default {
    getValidDropboxToken,
    initiateOAuthLogin,
    handleOAuthCallback,
    clearDropboxTokens,
    isAuthenticated,
    getAuthenticatedAccounts,
    DROPBOX_OAUTH_CONFIG,
    loadClientIdFromFirebase
};

// Function to load clientId from active email in Firebase
export async function loadClientIdFromFirebase() {
    try {
        // Dynamic import Firebase
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js');
        const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js');

        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        // Get all emails and find the active one
        const snapshot = await get(ref(database, 'emailList/'));
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
                if (data[key].isActive === true && data[key].clientId) {
                    DROPBOX_OAUTH_CONFIG.clientId = data[key].clientId;
                    console.log('[DROPBOX-OAUTH] Loaded Client ID from active email:', data[key].clientId);
                    return data[key].clientId;
                }
            }
        }
        
        console.warn('[DROPBOX-OAUTH] No active email with Client ID found');
        return null;
    } catch (error) {
        console.error('[DROPBOX-OAUTH] Error loading Client ID:', error);
        return null;
    }
}

// Initialize clientId on module load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        loadClientIdFromFirebase().catch(console.error);
    });
}

/**
 * Example usage in uploader.html:
 * 
 * import { getValidDropboxToken, initiateOAuthLogin } from './dropbox-oauth-handler.js';
 * 
 * // Get token for upload
 * try {
 *     const token = await getValidDropboxToken('default');
 *     // Use token for Dropbox API calls
 * } catch (error) {
 *     // Token unavailable, initiate login
 *     initiateOAuthLogin('default');
 * }
 */

/**
 * Dropbox Configuration
 * 
 * This file contains Dropbox API endpoints and utility functions
 * for managing file uploads and share link generation.
 * 
 * To use this, you'll need:
 * 1. Dropbox App created at https://www.dropbox.com/developers/apps
 * 2. OAuth tokens for each account you want to support
 */

const DROPBOX_CONFIG = {
    // API Endpoints
    api: {
        fileUpload: 'https://content.dropboxapi.com/2/files/upload',
        fileDelete: 'https://api.dropboxapi.com/2/files/delete_v2',
        createSharedLink: 'https://api.dropboxapi.com/2/sharing/create_shared_link',
        createSharedLinkWithSettings: 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        listSharedLinks: 'https://api.dropboxapi.com/2/sharing/list_shared_links',
        revokeSharedLink: 'https://api.dropboxapi.com/2/sharing/revoke_shared_link'
    },

    /**
     * Get upload path in Dropbox for a file
     * @param {string} type - Tool type (desktop, mobile, web, plugin, chromium, firefox)
     * @param {string} filename - Original filename
     * @returns {string} Path in Dropbox
     */
    getUploadPath: (type, filename) => {
        const date = new Date();
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return `/tools/${type}/${dateStr}/${filename}`;
    },

    /**
     * Convert Dropbox share link to downloadable URL
     * @param {string} dropboxUrl - Share link from Dropbox
     * @returns {string} Direct download URL
     */
    getShareableUrl: (dropboxUrl) => {
        if (!dropboxUrl) return '';
        try {
            const url = new URL(dropboxUrl);
            // Convert to direct content domain for embedding
            if (url.hostname.includes('dropbox.com')) {
                url.hostname = 'dl.dropboxusercontent.com';
            }
            // Ensure dl=1 for direct download access
            url.searchParams.set('dl', '1');
            return url.toString();
        } catch (e) {
            // Fallback: attempt the old dl=1 approach
            return dropboxUrl.replace('?dl=0', '?dl=1').replace('?dl=1', '?dl=1');
        }
    },

    /**
     * Multiple Dropbox accounts configuration
     * Store OAuth tokens in session/localStorage after OAuth flow
     */
    accounts: {
        default: {
            name: 'Default Account',
            // Token stored in localStorage as 'dropbox_token_default'
            // This will be set after OAuth authentication
        },
        account2: {
            name: 'Account 2',
            // Token stored in localStorage as 'dropbox_token_account2'
        },
        account3: {
            name: 'Account 3',
            // Token stored in localStorage as 'dropbox_token_account3'
        }
    }
};

export default DROPBOX_CONFIG;

/**
 * Example usage:
 * 
 * // Get upload path
 * const path = DROPBOX_CONFIG.getUploadPath('desktop', 'tool.exe');
 * // Result: /tools/desktop/2026-03-12/tool.exe
 * 
 * // Convert share link
 * const dlUrl = DROPBOX_CONFIG.getShareableUrl('https://www.dropbox.com/s/xyz?dl=0');
 * // Result: https://www.dropbox.com/s/xyz?dl=1
 * 
 * // Get token for account
 * const token = localStorage.getItem('dropbox_token_default');
 */

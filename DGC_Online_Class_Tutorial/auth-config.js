/**
 * Authorization Configuration
 * 
 * Controls who can access the admin upload panel
 * The active email from emailListForDropBoxStorage.html is treated as an authorized admin email.
 */

import { firebaseConfig } from './FirebaseConnection/FirebaseConfiggFile.js';
import { initializeApp, getApp, getApps } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

const AUTH_CONFIG_APP_NAME = 'AuthConfigApp';
const app = getApps().find((app) => app.name === AUTH_CONFIG_APP_NAME) || initializeApp(firebaseConfig, AUTH_CONFIG_APP_NAME);
const database = getDatabase(app);
let activeAuthorizedEmailCache = null;
let activeAuthorizedEmailLoaded = false;

// Email addresses that can access the admin upload panel
export const AUTHORIZED_EMAILS = [
    'admin@Degreatcode ICT LTD online class.com',
    'ugom5658@gmail.com',
    'moderator@Degreatcode ICT LTD online class.com'
    // Add more authorized admin emails here
];

// Default single authorized email (used in uploader.html)
export const AUTHORIZED_EMAIL = 'ugom5658@gmail.com';

async function loadActiveAuthorizedEmail() {
    if (activeAuthorizedEmailLoaded) {
        return activeAuthorizedEmailCache;
    }
    activeAuthorizedEmailLoaded = true;

    try {
        const snapshot = await get(child(ref(database), 'emailList/'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
                if (data[key] && data[key].isActive) {
                    activeAuthorizedEmailCache = data[key].email;
                    break;
                }
            }
        }
    } catch (error) {
        console.warn('[auth-config] Unable to load active authorized email:', error);
    }

    return activeAuthorizedEmailCache;
}

export async function getActiveAuthorizedEmail() {
    return await loadActiveAuthorizedEmail();
}

/**
 * Check if an email is authorized to access admin panel
 * @param {string} email - Email address to check
 * @returns {Promise<boolean>} True if authorized
 */
export async function isAuthorizedAdmin(email) {
    if (!email) return false;

    if (AUTHORIZED_EMAILS.includes(email) || email === AUTHORIZED_EMAIL) {
        return true;
    }

    const activeEmail = await loadActiveAuthorizedEmail();
    return activeEmail ? email === activeEmail : false;
}

export default {
    AUTHORIZED_EMAILS,
    AUTHORIZED_EMAIL,
    getActiveAuthorizedEmail,
    isAuthorizedAdmin
};

/**
 * Usage:
 * 
 * import { AUTHORIZED_EMAIL, isAuthorizedAdmin } from './auth-config.js';
 * 
 * // Check in Firebase auth listener
 * if (await isAuthorizedAdmin(user.email)) {
 *     // Show admin panel
 * } else {
 *     // Deny access
 * }
 */


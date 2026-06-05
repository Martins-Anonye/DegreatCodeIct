import { ref, get, set, remove } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

function getActiveSessionKey(email) {
    if (!email) return '';
    return `activeStudentLoginEmails/${email.toLowerCase().replace(/[.#$\[\]]/g, '_')}`;
}

export async function isEmailLocked(db, email) {
    if (!email) return false;
    const sessionRef = ref(db, getActiveSessionKey(email));
    const snapshot = await get(sessionRef);
    return snapshot.exists();
}

export async function registerActiveSession(db, email, uid) {
    if (!email || !uid) return;
    const sessionRef = ref(db, getActiveSessionKey(email));
    await set(sessionRef, {
        uid,
        email,
        loginTime: new Date().toISOString()
    });
}

export async function unregisterActiveSession(db, email) {
    if (!email) return;
    const sessionRef = ref(db, getActiveSessionKey(email));
    await remove(sessionRef);
}

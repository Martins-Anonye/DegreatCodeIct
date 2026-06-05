// Paste your Firebase config here. Example structure:

export const firebaseConfig = {
  apiKey: "AIzaSyAC0m9Mw4eesl5NoGj_GYmom83pp61bwXk",
  authDomain: "degreatcode-ict-ltd.firebaseapp.com",
  databaseURL: "https://degreatcode-ict-ltd-default-rtdb.firebaseio.com",
  projectId: "degreatcode-ict-ltd",
  storageBucket: "degreatcode-ict-ltd.appspot.com",
  messagingSenderId: "977515281508",
  appId: "1:977515281508:web:e5af58f433b2f3ede6b371",
  measurementId: "G-R08274K20K"
};
// Optional: simple admin password used by the static admin UI.
// WARNING: This is client-side and not secure for production. Use proper auth for real deployments.
export const adminPassword = "changeme";

// Optional: default DB type the admin UI should use. 'realtime' or 'firestore'
export const defaultDbType = 'realtime';

// Enable Firebase Authentication (email/password) for admin actions.
// Set to true and create an admin user in your Firebase console (or allow signup below).
export const enableFirebaseAuth = true;

// Allow sign-up from the admin UI when `enableFirebaseAuth` is true. For production, set to false.
export const allowFirebaseSignup = true;

// NOTE: Do not commit real API keys or passwords to public repos. Keep this file private.

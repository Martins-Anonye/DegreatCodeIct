

// Firebase Configuration - Single Source of Truth
// All other files should import from this file

const firebaseConfig = {
  apiKey: "AIzaSyAhF3Y3CrtFmXm8ytXC-t1X7MwOCpIS-Dg",
  authDomain: "degreatcode-online-class.firebaseapp.com",
  projectId: "degreatcode-online-class",
  storageBucket: "degreatcode-online-class.firebasestorage.app",
  messagingSenderId: "223415900158",
  appId: "1:223415900158:web:2e643b7b65deb84ff492af",
  measurementId: "G-X0X3WSJB5L"
};
// Export for ES6 modules
export { firebaseConfig };

// Also export as function for compatibility
export function getFirebaseConfig() {
    return firebaseConfig;
}
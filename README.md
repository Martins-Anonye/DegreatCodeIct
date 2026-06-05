DegreatCode ICT — New Site (admin & YouTube management)

Overview
- Static Bootstrap site with an admin UI to upload student identities and manage remote YouTube IDs using Firebase (Realtime DB or Firestore).

Quick setup
1. Copy your Firebase project's web config into `assets/js/firebase-config.js` replacing placeholder values.
2. Set `enableFirebaseAuth = true` in `assets/js/firebase-config.js` to require Firebase Authentication for admin actions. Create an admin user in Firebase Console (Authentication → Users). ensure you enable signin-method (email and password) in firebase console.
3. (Optional) Set `allowFirebaseSignup = true` to allow signing up from the admin page (not recommended for public sites).
4. Open `admin.html` in your browser. If Auth enabled, sign in. If not, use the `adminPassword` fallback configured in `assets/js/firebase-config.js`.

Admin actions
- Upload single student identity via the form (writes to Realtime DB path `students/{id}` or Firestore `students/{id}`).
- Seed multiple identities using a CSV or JSON file. CSV header should include `id,name,program,certificate,issueDate`.
- Save YouTube IDs (comma-separated) to DB under Realtime `config/youtubeIds` or Firestore `config/youtube` doc with field `ids`.

YouTube page
- `youtube.html` will attempt to fetch YouTube IDs from Firebase (Realtime first, then Firestore). If none found, it uses `localStorage` or defaults. Use the admin UI to save IDs to the DB for remote control.

Security notes
- The simple `adminPassword` is client-side only — not secure for production.
- Prefer `enableFirebaseAuth = true` and restrict Firebase Database/Firestore write rules to allow writes only for authenticated admin UIDs.

Example Firebase rules (Firestore)
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{docId} {
      allow write: if request.auth != null && request.auth.uid == '<ADMIN_UID>';
      allow read: if true;
    }
    match /config/{doc} {
      allow write: if request.auth != null && request.auth.uid == '<ADMIN_UID>';
      allow read: if true;
    }
  }
}

Example Firebase rules (Realtime Database)
{
  "rules": {
    "students": {
      "$id": {
        ".write": "auth !== null && auth.uid === 'ADMIN_UID'",
        ".read": true
      }
    },
    "config": {
      ".write": "auth !== null && auth.uid === 'ADMIN_UID'",
      ".read": true
    }
  }
}

Support
- Want me to add secure server-side admin endpoints or deploy this to Firebase Hosting with Cloud Functions? I can scaffold that next.

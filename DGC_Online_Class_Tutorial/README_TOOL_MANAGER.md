# Degreatcode ICT LTD online class Tool Manager - Complete Documentation

## Overview

The Degreatcode ICT LTD online class Tool Manager is a complete file management system that allows administrators to upload tools and software to Dropbox, store metadata in Firebase, and allow users to download them through a public interface.

## Architecture

### Components

1. **Admin Upload Panel** (`uploader.html`)
   - Modern, responsive web interface for administrators
   - Two sections: Tools & Software, Safe Browser
   - Multiple upload categories and metadata configuration
   - Database management with delete capability

2. **Public Download Portal** (`downloader.html`)
   - User-friendly download interface
   - Shows all available tools and browsers
   - Displays version, size, release notes
   - Password protection indicators

3. **Firebase Database** (Realtime Database)
   - Stores all metadata for uploaded files
   - Path structure: `tools/{section}/{type}/{fileKey}`
   - Tracks version, password, release notes, expiration dates, etc.

4. **Dropbox Integration** (Future implementation)
   - File storage on multiple Dropbox accounts
   - Share link generation for public access
   - Supports multiple accounts per upload section

## File Structure

```
ToolZipFileUploader/
├── uploader.html          # Admin upload interface
├── downloader/
│   └── downloader.html    # Public download portal
├── FirebaseConnection/    # Firebase config files
├── script/               # Additional scripts
├── images/               # Images and icons
└── README.md            # This file
```

## Features

### Admin Panel (uploader.html)

#### Two Upload Sections:

##### 1. Tools & Software
- **Categories:**
  - 💻 Desktop
  - 📱 Mobile
  - 🌐 Web
  - 🔌 Plugin

- **Metadata Fields:**
  - Version number (e.g., 1.0.0)
  - Password protection (optional)
  - Release notes (optional)
  - Download page link (optional)
  - Expiration days (0 = never)

##### 2. Safe Browser
- **Browser Types:**
  - 🌐 Chromium
  - 🦊 Firefox

- **Dropbox Account Selection**
  - Default Account
  - Account 2
  - Account 3
  - (Configurable in code)

- **Additional Fields:**
  - Version, Password, Release Notes, Expiration

#### Database Management
- **View Uploaded Files:**
  - All tools and browsers organized by section and type
  - Shows version, size, upload date, expiration status
  - Delete files from database (also removes from Dropbox - when integrated)

### Public Download Portal (downloader.html)

#### Two Tabs:
1. **Tools & Software**
   - Displays all non-expired tools
   - Shows icon, name, version, size
   - Release notes display
   - Password warning indicators

2. **Safe Browser**
   - Displays all non-expired browsers
   - Shows browser type, version, Dropbox account info
   - Release notes and password warnings

#### Features:
- Automatic expiration handling (hides expired files)
- Responsive design (mobile-friendly)
- Beautiful card-based UI
- Download button integration (requires Dropbox link)

## Firebase Database Structure

```json
{
  "tools": {
    "tools": {
      "desktop": {
        "fileKey1": {
          "fileName": "MyTool-v1.0.exe",
          "fileSize": 52428800,
          "fileType": "desktop",
          "version": "1.0.0",
          "password": "mypassword",
          "releaseNotes": "Initial release...",
          "downloadLink": "https://example.com/download",
          "uploadedAt": "2026-03-12T10:30:00Z",
          "uploadedBy": "admin@Degreatcode ICT LTD online class.com",
          "expiresAt": "2026-04-11T10:30:00Z"
        }
      },
      "mobile": { /* similar structure */ },
      "web": { /* similar structure */ },
      "plugin": { /* similar structure */ }
    },
    "safebrowser": {
      "chromium": {
        "fileKey2": {
          "fileName": "SafeBrowser-Chromium-v2.0.zip",
          "fileSize": 157286400,
          "fileType": "chromium",
          "dropboxAccount": "account2",
          "version": "2.0.0",
          "password": "",
          "releaseNotes": "Updated to latest Chromium...",
          "uploadedAt": "2026-03-12T11:00:00Z",
          "uploadedBy": "admin@Degreatcode ICT LTD online class.com"
        }
      },
      "firefox": { /* similar structure */ }
    }
  }
}
```

## Setup Instructions

### 1. Update Authorized Email

Edit `uploader.html` line ~300:
```javascript
const AUTHORIZED_EMAIL = "admin@Degreatcode ICT LTD online class.com"; // Change this to your admin email
```

### 2. Authentication Setup

The system expects Firebase Authentication to be configured. Users must:
1. Sign in with Firebase
2. Have email matching `AUTHORIZED_EMAIL` for admin access
3. Non-authorized users are redirected to `/auth.html`

### 3. Dropbox Integration (Future)

To fully integrate Dropbox uploads:
1. Create `dropbox-config.js` with Dropbox API endpoints
2. Create `dropbox-oauth-handler.js` for OAuth token management
3. Create `auth-config.js` with authorized emails
4. Implement file upload to Dropbox in the upload handler
5. Generate share links for public access

Example structure:
```javascript
// dropbox-config.js
export default {
    api: {
        fileUpload: 'https://content.dropboxapi.com/2/files/upload',
        createSharedLink: 'https://www.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        listSharedLinks: 'https://www.dropboxapi.com/2/sharing/list_shared_links'
    },
    getUploadPath: (type, filename) => `/tools/${type}/${filename}`,
    getShareableUrl: (dropboxUrl) => dropboxUrl.replace('?dl=0', '?dl=1')
};
```

### 4. Multiple Dropbox Accounts

The system already supports selecting between multiple Dropbox accounts:
- Each account needs its own OAuth token stored in session/localStorage
- Update the select dropdown in Safe Browser section to add more accounts
- Implement account-specific token management in the upload handler

## Usage

### For Administrators

1. **Open Upload Panel:**
   - Navigate to `/uploader.html`
   - Sign in with authorized email
   - You'll see admin interface

2. **Upload Tools:**
   - Click "Tools & Software" tab
   - Select tool type (Desktop/Mobile/Web/Plugin)
   - Fill in metadata
   - Drag-and-drop or click to select files
   - Click "Upload All"
   - Check results in Queue section

3. **Upload Safe Browser:**
   - Click "Safe Browser" tab
   - Select browser type (Chromium/Firefox)
   - Choose Dropbox account
   - Fill in metadata
   - Upload files

4. **Manage Uploads:**
   - Click "View Files" in Database section
   - See all uploaded files organized by category
   - Delete files as needed

### For Users

1. **Open Download Portal:**
   - Navigate to `/downloader.html` (or share the link publicly)
   - Browse available tools or browsers
   - Click on desired tool/browser tab

2. **Download:**
   - View tool details and version info
   - Check password requirements
   - Click "Download" button
   - File downloads from Dropbox

## Current Status & Future Work

### ✅ Implemented
- Admin upload interface (uploader.html)
- Public download portal (downloader.html)
- Firebase database integration
- Multi-section support (Tools, Safe Browser)
- Metadata storage (version, password, notes, expiration)
- Admin management (view/delete files)
- Multi-Dropbox account selection
- Responsive, modern UI

### ⏳ To Implement
- [ ] Full Dropbox API integration
- [ ] OAuth token generation and refresh
- [ ] Share link creation and generation
- [ ] Actual file upload to Dropbox
- [ ] Email notifications for uploads
- [ ] Download statistics tracking
- [ ] File preview/information page
- [ ] Admin user management
- [ ] Advanced filtering and search

## API Endpoints Reference

### Firebase Realtime Database Paths

- `tools/tools/desktop/{fileKey}` - Desktop tools
- `tools/tools/mobile/{fileKey}` - Mobile tools
- `tools/tools/web/{fileKey}` - Web tools
- `tools/tools/plugin/{fileKey}` - Plugins
- `tools/safebrowser/chromium/{fileKey}` - Chromium browsers
- `tools/safebrowser/firefox/{fileKey}` - Firefox browsers

### File Metadata Schema

```javascript
{
  fileName: string,           // Original filename
  fileSize: number,          // Size in bytes
  fileType: string,          // desktop/mobile/web/plugin/chromium/firefox
  version: string,           // Version identifier
  password: string,          // Optional password
  releaseNotes: string,      // Release notes (optional)
  downloadLink: string,      // Redirect URL (optional)
  dropboxAccount: string,    // Account selection (Safe Browser only)
  uploadedAt: ISO8601,       // Upload timestamp
  uploadedBy: string,        // Admin email
  expiresAt: ISO8601         // Expiration date (optional)
}
```

## Security Considerations

1. **Authentication:**
   - Admin access restricted to authorized email
   - Firebase auth required
   - Sign out clears tokens

2. **File Management:**
   - Files stored on Dropbox (secure cloud storage)
   - Share links public but files protected by Dropbox
   - Password-protected tools clearly marked
   - Expiration dates supported

3. **Database:**
   - Firebase security rules should restrict writes to admin only
   - Public read access for downloads
   - Data encrypted in transit

4. **Recommended Firebase Rules:**
```json
{
  "rules": {
    "tools": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).val() === true",
      ".validate": "newData.hasChildren(['fileName', 'fileSize', 'fileType'])"
    },
    "admins": {
      ".read": "root.child('admins').child(auth.uid).val() === true",
      ".write": false
    }
  }
}
```

## Troubleshooting

### Files Not Appearing
- Check Firebase connectivity
- Verify database structure
- Ensure files haven't expired
- Check browser console for errors

### Upload Failures
- Check Firebase permissions
- Verify Dropbox tokens (when implemented)
- Check file size limits
- Look at browser console for error messages

### Authentication Issues
- Clear browser cache
- Verify authorized email is correct
- Check Firebase auth configuration
- Ensure user is logged into correct Firebase account

## Support

For issues or questions:
1. Check browser console (F12) for errors
2. Review Firebase Realtime Database structure
3. Verify Firebase auth configuration
4. Check Dropbox OAuth tokens (when implemented)
5. Review network requests in DevTools

## Version History

- **v1.0.0** (2026-03-12) - Initial release
  - Admin upload panel
  - Public download portal
  - Firebase integration
  - Multi-section support
  - Responsive UI

---

**Last Updated:** March 12, 2026
**Author:** Degreatcode ICT LTD online class Development Team
**Firebase Project:** quadraticeqn-b0021


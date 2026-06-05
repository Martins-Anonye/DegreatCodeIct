# Degreatcode ICT LTD online class Tool Manager - Quick Reference Guide

## 🚀 Quick Start

### For Admin Users
1. **Access:** Navigate to `/uploader.html`
2. **Login:** Sign in with your Firebase account (must be authorized email)
3. **Upload:** Select tool type, add metadata, select files, click Upload
4. **Manage:** Click "View Files" to see, edit, or delete uploads

### For End Users
1. **Access:** Navigate to `/downloader.html` (public, no login needed)
2. **Browse:** Select "Tools & Software" or "Safe Browser" tab
3. **Download:** Click download button on desired tool

---

## 📁 File Locations

| File | Purpose | Location |
|------|---------|----------|
| **uploader.html** | Admin upload panel | `/ToolZipFileUploader/uploader.html` |
| **downloader.html** | Public download portal | `/ToolZipFileUploader/downloader/downloader.html` |
| **dropbox-config.js** | Dropbox API config | `/ToolZipFileUploader/dropbox-config.js` |
| **dropbox-oauth-handler.js** | OAuth management | `/ToolZipFileUploader/dropbox-oauth-handler.js` |
| **auth-config.js** | Admin authorization | `/ToolZipFileUploader/auth-config.js` |

---

## ⚙️ Configuration

### Change Admin Email
**File:** `uploader.html` (~line 300)
```javascript
const AUTHORIZED_EMAIL = "your-email@domain.com";
```

### Add Multiple Admin Emails
**File:** `auth-config.js`
```javascript
export const AUTHORIZED_EMAILS = [
    'admin@Degreatcode ICT LTD online class.com',
    'your-email@domain.com',
    'another-admin@domain.com'
];
```

---

## 📊 Firebase Structure

```
tools/
├── tools/
│   ├── desktop/ → {files}
│   ├── mobile/  → {files}
│   ├── web/     → {files}
│   └── plugin/  → {files}
└── safebrowser/
    ├── chromium/ → {files}
    └── firefox/  → {files}
```

---

## 🎯 Features at a Glance

### Admin Panel
- ✅ Two-tab interface (Tools / Safe Browser)
- ✅ Drag-and-drop upload
- ✅ Version tracking
- ✅ Password protection
- ✅ Release notes
- ✅ Expiration dates
- ✅ File management
- ✅ Multi-Dropbox account selection

### Download Portal
- ✅ Public access (no login)
- ✅ Beautiful card UI
- ✅ Auto-filters expired files
- ✅ Shows version info
- ✅ Password indicators
- ✅ Responsive design

---

## 🔐 Security

### Current
- ✅ Firebase auth required for admin
- ✅ Email-based authorization
- ✅ Password field support

### Recommended
- 🔄 Set up Firebase security rules
- 🔄 Enable HTTPS only
- 🔄 Regular backups
- 🔄 Audit logging

**Security Rules Template Provided in IMPLEMENTATION_GUIDE.md**

---

## 📝 Database Schema

### File Metadata
```javascript
{
  fileName: "MyTool-v1.0.exe",
  fileSize: 52428800,
  fileType: "desktop",
  version: "1.0.0",
  password: "optional",
  releaseNotes: "Release information...",
  downloadLink: "https://example.com",
  dropboxAccount: "default",
  uploadedAt: "2026-03-12T10:30:00Z",
  uploadedBy: "admin@example.com",
  expiresAt: "2026-04-12T10:30:00Z",
  shareLink: "https://dropbox.com/s/abc?dl=1"
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Check email is authorized, verify Firebase auth |
| Files not showing | Check Firebase connection, verify not expired |
| Upload fails | Check console (F12), verify file size |
| Download link broken | Dropbox integration not yet implemented |
| Mobile UI broken | Check viewport meta tag, test on actual device |

---

## 📞 Common Tasks

### Upload a New Tool
1. Click uploader.html
2. Select "Tools & Software" tab
3. Choose tool type (Desktop/Mobile/Web/Plugin)
4. Fill in Version, Password (optional), Release Notes
5. Drag-and-drop or click to select file
6. Click "Upload All"

### Upload Safe Browser
1. Click uploader.html
2. Select "Safe Browser" tab
3. Choose browser type (Chromium/Firefox)
4. Select Dropbox account
5. Fill in metadata
6. Upload file

### View All Uploads
1. In uploader.html
2. Scroll to "Uploaded Tools & Browsers" section
3. Click "View Files"
4. Browse all uploads by section and type

### Delete a File
1. In uploader.html, click "View Files"
2. Find the file in the list
3. Click "Delete" button
4. Confirm deletion

### Download a Tool (User View)
1. Go to downloader.html
2. Browse "Tools & Software" or "Safe Browser" tab
3. Click "Download" on desired tool
4. Wait for file (when Dropbox integration complete)

---

## 🔗 URL Shortcuts

| Purpose | URL |
|---------|-----|
| **Admin Upload** | `/uploader.html` |
| **Public Downloads** | `/downloader.html` |
| **OAuth Callback** | `/oauth-callback.html` |
| **Firebase Console** | https://console.firebase.google.com |

---

## 📚 Documentation Files

1. **README_TOOL_MANAGER.md** - Complete documentation (3,500+ words)
2. **IMPLEMENTATION_GUIDE.md** - Dropbox integration guide (2,500+ words)
3. **COMPLETION_REPORT.md** - Project completion report
4. **QUICK_REFERENCE.md** - This file!

---

## 🎨 UI Highlights

### Colors
- Primary: `#667eea` (Purple-blue)
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Background: Gradient `#667eea` → `#764ba2`

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1200px
- Mobile: < 768px

---

## 🔄 Upload Workflow

```
Admin Login
    ↓
Select Section (Tools / SafeBrowser)
    ↓
Choose Type (Desktop/Mobile/Web/Plugin or Chromium/Firefox)
    ↓
Fill Metadata (Version, Password, Notes, etc.)
    ↓
Select File(s)
    ↓
Click Upload
    ↓
Save to Firebase
    ↓
Display in Download Portal
```

---

## 📥 Download Workflow

```
User Visits /downloader.html
    ↓
Browse Tools / SafeBrowser Tabs
    ↓
View Available Files (Non-Expired Only)
    ↓
Read File Details (Version, Size, Notes, etc.)
    ↓
Click Download Button
    ↓
Get File from Dropbox (When Integrated)
```

---

## ⏰ Version Information

| Component | Version | Status |
|-----------|---------|--------|
| **Firebase** | 9.23.0 | ✅ Active |
| **System** | 1.0.0 | ✅ Complete |
| **Dropbox** | N/A | 🔄 Pending Integration |

---

## 📧 Contact Information

**For Issues:**
1. Check browser console (F12)
2. Review error message
3. Consult README_TOOL_MANAGER.md
4. Check IMPLEMENTATION_GUIDE.md
5. Review COMPLETION_REPORT.md

---

## ✅ Checklist Before Going Live

- [ ] AUTHORIZED_EMAIL updated
- [ ] Firebase connection tested
- [ ] Upload working correctly
- [ ] Download portal displays files
- [ ] Mobile responsive verified
- [ ] No console errors
- [ ] Firebase rules set up
- [ ] HTTPS enabled
- [ ] Admins trained
- [ ] Backup system ready

---

## 🎉 Ready to Use!

Your Degreatcode ICT LTD online class Tool Manager is ready for:
- ✅ Testing
- ✅ Staging
- ✅ Production (after security setup)

**Next:** See IMPLEMENTATION_GUIDE.md for Dropbox integration steps.

---

**Last Updated:** March 12, 2026  
**System Status:** ✅ READY  
**Version:** 1.0.0


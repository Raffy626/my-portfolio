# Replace alert() with SweetAlert2

## Files to Update:
- [x] frontend/src/pages/admin.jsx
- [x] frontend/src/pages/AdminLogin.jsx
- [x] frontend/src/pages/Login.jsx
- [x] frontend/src/components/Contact.jsx

## Steps:
1. Add import Swal from 'sweetalert2'; to each file.
2. Replace alert() calls with Swal.fire() for better UX.
   - Success messages: Swal.fire({ title: "Success", text: "message", icon: "success" });
   - Error messages: Swal.fire({ title: "Error", text: "message", icon: "error" });
   - Info messages: Swal.fire({ title: "Info", text: "message", icon: "info" });
3. Test the changes to ensure alerts work properly.

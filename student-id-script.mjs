
        document.getElementById('year').textContent = new Date().getFullYear();
        (function(){
            if (window.__dgc_nav_fab_loaded) return; window.__dgc_nav_fab_loaded = true;
            var l=document.createElement('link'); l.rel='stylesheet'; l.href='assets/css/nav-fab.css'; document.head.appendChild(l);
            var s=document.createElement('script'); s.src='assets/js/nav-fab.js'; document.body.appendChild(s);
        })();

        import { firebaseConfig } from './assets/js/firebase-config.js';
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
        import { getFirestore, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
        import { getDatabase, ref as dbRef, get as dbGet } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

        const sampleStudents = [
            { id: 'DGC001', name: 'Amina Ibrahim', program: 'Android App Development' },
            { id: 'DGC002', name: 'Chukwu Emeka', program: 'Website Development' },
            { id: 'DGC003', name: 'Maryam Yusuf', program: 'Data Science & Analysis' }
        ];

        const sampleCertificates = [
            { cert: 'CERT-2023-001', holder: 'Amina Ibrahim', course: 'Android App Development' },
            { cert: 'CERT-2023-002', holder: 'Chukwu Emeka', course: 'Website Development' }
        ];

        const resultBox = document.getElementById('verificationResult');

        // Initialize Firebase app once
        let app = null, firestore = null, rtdb = null;
        try{
            app = initializeApp(firebaseConfig);
            firestore = getFirestore(app);
            rtdb = getDatabase ? getDatabase(app) : null;
        }catch(e){ console.warn('Firebase init failed', e); }

        async function findStudentById(id){
            if (!id) return null;
            const norm = id.toString().toUpperCase();

            // Firestore targeted query (if studentId stored as field)
            if (firestore){
                try{
                    const q = query(collection(firestore, 'students'), where('studentId', '==', id));
                    const snap = await getDocs(q);
                    if (!snap.empty) return snap.docs[0].data();
                }catch(err){
                    // fallback to full scan if query fails or field missing
                    try{
                        const snap = await getDocs(collection(firestore, 'students'));
                        for(const d of snap.docs){
                            const data = d.data();
                            if (data && (data.studentId || data.id)){
                                const sid = (data.studentId || data.id).toString().toUpperCase();
                                if (sid === norm) return data;
                            }
                        }
                    }catch(e){ console.warn('Firestore lookup error', e); }
                }
            }

            // Realtime DB fallback
            if (rtdb){
                try{
                    const snap = await dbGet(dbRef(rtdb, 'students'));
                    if (snap && snap.exists && snap.exists()){
                        const val = snap.val();
                        for(const k of Object.keys(val||{})){
                            const s = val[k];
                            const sid = (s.studentId || s.id || '').toString().toUpperCase();
                            if (sid === norm) return s;
                        }
                    }
                }catch(err){ console.warn('RTDB lookup error', err); }
            }

            // Sample fallback
            return sampleStudents.find(entry => (entry.id || '').toString().toUpperCase() === norm) || null;
        }

        async function findByCertificate(cert){
            if (!cert) return null;
            const norm = cert.toString().toUpperCase();

            if (firestore){
                try{
                    const q = query(collection(firestore, 'students'), where('certificate', '==', cert));
                    const snap = await getDocs(q);
                    if (!snap.empty) return snap.docs[0].data();
                }catch(err){
                    try{
                        const snap = await getDocs(collection(firestore, 'students'));
                        for(const d of snap.docs){
                            const data = d.data();
                            if (data && data.certificate){
                                if (data.certificate.toString().toUpperCase() === norm) return data;
                            }
                        }
                    }catch(e){ console.warn('Firestore cert lookup error', e); }
                }
            }

            if (rtdb){
                try{
                    const snap = await dbGet(dbRef(rtdb, 'students'));
                    if (snap && snap.exists && snap.exists()){
                        const val = snap.val();
                        for(const k of Object.keys(val||{})){
                            const s = val[k];
                            if ((s.certificate || '').toString().toUpperCase() === norm) return s;
                        }
                    }
                }catch(err){ console.warn('RTDB cert lookup error', err); }
            }

            return sampleCertificates.find(c => (c.cert || '').toString().toUpperCase() === norm) || null;
        }

        function renderResult(data, type){
            const role = data.role || data.type || 'student';
            let idCardDisplay = '';
            if (data.idCardUrl){
                const url = data.idCardUrl;
                idCardDisplay = (url.startsWith && url.startsWith('data:'))
                    ? `<img src="${url}" alt="ID Card" style="max-width:240px;max-height:160px;display:block;margin:8px 0;">`
                    : `<a href="${url}" target="_blank">View ID Card</a>`;
            }

            const programOrPosition = (role === 'staff')
                ? (data.office_position || data.program || data.course || '')
                : (data.program || data.office_position || data.course || '');

            if (type === 'certificate'){
                return `
                    <div class="alert alert-success text-start">
                        <h4 class="alert-heading">Certificate Verified</h4>
                        <p><strong>Holder:</strong> ${data.name || data.holder || ''}</p>
                        <p><strong>Certificate:</strong> ${data.certificate || data.cert || ''}</p>
                        <p><strong>Course/Position:</strong> ${programOrPosition}</p>
                        <p><strong>Description:</strong> ${data.description || ''}</p>
                        <p><strong>Role:</strong> ${role}</p>
                        ${idCardDisplay ? `<p>${idCardDisplay}</p>` : ''}
                    </div>
                `;
            }

            return `
                <div class="alert alert-success text-start">
                    <h4 class="alert-heading">ID Verified</h4>
                    <p><strong>Name:</strong> ${data.name || ''}</p>
                    <p><strong>ID number:</strong> ${data.studentId || data.id || ''}</p>
                    <p><strong>Program/Position:</strong> ${programOrPosition}</p>
                    <p><strong>Description:</strong> ${data.description || ''}</p>
                    <p><strong>Role:</strong> ${role}</p>
                    <p><strong>Certificate:</strong> ${data.certificate || ''}</p>
                    ${idCardDisplay ? `<p>${idCardDisplay}</p>` : ''}
                </div>
            `;
        }

        document.getElementById('verifyButton').addEventListener('click', async () => {
            const studentId = (document.getElementById('studentIdInput').value || '').trim();
            if (!studentId) { resultBox.innerHTML = '<div class="alert alert-warning">Please enter a valid student_or_staff ID.</div>'; return; }
            resultBox.innerHTML = '<div class="alert alert-info">Searching...</div>';
            const student = await findStudentById(studentId);
            if (student) {
                resultBox.innerHTML = renderResult(student, 'id');
            } else {
                resultBox.innerHTML = '<div class="alert alert-danger">ID not found. Please check your student_or_staff ID and try again.</div>';
            }
        });

        document.getElementById('verifyCertButton').addEventListener('click', async () => {
            const cert = (document.getElementById('certificateInput').value || '').trim();
            if (!cert) { resultBox.innerHTML = '<div class="alert alert-warning">Please enter a certificate number.</div>'; return; }
            resultBox.innerHTML = '<div class="alert alert-info">Searching...</div>';
            const entry = await findByCertificate(cert);
            if (entry) {
                resultBox.innerHTML = renderResult(entry, 'certificate');
            } else {
                resultBox.innerHTML = '<div class="alert alert-danger">Certificate not found. Please check the number and try again.</div>';
            }
        });
    
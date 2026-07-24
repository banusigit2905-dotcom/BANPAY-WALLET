// KONFIGURASI FIREBASE ANDA
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "proyek-anda.firebaseapp.com",
    projectId: "proyek-anda",
    storageBucket: "proyek-anda.appspot.com",
    messagingSenderId: "12345",
    appId: "1:12345:web:abcde"
};

// Inisialisasi
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Pantau Status Login
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'block';
        document.getElementById('user-name').textContent = user.displayName;
        loadData(user.uid);
    } else {
        document.getElementById('login-screen').style.display = 'block';
        document.getElementById('app-screen').style.display = 'none';
    }
});

// Fungsi Login & Logout
function loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

function logout() {
    auth.signOut();
}

// Ambil & Simpan Data ke Firestore
async function loadData(uid) {
    const doc = await db.collection('wallets').doc(uid).get();
    if (doc.exists) {
        const data = doc.data();
        document.getElementById('saldo').textContent = 'Rp ' + data.saldo.toLocaleString('id-ID');
        document.getElementById('history').innerHTML = data.history.map(h => `<li>${h}</li>`).join('');
    } else {
        // Buat data awal jika user baru
        await db.collection('wallets').doc(uid).set({ saldo: 0, history: [] });
    }
}

async function updateSaldo(nominal, tipe) {
    const uid = auth.currentUser.uid;
    const ref = db.collection('wallets').doc(uid);
    const doc = await ref.get();
    const data = doc.data();

    const newSaldo = data.saldo + nominal;
    const log = `${tipe}: ${nominal > 0 ? '+' : ''}Rp ${Math.abs(nominal).toLocaleString('id-ID')}`;
    
    await ref.update({
        saldo: newSaldo,
        history: [log, ...data.history].slice(0, 10) // Simpan 10 riwayat terakhir
    });
    loadData(uid);
}

function transferPrompt() {
    const nominal = prompt("Masukkan nominal transfer:");
    if (nominal > 0) {
        updateSaldo(-parseInt(nominal), 'Transfer');
    }
}

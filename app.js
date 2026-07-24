<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name=viewport content='width=device-width,initial-scale=1'>
    <link rel=stylesheet href='style.css'>
    <title>BANPAY</title>
</head>
<body>
    <div id="app-content" style="display:none;">
        <div class='header'>
            <div style="display:flex; justify-content: space-between;">
                <h2>BANPAY</h2>
                <button onclick="logout()" style="background:red; color:white; font-size:12px;">Logout</button>
            </div>
            <p id="user-name">Memuat...</p>
            <h1 id='saldo'>Rp 0</h1>
        </div>
        
        <div class='actions'>
            <button onclick='topup()'>Top Up</button>
            <button onclick='transfer()'>Transfer</button>
            <button>QR</button>
            <button>Profil</button>
        </div>

        <h3>Riwayat</h3>
        <ul id='history'></ul>
    </div>

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore-compat.js"></script>
    
    <!-- Link ke file JS kita -->
    <script src="app.js"></script>
</body>
</html>

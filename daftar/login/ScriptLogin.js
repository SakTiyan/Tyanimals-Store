// Loading Screen Starts
window.addEventListener("load", function () {
    setTimeout(function () {
        document.getElementById("loading").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 2000);
});
// Loading Screen Ends

// Melihat Password
function togglePassword() {
    const passwordInput = document.getElementById("loginPassword");
    const lockIcon = document.getElementById("lockIcon");

    const isPasswordShown = passwordInput.type === "text";
    passwordInput.type = isPasswordShown ? "password" : "text";
    lockIcon.setAttribute("data-feather", isPasswordShown ? "lock" : "unlock");

    feather.replace();
}

// Login Starts
function login(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const usernameMsg = document.getElementById("usernameMessage");
    const passwordMsg = document.getElementById("passwordMessage");

    usernameMsg.innerText = "";
    passwordMsg.innerText = "";

    let isValid = true;

    // Validasi Username
    if (username.length < 5 || username.length > 20) {
        usernameMsg.innerText = "Username harus 5-20 karakter.";
        isValid = false;
    }

    // Validasi Password
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 8 || !hasUpper || !hasLower || !hasNumber) {
        passwordMsg.innerText = "Password minimal 8 karakter, harus ada huruf besar, kecil, dan angka.";
        isValid = false;
    }
    if (!isValid) return false;

    // Validasi localStorage Login
    const userData = localStorage.getItem("user_" + username);
    if (userData) {
        const user = JSON.parse(userData);
        if (password === user.password) {
            // Simpan login info
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);

            // Redirect ke halaman home
            window.location.href = "/Tyanimals-Store/website/1_home/index.html";
        } else {
            passwordMsg.innerText = "Password salah!";
        }
    } else {
        usernameMsg.innerText = "Akun tidak ditemukan. Silakan registrasi.";
    }

    return false;
}
// Login Ends
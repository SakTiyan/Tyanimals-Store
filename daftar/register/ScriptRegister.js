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
    const passwordInput = document.getElementById("regPassword");
    const lockIcon = document.getElementById("lockIcon");

    const isPasswordShown = passwordInput.type === "text";
    passwordInput.type = isPasswordShown ? "password" : "text";
    lockIcon.setAttribute("data-feather", isPasswordShown ? "lock" : "unlock");

    feather.replace();
}

// Register Starts
function register(event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    const usernameMsg = document.getElementById("usernameMessage");
    const emailMsg = document.getElementById("emailMessage");
    const passwordMsg = document.getElementById("passwordMessage");
    const message = document.getElementById("message");

    usernameMsg.innerText = "";
    emailMsg.innerText = "";
    passwordMsg.innerText = "";
    message.innerText = "";

    let valid = true;

    // Validasi Username
    if (username.length < 5 || username.length > 20) {
        usernameMsg.innerText = "Username harus 5-20 karakter.";
        valid = false;
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailMsg.innerText = "Email tidak valid.";
        valid = false;
    }

    // Validasi Password
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 8 || !hasUpper || !hasLower || !hasNumber) {
        passwordMsg.innerText = "Password minimal 8 karakter, harus ada huruf besar, kecil, dan angka.";
        valid = false;
    }

    if (!valid) return false;

    // Validasi localStorage Register
    const userKey = "user_" + username;
    if (localStorage.getItem(userKey)) {
        message.style.color = "red";
        message.innerText = "Username sudah terdaftar!";
        return false;
    }

    const userData = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem(userKey, JSON.stringify(userData));
    message.style.color = "green";
    message.innerText = "Registrasi berhasil! Silakan login.";

    return true;
}
// Register Ends
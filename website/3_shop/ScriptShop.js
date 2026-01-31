// Loading Screen Starts
window.addEventListener("load", function () {
    setTimeout(function () {
        document.getElementById("loading").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 2000);
});
// Loading Screen Ends

window.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem("loggedIn");
    const username = localStorage.getItem("username");

    const userIconLink = document.getElementById("userIconLink");
    const dropdown = document.getElementById("profileDropdown");

    // Pupup Welcome
    if (isLoggedIn === "true" && username) {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "30%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.padding = "30px";
        popup.style.background = "#faf6f0";
        popup.style.border = "2px solid #4a8861";
        popup.style.borderRadius = "12px";
        popup.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
        popup.style.zIndex = "9999";
        popup.style.textAlign = "center";

        popup.innerHTML = `
                <h4>Selamat datang <strong>${username}</strong> di Tyanimals Store!</h4>
                <p>Terimakasih telah berkenan login</p>
                <button onclick="this.parentElement.remove()">Tutup</button>
                `;

        document.body.appendChild(popup);

        // User Profile
        document.getElementById("profileUsername").textContent = username;

        const storedUser = localStorage.getItem("user_" + username);
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            document.getElementById("profileEmail").textContent = userObj.email || "Belum ada email";
        } else {
            document.getElementById("profileEmail").textContent = "Belum ada email";
        }

        userIconLink.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function (e) {
            if (!dropdown.contains(e.target) && !userIconLink.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });

        localStorage.removeItem("loggedIn");

    } else {
        userIconLink.setAttribute("href", "../../daftar/login/Login.html");
    }
});

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    window.location.href = "../../daftar/login/Login.html";
}

// Toggle class active untuk Shopping cart
const shoppingCart = document.querySelector('.shopping-cart')
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}
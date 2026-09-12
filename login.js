/* =========================
   THEME
========================= */

const themeToggle = document.getElementById("theme-toggle");

function updateThemeIcon() {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (document.documentElement.classList.contains("dark-mode")) {
        icon.className = "fas fa-sun";
    } else {
        icon.className = "fas fa-moon";
    }
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", function () {

        document.documentElement.classList.toggle("dark-mode");

        const isDark =
            document.documentElement.classList.contains("dark-mode");

        localStorage.setItem(
            "emplyraTheme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();
    });
}


/* =========================
   LOGIN / SIGN UP SWITCH
========================= */

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");

showSignup.addEventListener("click", function () {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
});

showLogin.addEventListener("click", function () {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});


/* =========================
   PASSWORD SHOW / HIDE
========================= */

function passwordToggle(inputId, buttonId) {

    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (!input || !button) return;

    button.addEventListener("click", function () {

        const icon = button.querySelector("i");

        if (input.type === "password") {

            input.type = "text";
            icon.className = "fas fa-eye-slash";

        } else {

            input.type = "password";
            icon.className = "fas fa-eye";
        }
    });
}

passwordToggle(
    "password",
    "login-password-toggle"
);

passwordToggle(
    "signup-password",
    "signup-password-toggle"
);


/* =========================
   SIGN UP
========================= */

const signupButton = document.getElementById("signup");

signupButton.addEventListener("click", function () {

    const name =
        document.getElementById("signup-name").value.trim();

    const email =
        document.getElementById("signup-email").value.trim();

    const password =
        document.getElementById("signup-password").value;

    const confirmPassword =
        document.getElementById("confirm-password").value;


    if (!name || !email || !password || !confirmPassword) {

        alert("Please fill all fields.");

        return;
    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    const user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem(
        "emplyraUser",
        JSON.stringify(user)
    );


    alert("Account created successfully!");


    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");


    document.getElementById("email").value = email;

});


/* =========================
   LOGIN
========================= */

const loginButton = document.getElementById("login");

loginButton.addEventListener("click", function () {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    const savedUser = JSON.parse(
        localStorage.getItem("emplyraUser")
    );


    if (!email || !password) {

        alert("Please enter email and password.");

        return;
    }


    if (!savedUser) {

        alert("No account found. Please Sign Up first.");

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "emplyraLoggedIn",
            "true"
        );

        localStorage.setItem(
            "emplyraUserName",
            savedUser.name
        );


        window.location.href = "index.html";

    } else {

        alert("Invalid email or password.");

    }

});
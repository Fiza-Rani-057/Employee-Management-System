const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector(".nav-links");

/* SAVED THEME */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.body.classList.remove("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

/* THEME TOGGLE */
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

/* MOBILE MENU */
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

/* =========================================
   SIMEC FEATURES SECTION - SCROLL REVEAL ANIMATION
========================================= */
const revealElements = document.querySelectorAll(".simec-features-section .scroll-reveal, .scroll-reveal");

const revealOptions = {
    threshold: 0.1, 
    rootMargin: "0px 0px -40px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("active");
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});
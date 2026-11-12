// =========================================
// 1. LIGHT / DARK THEME SWITCH
// =========================================

// Find the theme button on the page
const themeToggle = document.getElementById("theme-toggle");

// When the page loads, check if the visitor chose light mode last time
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "🌙";
}

// When the button is clicked, switch the theme
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});

// =========================================
// 2. PHONE MENU (☰)
// =========================================

// Find the menu button and the list of links
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// When ☰ is clicked, open or close the menu
menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    menuToggle.textContent = "✕";
    menuToggle.setAttribute("aria-label", "Close menu");
  } else {
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open menu");
  }
});

// When any menu link is clicked, close the menu
const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

// =========================================
// 3. FADE SECTIONS IN AND OUT WHILE SCROLLING
// =========================================

// Find every section on the page
const sections = document.querySelectorAll("section");

// How many pixels of scrolling a full fade takes (bigger = slower, softer fade)
const fadeDistance = 250;

// Keep a number between 0 and 1
function clamp(value) {
  return Math.min(Math.max(value, 0), 1);
}

// Work out how visible each section should be, based on where it is on screen
function updateSections() {
  const screenHeight = window.innerHeight;

  sections.forEach(function (section) {
    const box = section.getBoundingClientRect();

    // How far the section has come up from the bottom of the screen (fade in)
    const fadeIn = clamp((screenHeight - box.top) / fadeDistance);

    // How much of the section is still below the top of the screen (fade out)
    const fadeOut = clamp(box.bottom / fadeDistance);

    // Use whichever is smaller, so it fades on the way in AND the way out
    const visibility = Math.min(fadeIn, fadeOut);

    section.style.opacity = visibility;
    section.style.transform = `translateY(${(1 - fadeIn) * 40}px)`;
  });
}

// Run it whenever the page scrolls or the window changes size
window.addEventListener("scroll", updateSections);
window.addEventListener("resize", updateSections);

// Run it once when the page first loads
updateSections();
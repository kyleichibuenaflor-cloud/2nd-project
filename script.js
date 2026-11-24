// ---------- Dark mode toggle (remembers choice) ----------
const themeBtn = document.getElementById("themeToggle");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeBtn.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
}

let savedDark = false;
try { savedDark = localStorage.getItem("resume-dark") === "1"; } catch (e) {}
applyTheme(savedDark);

themeBtn.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  try { localStorage.setItem("resume-dark", isDark ? "1" : "0"); } catch (e) {}
});

// ---------- Print / Save as PDF ----------
document.getElementById("printBtn").addEventListener("click", () => window.print());

// ---------- Typing effect ----------
const phrases = ["Web Developer", "Java Programmer", "HTML & CSS Enthusiast"];
const typedEl = document.getElementById("typed");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = phrases[phraseIndex];
  typedEl.textContent = current.substring(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 300);
  }
}
type();

// ---------- Animate skill bars when visible ----------
const fills = document.querySelectorAll(".fill");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + "%";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
fills.forEach((bar) => observer.observe(bar));

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll(".site-header nav a")];
const productUrl = "yach://yach.zhiyinlou.com/session/p2p?sessionid=830388266714619904";
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -54% 0px" }
);

sections.forEach((section) => observer.observe(section));

const timerText = document.querySelector("#timerText");
const startTimer = document.querySelector("#startTimer");
const resetTimer = document.querySelector("#resetTimer");
const totalSeconds = 8 * 60;
let remaining = totalSeconds;
let timerId = null;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

function renderTimer() {
  timerText.textContent = formatTime(remaining);
}

function stopTimer() {
  window.clearInterval(timerId);
  timerId = null;
  startTimer.textContent = "开始";
}

if (timerText && startTimer && resetTimer) {
  startTimer.addEventListener("click", () => {
    if (timerId) {
      stopTimer();
      return;
    }
    startTimer.textContent = "暂停";
    timerId = window.setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      renderTimer();
      if (remaining === 0) stopTimer();
    }, 1000);
  });

  resetTimer.addEventListener("click", () => {
    stopTimer();
    remaining = totalSeconds;
    renderTimer();
  });

  renderTimer();
}

document.querySelectorAll('a[href^="yach://"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = productUrl;
    navigator.clipboard.writeText(productUrl).catch(() => {});
  });
});

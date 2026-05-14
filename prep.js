const navLinks = [...document.querySelectorAll(".site-header nav a")];
const productUrl = "yach://yach.zhiyinlou.com/session/p2p?sessionid=830388266714619904";
const sections = [...document.querySelectorAll("main .page")];
let currentIndex = Math.max(
  0,
  sections.findIndex((section) => `#${section.id}` === window.location.hash)
);

function showPage(index, shouldPushHash = true) {
  currentIndex = Math.min(Math.max(index, 0), sections.length - 1);
  sections.forEach((section, sectionIndex) => {
    section.classList.toggle("active-page", sectionIndex === currentIndex);
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sections[currentIndex].id}`);
  });
  if (shouldPushHash) {
    history.replaceState(null, "", `#${sections[currentIndex].id}`);
  }
}

function goNext() {
  if (currentIndex < sections.length - 1) showPage(currentIndex + 1);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    showPage(sections.indexOf(target));
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (navLinks.includes(link)) return;
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    showPage(sections.indexOf(target));
  });
});

sections.forEach((section) => {
  section.addEventListener("click", (event) => {
    if (event.target.closest("a, button, input, textarea, select, [role='button']")) return;
    goNext();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    goNext();
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    showPage(currentIndex - 1);
  }
});

window.addEventListener("hashchange", () => {
  const nextIndex = sections.findIndex((section) => `#${section.id}` === window.location.hash);
  if (nextIndex >= 0) showPage(nextIndex, false);
});

showPage(currentIndex, Boolean(window.location.hash));

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

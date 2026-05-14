const toast = document.querySelector("#toast");
const productUrl = "yach://yach.zhiyinlou.com/session/p2p?sessionid=830388266714619904";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text.trim());
    showToast("已复制到剪贴板");
  } catch {
    showToast("请手动复制");
  }
}

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`[data-copy="${button.dataset.copyTarget}"]`);
    if (target) copyText(target.textContent);
  });
});

const copyAll = document.querySelector("#copyAll");
copyAll.addEventListener("click", () => {
  const all = [...document.querySelectorAll("[data-copy]")]
    .map((node, index) => `场景 ${index + 1}\n${node.textContent.trim()}`)
    .join("\n\n---\n\n");
  copyText(all);
});

document.querySelectorAll('a[href^="yach://"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = productUrl;
    window.setTimeout(() => {
      navigator.clipboard.writeText(productUrl).catch(() => {});
      showToast("已尝试打开实机；若未跳转，实机链接已复制");
    }, 650);
  });
});

document.querySelectorAll(".copy-product").forEach((button) => {
  button.addEventListener("click", () => copyText(productUrl));
});

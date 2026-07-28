const COPY_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="currentColor">
    <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h9v14z"></path>
  </svg>
`;

const CHECK_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="currentColor">
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
  </svg>
`;

const STORAGE_KEY = "guide_completed_steps";

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function setCopyButtonIdleState(button) {
  button.innerHTML = COPY_ICON;
  button.classList.remove("copied");
  button.title = "Copiar código";
  button.setAttribute("aria-label", "Copiar código");
}

function setCopyButtonSuccessState(button) {
  button.innerHTML = CHECK_ICON;
  button.classList.add("copied");
  button.title = "Código copiado";
  button.setAttribute("aria-label", "Código copiado");
}

async function copyText(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

function createCopyButton(codeElement) {
  const button = document.createElement("button");
  button.className = "copy-btn";
  button.type = "button";
  let resetTimer;
  setCopyButtonIdleState(button);

  button.addEventListener("click", async () => {
    if (button.disabled) return;
    button.disabled = true;
    window.clearTimeout(resetTimer);

    try {
      await copyText(codeElement.textContent.trimEnd());
      setCopyButtonSuccessState(button);
      showToast("Código copiado para a área de transferência!");
    } catch (error) {
      button.title = "Falha ao copiar";
      button.setAttribute("aria-label", "Falha ao copiar");
      showToast("Falha ao copiar código");
    } finally {
      button.disabled = false;
      resetTimer = window.setTimeout(() => {
        setCopyButtonIdleState(button);
      }, 2000);
    }
  });

  return button;
}

function initCopyButtons() {
  const codeBlocks = document.querySelectorAll(".code-block");

  codeBlocks.forEach((block) => {
    const header = block.querySelector(".code-head");
    const code = block.querySelector("pre code");

    if (!header || !code || block.dataset.copyReady === "true") return;

    header.appendChild(createCopyButton(code));
    block.dataset.copyReady = "true";
  });
}

function getSavedCompletedSteps() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveCompletedSteps(completedArray) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedArray));
  } catch (e) {
    console.warn("Não foi possível salvar o progresso no localStorage", e);
  }
}

function updateProgressBar() {
  const toggleBtns = document.querySelectorAll(".step-toggle-btn");
  const total = toggleBtns.length;
  if (total === 0) return;

  const completedCount = document.querySelectorAll(".step-toggle-btn.completed").length;
  const percentage = Math.round((completedCount / total) * 100);

  const countEl = document.getElementById("progress-count");
  const percentEl = document.getElementById("progress-percent");
  const fillEl = document.getElementById("progress-bar-fill");

  if (countEl) countEl.textContent = `${completedCount}/${total}`;
  if (percentEl) percentEl.textContent = `${percentage}%`;
  if (fillEl) fillEl.style.width = `${percentage}%`;
}

function initChecklist() {
  const stepSections = document.querySelectorAll(".step-section");
  let completedSteps = getSavedCompletedSteps();

  stepSections.forEach((section) => {
    const stepId = section.dataset.stepId || section.id;
    const btn = section.querySelector(".step-toggle-btn");
    if (!btn) return;

    const isCompleted = completedSteps.includes(stepId);
    if (isCompleted) {
      btn.classList.add("completed");
      const toggleText = btn.querySelector(".toggle-text");
      if (toggleText) toggleText.textContent = "Concluída";
    }

    btn.addEventListener("click", () => {
      const nowCompleted = btn.classList.toggle("completed");
      const toggleText = btn.querySelector(".toggle-text");

      if (nowCompleted) {
        if (toggleText) toggleText.textContent = "Concluída";
        if (!completedSteps.includes(stepId)) completedSteps.push(stepId);
        showToast("Etapa marcada como concluída! 🎉");
      } else {
        if (toggleText) toggleText.textContent = "Concluir Etapa";
        completedSteps = completedSteps.filter((id) => id !== stepId);
      }

      saveCompletedSteps(completedSteps);
      updateProgressBar();
    });
  });

  updateProgressBar();
}

function initSearchFilter() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const sections = document.querySelectorAll("main.content section");
  const phaseBanners = document.querySelectorAll(".phase-banner");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
      sections.forEach((sec) => (sec.style.display = ""));
      phaseBanners.forEach((banner) => (banner.style.display = ""));
      return;
    }

    sections.forEach((sec) => {
      const text = sec.textContent.toLowerCase();
      if (text.includes(query)) {
        sec.style.display = "";
      } else {
        sec.style.display = "none";
      }
    });

    phaseBanners.forEach((banner) => {
      let nextElement = banner.nextElementSibling;
      let hasMatchingSection = false;

      while (nextElement && !nextElement.classList.contains("phase-banner")) {
        if (nextElement.tagName === "SECTION" && nextElement.style.display !== "none") {
          hasMatchingSection = true;
          break;
        }
        nextElement = nextElement.nextElementSibling;
      }

      banner.style.display = hasMatchingSection ? "" : "none";
    });
  });
}

function initScrollSpy() {
  const tocLinks = document.querySelectorAll(".toc-list a");
  const sections = document.querySelectorAll("main.content section");

  if (sections.length === 0 || tocLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        tocLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCopyButtons();
  initChecklist();
  initSearchFilter();
  initScrollSpy();
  initBackToTop();
});

const COPY_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h9v14z"></path>
  </svg>
`;

const CHECK_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
  </svg>
`;

function setCopyButtonIdleState(button) {
  button.innerHTML = COPY_ICON;
  button.classList.remove("copied");
  button.title = "Copiar codigo";
  button.setAttribute("aria-label", "Copiar codigo");
}

function setCopyButtonSuccessState(button) {
  button.innerHTML = CHECK_ICON;
  button.classList.add("copied");
  button.title = "Codigo copiado";
  button.setAttribute("aria-label", "Codigo copiado");
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
    if (button.disabled) {
      return;
    }

    button.disabled = true;
    window.clearTimeout(resetTimer);

    try {
      await copyText(codeElement.textContent.trimEnd());
      setCopyButtonSuccessState(button);
    } catch (error) {
      button.title = "Falha ao copiar";
      button.setAttribute("aria-label", "Falha ao copiar");
    } finally {
      button.disabled = false;
      resetTimer = window.setTimeout(() => {
        setCopyButtonIdleState(button);
      }, 1800);
    }
  });

  return button;
}

function initCopyButtons() {
  const codeBlocks = document.querySelectorAll(".code-block");

  codeBlocks.forEach((block) => {
    const header = block.querySelector(".code-head");
    const code = block.querySelector("pre code");

    if (!header || !code || block.dataset.copyReady === "true") {
      return;
    }

    header.appendChild(createCopyButton(code));
    block.dataset.copyReady = "true";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCopyButtons();
});

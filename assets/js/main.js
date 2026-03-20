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

const CHECKLIST_STORAGE_KEY = "template-aula-checklist-state-v3";

function setCopyButtonIdleState(button) {
  button.innerHTML = COPY_ICON;
  button.classList.remove("copied");
  button.title = "Copiar codigo";
  button.setAttribute("aria-label", "Copiar codigo");
}

function setCopyButtonSuccessState(button) {
  button.innerHTML = CHECK_ICON;
  button.classList.add("copied");
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
  setCopyButtonIdleState(button);

  button.addEventListener("click", async () => {
    try {
      await copyText(codeElement.textContent.trimEnd());
      setCopyButtonSuccessState(button);

      window.setTimeout(() => {
        setCopyButtonIdleState(button);
      }, 1800);
    } catch (error) {
      button.title = "Falha ao copiar";
      button.setAttribute("aria-label", "Falha ao copiar");

      window.setTimeout(() => {
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

function loadChecklistState() {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function persistChecklistState(state) {
  try {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Ignore storage failures so the checklist still works in memory.
  }
}

function ensureChecklistMarkup(item) {
  let icon = item.querySelector(":scope > .task-toggle, :scope > .check");

  if (!icon) {
    icon = document.createElement("span");
    icon.className = "task-toggle";
    icon.setAttribute("aria-hidden", "true");
    item.prepend(icon);
  }

  let label = item.querySelector(":scope > .task-label");

  if (!label) {
    label = document.createElement("span");
    label.className = "task-label";

    Array.from(item.childNodes).forEach((node) => {
      if (node !== icon) {
        label.appendChild(node);
      }
    });

    item.appendChild(label);
  }

  return { icon, label };
}

function syncChecklistItem(item, icon, checked) {
  item.classList.toggle("checked", checked);
  item.setAttribute("aria-checked", String(checked));
  icon.textContent = checked ? "✓" : "";
}

function getChecklistItemKey(item, listIndex, itemIndex) {
  const section = item.closest("section");
  const sectionId = section ? section.id : "global";
  const label = item.textContent.replace(/\s+/g, " ").trim();
  return `${sectionId}:${listIndex}:${itemIndex}:${label}`;
}

function initChecklists() {
  const checklistState = loadChecklistState();
  const lists = document.querySelectorAll("[data-checklist]");

  lists.forEach((list, listIndex) => {
    const items = Array.from(list.children).filter((child) => child.tagName === "LI");

    items.forEach((item, itemIndex) => {
      const { icon } = ensureChecklistMarkup(item);
      const key = getChecklistItemKey(item, listIndex, itemIndex);
      const initialChecked = Boolean(checklistState[key]);

      item.classList.add("task-item");
      item.setAttribute("role", "checkbox");
      item.setAttribute("tabindex", "0");
      item.setAttribute("title", "Clique para marcar ou desmarcar");

      syncChecklistItem(item, icon, initialChecked);

      const toggleItem = () => {
        const nextValue = !item.classList.contains("checked");
        checklistState[key] = nextValue;
        syncChecklistItem(item, icon, nextValue);
        persistChecklistState(checklistState);
      };

      item.addEventListener("click", toggleItem);
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleItem();
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCopyButtons();
  initChecklists();
});

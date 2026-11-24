import { filterTasks, getTaskStats } from "./tugas.js";
import { KartuTugas } from "./komponen.js";

function motionAllowed() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateElement(
  element,
  keyframes,
  duration = 240,
  easing = "ease-out"
) {
  if (!element || !motionAllowed() || typeof element.animate !== "function") {
    return;
  }

  element.animate(keyframes, {
    duration: Math.min(400, Math.max(150, duration)),
    easing,
    fill: "both"
  });
}

export function showView(viewId, onDashboardOpen) {
  const validIds = ["dashboard", "tasks", "about"];
  if (!validIds.includes(viewId)) return;

  document.querySelectorAll(".view").forEach(view => {
    view.hidden = view.id !== viewId;
  });

  document.querySelectorAll(".main-nav [data-view]").forEach(button => {
    const active = button.dataset.view === viewId;
    button.classList.toggle("active", active);

    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  const activeView = document.getElementById(viewId);
  animateElement(
    activeView,
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    240
  );

  if (viewId === "dashboard" && typeof onDashboardOpen === "function") {
    onDashboardOpen();
  }
}

export function renderDashboard(tasks, dom) {
  const { total, done, pending, percent } = getTaskStats(tasks);

  dom.totalCount.textContent = total;
  dom.doneCount.textContent = done;
  dom.pendingCount.textContent = pending;
  dom.progressPercent.textContent = percent + "%";
  dom.progressFill.style.width = percent + "%";
  dom.progressBar.setAttribute("aria-valuenow", String(percent));

  dom.dashboardTaskList.replaceChildren();

  if (tasks.length === 0) {
    const kosong = document.createElement("p");
    kosong.className = "empty-inline";
    kosong.textContent =
      "Belum ada tugas. Buka Kelola Tugas untuk menambahkan tugas pertamamu.";
    dom.dashboardTaskList.appendChild(kosong);
    return;
  }

  const latestTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 3);
  latestTasks.forEach(task => {
    dom.dashboardTaskList.appendChild(KartuTugas(task, { ringkas: true }));
  });
}

export function renderTasks(tasks, dom, animateTaskId = null) {
  const search = dom.searchInput.value.trim().toLowerCase();
  const filter = dom.filterPriority.value;
  const filtered = filterTasks(tasks, search, filter);

  dom.taskList.replaceChildren();

  if (filtered.length === 0) {
    dom.emptyState.classList.remove("hidden");
    dom.emptyState.querySelector("h3").textContent =
      tasks.length === 0 ? "Belum ada tugas" : "Tugas tidak ditemukan";
    dom.emptyState.querySelector("p").textContent =
      tasks.length === 0
        ? "Tambahkan tugas pertama kamu melalui formulir di atas."
        : "Coba ubah kata pencarian atau filter.";
  } else {
    dom.emptyState.classList.add("hidden");
  }

  filtered.forEach(task => {
    const article = KartuTugas(task, { ringkas: false });
    dom.taskList.appendChild(article);

    if (animateTaskId !== null && task.id === animateTaskId) {
      animateElement(
        article,
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        260
      );
    }
  });
}
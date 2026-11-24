import {
  filterTasks,
  getTaskStats,
  formatDate,
  priorityClass,
  escapeHtml
} from "./tugas.js";

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

  if (tasks.length === 0) {
    dom.dashboardTaskList.innerHTML =
      '<p class="empty-inline">Belum ada tugas. Buka Kelola Tugas untuk menambahkan tugas pertamamu.</p>';
    return;
  }

  const latestTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 3);
  dom.dashboardTaskList.innerHTML = latestTasks
    .map(
      task => `
    <article class="dashboard-task">
      <div>
        <strong>${escapeHtml(task.name)}</strong>
        <small>${escapeHtml(task.course)} · Deadline: ${formatDate(task.deadline)}</small>
      </div>
      <span class="status-pill ${task.completed ? "done" : ""}">
        ${task.completed ? "Selesai" : "Belum selesai"}
      </span>
    </article>
  `
    )
    .join("");
}

export function renderTasks(tasks, dom, animateTaskId = null) {
  const search = dom.searchInput.value.trim().toLowerCase();
  const filter = dom.filterPriority.value;
  const filtered = filterTasks(tasks, search, filter);

  dom.taskList.innerHTML = "";

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
    const article = document.createElement("article");
    article.className = "task-item" + (task.completed ? " completed" : "");
    article.innerHTML = `
      <div class="task-main">
        <h3 class="${task.completed ? "done-title" : ""}">
          ${escapeHtml(task.name)}
          <span class="badge ${priorityClass(task.priority)}">${escapeHtml(task.priority)}</span>
        </h3>
        <p>${escapeHtml(task.course)} • Deadline: ${formatDate(task.deadline)}</p>
        <p>Status: ${task.completed ? "Selesai" : "Belum selesai"}</p>
      </div>
      <div class="task-actions">
        <button type="button" data-action="toggle" data-id="${task.id}">
          ${task.completed ? "Batalkan selesai" : "Tandai selesai"}
        </button>
        <button type="button" class="delete" data-action="delete" data-id="${task.id}">Hapus</button>
      </div>
    `;
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
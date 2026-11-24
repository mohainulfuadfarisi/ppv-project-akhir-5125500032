import { loadTasks, saveTasks } from "./penyimpanan.js";
import { createTask, toggleTask, deleteTask } from "./tugas.js";
import { showView, renderDashboard, renderTasks } from "./tampilan.js";
import { showToast, initIcons } from "./ui-pustaka.js";

const dom = {
  taskForm: document.getElementById("taskForm"),
  taskName: document.getElementById("taskName"),
  course: document.getElementById("course"),
  deadline: document.getElementById("deadline"),
  priority: document.getElementById("priority"),
  clearBtn: document.getElementById("clearBtn"),
  searchInput: document.getElementById("searchInput"),
  filterPriority: document.getElementById("filterPriority"),
  taskList: document.getElementById("taskList"),
  emptyState: document.getElementById("emptyState"),
  loadingState: document.getElementById("loadingState"),
  formMessage: document.getElementById("formMessage"),
  totalCount: document.getElementById("totalCount"),
  doneCount: document.getElementById("doneCount"),
  pendingCount: document.getElementById("pendingCount"),
  progressPercent: document.getElementById("progressPercent"),
  progressBar: document.getElementById("progressBar"),
  progressFill: document.getElementById("progressFill"),
  dashboardTaskList: document.getElementById("dashboardTaskList"),
  submitBtn: document.getElementById("submitBtn")
};

let tasks = loadTasks();

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearErrors() {
  ["taskNameError", "courseError", "deadlineError", "priorityError"].forEach(id =>
    showError(id, "")
  );
}

function validateForm() {
  clearErrors();
  let valid = true;

  if (dom.taskName.value.trim().length < 3) {
    showError("taskNameError", "Nama tugas minimal 3 karakter.");
    valid = false;
  }

  if (dom.course.value.trim() === "") {
    showError("courseError", "Mata kuliah wajib diisi.");
    valid = false;
  }

  if (dom.deadline.value === "") {
    showError("deadlineError", "Deadline wajib dipilih.");
    valid = false;
  } else {
    const selected = new Date(dom.deadline.value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      showError("deadlineError", "Deadline tidak boleh sebelum hari ini.");
      valid = false;
    }
  }

  if (dom.priority.value === "") {
    showError("priorityError", "Pilih salah satu prioritas.");
    valid = false;
  }

  return valid;
}

function renderAll(animateTaskId = null) {
  renderTasks(tasks, dom, animateTaskId);
  renderDashboard(tasks, dom);
}

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () =>
    showView(button.dataset.view, () => renderDashboard(tasks, dom))
  );
});

document.querySelectorAll("[data-view-link]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showView(link.dataset.viewLink, () => renderDashboard(tasks, dom));
  });
});

dom.taskForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!validateForm()) {
    dom.formMessage.textContent = "Periksa kembali data yang bertanda merah.";
    dom.formMessage.style.color = "#ff7770";
    return;
  }

  const newTask = createTask({
    name: dom.taskName.value,
    course: dom.course.value,
    deadline: dom.deadline.value,
    priority: dom.priority.value
  });

  dom.loadingState.classList.remove("hidden");
  dom.taskList.classList.add("hidden");
  dom.submitBtn.disabled = true;

  setTimeout(() => {
    tasks.push(newTask);
    saveTasks(tasks);
    dom.taskForm.reset();
    clearErrors();

    dom.loadingState.classList.add("hidden");
    dom.taskList.classList.remove("hidden");
    dom.submitBtn.disabled = false;
    dom.formMessage.textContent = "Tugas berhasil ditambahkan.";
    showToast("Tugas berhasil ditambahkan.");
    dom.formMessage.style.color = "#78e6a0";
    renderAll(newTask.id);
  }, 300);
});

dom.clearBtn.addEventListener("click", () => {
  dom.taskForm.reset();
  clearErrors();
  dom.formMessage.textContent = "Form sudah dikosongkan.";
  dom.formMessage.style.color = "#a7b5cc";
});

dom.searchInput.addEventListener("input", () => renderAll());
dom.filterPriority.addEventListener("change", () => renderAll());

dom.taskName.addEventListener("input", () => {
  if (dom.taskName.value.trim().length >= 3) showError("taskNameError", "");
});

[dom.taskName, dom.course, dom.deadline, dom.priority].forEach(el => {
  el.addEventListener("input", () => {
    dom.formMessage.textContent = "";
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Enter" && document.activeElement === dom.taskName) {
    event.preventDefault();
    dom.course.focus();
  }
});

dom.taskList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "toggle") {
    tasks = toggleTask(tasks, id);
  } else if (action === "delete") {
    tasks = deleteTask(tasks, id);
  }

  saveTasks(tasks);
  renderAll();
});

renderAll();
showView("dashboard", () => renderDashboard(tasks, dom));
initIcons();
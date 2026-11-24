export function createTask({ name, course, deadline, priority }) {
  return {
    id: Date.now(),
    name: name.trim(),
    course: course.trim(),
    deadline,
    priority,
    completed: false
  };
}

export function filterTasks(tasks, search = "", priorityFilter = "Semua") {
  const query = search.trim().toLowerCase();

  return tasks.filter(task => {
    const matchesSearch =
      query === "" ||
      task.name.toLowerCase().includes(query) ||
      task.course.toLowerCase().includes(query);

    const matchesPriority =
      !priorityFilter ||
      priorityFilter === "Semua" ||
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const done = tasks.filter(task => task.completed).length;
  const pending = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return { total, done, pending, percent };
}

export function toggleTask(tasks, id) {
  return tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

export function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function priorityClass(priority) {
  const map = {
    Tinggi: "priority-high",
    Sedang: "priority-medium",
    Rendah: "priority-low"
  };
  return map[priority] || "priority-low";
}

export function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
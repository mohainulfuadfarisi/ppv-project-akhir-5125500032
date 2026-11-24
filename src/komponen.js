import { formatDate, priorityClass } from "./tugas.js";

function buatElemen(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined && text !== null) {
    el.textContent = String(text);
  }
  return el;
}

export function KartuTugas(task = {}, opsi = {}) {
  const { ringkas = false } = opsi;
  const completed = Boolean(task.completed);

  if (ringkas) {
    const itemRingkas = buatElemen("article", "dashboard-task");
    const kiri = buatElemen("div");
    const judul = buatElemen("strong", "", task.name ?? "");
    const info = buatElemen(
      "small",
      "",
      `${task.course ?? ""} · Deadline: ${formatDate(task.deadline)}`
    );
    kiri.append(judul, info);

    const badge = buatElemen(
      "span",
      `status-pill ${completed ? "done" : ""}`,
      completed ? "Selesai" : "Belum selesai"
    );

    itemRingkas.append(kiri, badge);
    return itemRingkas;
  }

  const article = buatElemen(
    "article",
    "task-item" + (completed ? " completed" : "")
  );
  if (task.id !== undefined) {
    article.dataset.id = String(task.id);
  }

  const main = buatElemen("div", "task-main");
  const h3 = buatElemen("h3", completed ? "done-title" : "", task.name ?? "");

  if (task.priority) {
    const prioBadge = buatElemen(
      "span",
      `badge ${priorityClass(task.priority)}`,
      task.priority
    );
    h3.append(" ", prioBadge);
  }

  const pDetail = buatElemen(
    "p",
    "",
    `${task.course ?? ""} • Deadline: ${formatDate(task.deadline)}`
  );
  const pStatus = buatElemen(
    "p",
    "",
    `Status: ${completed ? "Selesai" : "Belum selesai"}`
  );
  main.append(h3, pDetail, pStatus);

  const actions = buatElemen("div", "task-actions");
  const btnToggle = buatElemen(
    "button",
    "",
    completed ? "Batalkan selesai" : "Tandai selesai"
  );
  btnToggle.type = "button";
  btnToggle.dataset.action = "toggle";
  btnToggle.dataset.id = String(task.id ?? "");

  const btnDelete = buatElemen("button", "delete", "Hapus");
  btnDelete.type = "button";
  btnDelete.dataset.action = "delete";
  btnDelete.dataset.id = String(task.id ?? "");

  actions.append(btnToggle, btnDelete);
  article.append(main, actions);
  return article;
}
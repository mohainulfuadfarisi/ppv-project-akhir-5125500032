export const KUNCI = "tugasku:v1";

let memoriCadangan = [];
let statusPenyimpanan = { ok: true, pesan: "" };

export function getStatusPenyimpanan() {
  return { ...statusPenyimpanan };
}

function adalahTugasSah(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    !Array.isArray(item) &&
    typeof item.name === "string" &&
    item.name.trim().length > 0
  );
}

function bersihkanTugas(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(adalahTugasSah);
}

export function muat() {
  try {
    const raw = localStorage.getItem(KUNCI);
    statusPenyimpanan = { ok: true, pesan: "" };

    if (raw === null) {
      memoriCadangan = [];
      return [];
    }

    const parsed = JSON.parse(raw);
    const valid = bersihkanTugas(parsed);
    memoriCadangan = valid.map((item) => ({ ...item }));
    return valid.map((item) => ({ ...item }));
  } catch (error) {
    statusPenyimpanan = {
      ok: false,
      pesan: `Penyimpanan tidak dapat dibaca (${error?.name || "Error"}). Menggunakan data sementara di memori.`
    };
    return memoriCadangan.map((item) => ({ ...item }));
  }
}

export function simpan(tasks) {
  const valid = bersihkanTugas(tasks);
  memoriCadangan = valid.map((item) => ({ ...item }));

  try {
    localStorage.setItem(KUNCI, JSON.stringify(valid));
    statusPenyimpanan = { ok: true, pesan: "" };
    return true;
  } catch (error) {
    statusPenyimpanan = {
      ok: false,
      pesan: `Data tidak tersimpan permanen (${error?.name || "StorageError"}). Perubahan hanya bertahan di sesi ini.`
    };
    return false;
  }
}

export const loadTasks = muat;
export const saveTasks = simpan;
# Peta Modul — TugasKu

## Peta Ketergantungan Modul (Satu Arah)

```text
index.html
   │
   ▼ (type="module")
src/main.js
   ├──► src/penyimpanan.js
   ├──► src/tugas.js
   ├──► src/tampilan.js ──► src/tugas.js
   └──► src/ui-pustaka.js
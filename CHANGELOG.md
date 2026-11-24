# Changelog — TugasKu

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-11-24

### Added
- Menambahkan komponen *reusable* `KartuTugas` pada `src/komponen.js` menggunakan `textContent` untuk teks pengguna.
- Menambahkan cadangan memori dan pelacakan status penyimpanan pada `src/penyimpanan.js`.

### Changed
- Menggunakan komponen `KartuTugas` pada daftar tugas dan ringkasan dashboard di `src/tampilan.js`.
- Memperkuat `muat()` dan `simpan()` pada `src/penyimpanan.js` agar menyaring data rusak dan tidak melempar galat saat penyimpanan rusak, penuh, atau diblokir.
- Memperbarui `README.md`, `CHANGELOG.md`, dan `docs/ROADMAP.md` untuk Sprint 4.

## [0.3.0] - 2026-11-17

### Changed
- Memecah kode aplikasi menjadi modul ES satu arah di `src/` (`main.js`, `penyimpanan.js`, `tugas.js`, `tampilan.js`, `ui-pustaka.js`) dan menambahkan `MODULE_MAP.md`.

## [0.2.0] - 2026-11-10

### Fixed
- Memperbaiki 2 bug nyata pada pengelolaan tugas dan validasi/penyimpanan pada Sprint 2, menyeragamkan nama aset, serta menambahkan `docs/DEBUG_LOG.md` dan `assets/manifest.json`.

## [0.1.0] - 2026-11-03

### Added
- Basis awal aplikasi TugasKu, integrasi Bootstrap 5.3.3, serta dokumentasi `docs/CHARTER.md`, `docs/ROADMAP.md`, dan `DEPENDENCIES.md`.
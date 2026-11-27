// konsep.js — Konsep produk TugasKu berdasarkan progres P09-P12 (v0.4.0)
const KONSEP = {
  nama: 'TugasKu',
  tagline: 'Kelola tugas kuliah dan proyek praktikum tanpa ribet login.',
  persona: {
    nama: 'Nadia, 20 tahun',
    siapa: 'Mahasiswa D3 yang menjalani kuliah teori, praktikum lab, dan tenggat tugas mingguan bersamaan.',
    keseharian: 'Berpindah antara kelas, ruang praktik, dan mengerjakan tugas di laptop saat jeda jadwal.',
    masalah: 'Sering lupa tenggat tugas kecil atau kebingungan memprioritaskan pekerjaan saat banyak tugas menumpuk di catatan terpisah.',
  },
  masalah: 'Mahasiswa sering mencatat tugas di berbagai tempat seperti chat pribadi, catatan acak, atau ingatan saja. Akibatnya tenggat waktu mudah terlewat dan urutan pengerjaan tidak terarah. Aplikasi manajemen tugas yang terlalu kompleks justru memperlambat pencatatan cepat.',
  solusi: 'Aplikasi web TugasKu menyediakan pencatatan, pembaruan status, dan tampilan daftar tugas yang ringkas langsung di peramban. Data tersimpan otomatis secara lokal melalui modul penyimpanan tanpa hambatan registrasi akun. Struktur kode modular menjaga antarmuka tetap ringan dan mudah dikembangkan.',
  fitur: [
    { nama: 'Tambah dan kelola daftar tugas (v0.4.0)', prioritas: 'wajib', alasan: 'Menjawab inti masalah pencatatan dan pemantauan tugas harian persona.' },
    { nama: 'Penyimpanan lokal otomatis via localStorage (v0.4.0)', prioritas: 'wajib', alasan: 'Menjaga data tugas tetap ada saat halaman dimuat ulang tanpa perlu server/login.' },
    { nama: 'Antarmuka responsif dan komponen modular (v0.4.0)', prioritas: 'wajib', alasan: 'Memastikan tampilan rapi dan mudah dipakai cepat di layar laptop maupun peramban modern.' },
    { nama: 'Filter atau penanda status penyelesaian tugas (v0.4.0)', prioritas: 'sebaiknya', alasan: 'Membantu membedakan tugas aktif dan selesai saat daftar mulai panjang.' },
    { nama: 'Pengingat notifikasi push & sinkronisasi cloud multi-akun', prioritas: 'belum', alasan: 'Memerlukan layanan backend/autentikasi dan belum dibutuhkan untuk memvalidasi nilai utama aplikasi.' },
  ],
  pembanding: [
    { nama: 'Notion / Trello', kelebihan: 'Fitur lengkap, fleksibel, dan mendukung kolaborasi luas.', kekurangan: 'Terlalu berat/kompleks untuk sekadar mencatat tugas cepat dan butuh akun/koneksi.' },
    { nama: 'Catatan bawaan / Chat ke diri sendiri', kelebihan: 'Sangat cepat dibuka dan sudah biasa dipakai.', kekurangan: 'Sulit menyaring status tugas, rawan tenggelam, dan tidak terstruktur.' },
  ],
  pembeda: 'Fokus pada alur catat-kelola tugas kuliah yang ringan, langsung pakai tanpa login, dan dibangun dengan arsitektur ES module terstruktur (v0.4.0).',
};
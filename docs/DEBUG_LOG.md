Catatan Investigasi Bug — TugasKu (Sprint 2 / P10)

BUG-P10-01 — Modul ES Tidak Terbaca & Filter/Pencarian Tidak Menyinkronkan Dashboard

Langkah reproduksi:

Buka index.html melalui server lokal (Live Server) dan periksa tab Console pada DevTools.

Buka tampilan Kelola Tugas, lalu ketik kata kunci pada #searchInput atau ubah pilihan pada #filterPriority.

Hipotesis:

Path relatif ./src/penyimpanan.js dan ./src/tugas.js pada main.js salah (gugur: kedua berkas berada di dalam folder src/ sesuai struktur proyek).

Tag <script src="main.js" defer></script> pada index.html belum memiliki atribut type="module" sehingga sintaks import gagal dijalankan oleh browser, dan event listener pada #searchInput serta #filterPriority di main.js hanya memanggil renderTasks tanpa renderAll() (terbukti).

Bukti DevTools:

Tab Console menampilkan galat SyntaxError: Cannot use import statement outside a module saat main.js dimuat tanpa type="module".

Pemeriksaan alur fungsi di tab Sources menunjukkan renderAll() tidak dipanggil ketika input pencarian atau filter prioritas berubah.

Perbaikan:

index.html:12 — Mengubah <script src="main.js" defer></script> menjadi <script type="module" src="main.js"></script>.

main.js:295-296 — Mengubah listener searchInput dan filterPriority agar memanggil () => renderAll().

Uji ulang:

Halaman memuat seluruh modul ES tanpa galat di Console, dan perubahan pencarian maupun filter prioritas berjalan sinkron tanpa kendala.

BUG-P10-02 — Pesan Status Form Tidak Terhapus Saat Pengguna Mengubah Isian

Langkah reproduksi:

Buka tampilan Kelola Tugas.

Klik tombol Tambah Tugas dengan form kosong (atau setelah berhasil menambahkan tugas) hingga muncul pesan status pada #formMessage.

Mulai ketik ulang pada salah satu kolom input form (#taskName, #course, #deadline, atau #priority).

Hipotesis:

Elemen #formMessage otomatis disembunyikan oleh aturan CSS saat input mendapat fokus (gugur: aturan CSS .form-message tidak memiliki properti penyembunyi saat :focus).

Tidak ada event listener input pada elemen formulir yang mengosongkan formMessage.textContent ketika pengguna mulai memperbaiki atau mengubah isian (terbukti).

Bukti DevTools:

Tab Elements menunjukkan teks pada <span id="formMessage" class="form-message"> tetap bertahan dengan warna status lama meskipun pengguna sudah mulai mengetik isian baru.

Perbaikan:

main.js:302-306 — Menambahkan event listener input pada [taskName, course, deadline, priority] untuk mengosongkan formMessage.textContent = "".

Uji ulang:

Ketika pengguna mulai mengetik atau mengubah isian pada kolom form, pesan status sebelumnya pada #formMessage langsung bersih.
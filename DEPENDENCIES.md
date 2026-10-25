# Dependencies — TugasKu

## Pustaka UI
- **Nama:** Bootstrap
- **Versi:** 5.3.3
- **Sumber CSS:** https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
- **Sumber JavaScript:** https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js

## Komponen yang Digunakan
1. **Card:** kartu statistik dashboard dan panel konten.
2. **Toast:** notifikasi setelah tugas ditambahkan atau diperbarui.
3. **Navbar:** navigasi utama aplikasi.

## Ukuran Transfer
Isi berdasarkan hasil aktual browser DevTools → Network setelah cache dinonaktifkan dan halaman dimuat ulang.

| File | Ukuran transfer aktual |
|---|---|
| bootstrap.min.css | 34.0 kB |
| bootstrap.bundle.min.js | 25.2 kB |

## Evaluasi Sebelum Memasang Pustaka

### 1. Apakah kebutuhan tampilan bisa dibuat dengan HTML dan CSS sendiri?
Bisa untuk sebagian besar tampilan, tetapi Bootstrap mempercepat pembuatan komponen antarmuka yang konsisten.

### 2. Apakah pustaka sesuai dengan kebutuhan pengguna?
Bootstrap menyediakan komponen antarmuka dan dukungan tata letak responsif untuk mahasiswa yang mengakses TugasKu melalui laptop atau HP.

### 3. Apa dampak ukuran dan dependensi tambahan?
Bootstrap menambah data yang harus dimuat browser. Dampaknya perlu dievaluasi melalui ukuran transfer aktual di DevTools Network.

### 4. Apakah pustaka dipelihara dan dapat digunakan dengan aman?
Versi pustaka dicatat secara spesifik. Dokumentasi, catatan rilis, dan informasi keamanan perlu diperiksa sebelum rilis aplikasi.
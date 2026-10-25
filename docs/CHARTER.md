# Project Charter — TugasKu

## 1. Masalah yang Diselesaikan
Mahasiswa sering kesulitan mencatat, mencari, dan memantau penyelesaian tugas kuliah jika informasi tugas tersebar di berbagai tempat. TugasKu membantu mengelola tugas dalam satu aplikasi yang dapat digunakan melalui laptop maupun HP.

## 2. Pengguna Sasaran dan Persona
**Persona: Mahasiswa Aktif**

Mahasiswa yang mengikuti beberapa mata kuliah, menerima tugas dengan tenggat berbeda, dan menggunakan HP atau laptop untuk mengatur kegiatan kuliah. Ia membutuhkan cara sederhana untuk mencatat tugas, mengetahui prioritas, dan memantau tugas yang sudah selesai.

## 3. Fitur MVP — Prioritas MoSCoW

| Prioritas | Fitur |
|---|---|
| Must | Menambahkan tugas beserta nama, mata kuliah, tenggat, dan prioritas. |
| Must | Melihat daftar tugas, menandai tugas selesai, dan menghapus tugas. |
| Must | Menyimpan data tugas secara lokal menggunakan localStorage. |
| Should | Mencari tugas dan memfilter berdasarkan prioritas. |
| Should | Menampilkan statistik dan progres tugas pada dashboard. |
| Won't | Akun pengguna dan sinkronisasi tugas melalui server pada versi MVP. |

## 4. Kriteria Keberhasilan
1. Pengguna baru dapat menambahkan satu tugas dalam waktu maksimal 2 menit tanpa bantuan.
2. Tugas yang ditambahkan muncul di daftar dan tetap tersedia setelah halaman dimuat ulang, selama penyimpanan browser berfungsi.
3. Pengguna dapat mencari, memfilter, menandai selesai, dan menghapus tugas dengan hasil yang sesuai.
4. Tampilan utama dapat digunakan pada layar HP dengan lebar sekitar 400 px dan pada laptop tanpa fitur utama terpotong.

Kriteria tersebut akan diverifikasi melalui pengujian aplikasi.

## 5. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Penyimpanan browser gagal atau penuh. | Tangani kesalahan penyimpanan dan tampilkan pemberitahuan kepada pengguna. |
| Perubahan kode merusak fitur yang sudah berjalan. | Gunakan Git untuk mencatat perubahan dan uji fitur utama setelah setiap perubahan. |
| Tampilan berubah atau tidak nyaman pada layar HP. | Uji tampilan pada lebar sekitar 400 px dan layar laptop. |
| Pustaka UI berbenturan dengan CSS yang sudah ada. | Kunci versi pustaka, muat CSS aplikasi setelah CSS pustaka, dan uji ulang tampilan. |

## 6. Batasan Proyek
Pengembangan dilakukan bertahap pada sprint P10–P14. MVP berfokus pada pengelolaan tugas kuliah secara lokal, kemudahan penggunaan, dan tampilan responsif.

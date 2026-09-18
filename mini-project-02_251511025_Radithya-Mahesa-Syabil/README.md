# Mini Project 02 - Radithya Mahesa Syabil / 251511025

**Source Code:** https://github.com/raditted/mini-project-02_251511025_Radithya-Mahesa-Syabil.git

## Cara Menjalankan Proyek (VS Code Live Server)
1. **Install Ekstensi Live Server**:
   - Buka VS Code.
   - Masuk ke tab **Extensions**.
   - Cari **Live Server** lalu klik **Install**.
2. **Buka Folder Proyek**:
   - Buka folder proyek ini di VS Code via `File` > `Open Folder...`.
3. **Menyalakan Live Server**:
   - **Cara 1:** Klik tombol **"Go Live"** di status bar pojok kanan bawah VS Code.
   - **Cara 2:** Buka file `index.html`, klik kanan pada editor, lalu pilih **"Open with Live Server"**.
   - **Cara 3:** Tekan kombinasi tombol `Alt + L, Alt + O` saat file `index.html` terbuka.
4. **Akses di Browser**:
   - Browser akan terbuka secara otomatis di alamat `http://127.0.0.1:5500`.

## Ringkasan Fitur & Halaman
Telah dikembangkan interaktivitas Vanilla JavaScript untuk website UMKM **"Baking Bread"** tanpa menggunakan modul eksternal/framework (menggunakan `'use strict'`). Fitur-fitur utama yang diimplementasikan meliputi:
1. **Navigasi Mobile Responsif**: Hamburger menu dengan animasi toggle serta penyesuaian atribut aksesibilitas (`aria-expanded` & `aria-label`).
2. **Toggle Tema Gelap/Terang**: Pengubahan mode tampilan visual secara dinamis melalui `classList.toggle('dark-theme')`.
3. **Penyaringan (Filtering) Produk Dinamis**: Render produk dari data array berbasis kategori (`Roti Sweet`, `Roti Bread`, `Roti Panggang`, `Semua`) secara responsif.
4. **Accordion FAQ**: Komponen FAQ interaktif yang dapat membuka-tutup detail pertanyaan dengan aksesibilitas ARIA.
5. **Validasi Form Kontak Client-side**: Validasi masukan nama, format email (regex), dan panjang pesan secara otomatis beserta feedback error dan tampilan sukses.
6. **Tombol Back-to-Top**: Tombol navigasi melayang yang muncul saat scroll melewati 300px untuk kembali ke atas halaman dengan `smooth scroll`.

## Tiga Keputusan Teknis
1. **Event Delegation untuk Event Listener Efisien**. Alih-alih memasang event listener pada setiap tombol filter dan item FAQ secara individu, event listener dipasang pada kontainer induk (`#bar-filter` dan `#daftar-faq`) menggunakan `event.target.closest()`. Hal ini menghemat penggunaan memori dan menjaga performa aplikasi.

2. **Penggunaan `DocumentFragment` dan `replaceChildren()` untuk Render DOM**. Saat melakukan filter produk, kontainer dibersihkan secara efisien dengan `containerProduk.replaceChildren()`, kemudian semua elemen kartu disusun terlebih dahulu di dalam `DocumentFragment` sebelum dimasukkan ke dalam DOM. Ini meminimalkan proses *reflow* dan *repaint* browser.

3. **Pengelolaan Aksesibilitas ARIA secara Dinamis**. Seluruh komponen interaktif (menu navigasi, toggle tema, filter kategori, FAQ, dan form validasi) memperbarui atribut `aria-expanded`, `aria-pressed`, `aria-label`, dan `aria-invalid` secara real-time melalui JavaScript untuk mendukung *screen reader* dan pengguna disabilitas.

## Masalah, Diagnosis, dan Perbaikan
* **Masalah:** Form kontak tetap mengirimkan data secara default (halaman refresh) saat tombol *submit* diklik, serta tidak ada umpan balik jika input tidak diisi atau format email salah.
* **Diagnosis:** Perilaku standar elemen `form` pada HTML ketika di-*submit* adalah memicu *HTTP Request* dan mereload halaman. Selain itu, atribut `novalidate` diperlukan agar validasi custom JavaScript tidak bertabrakan dengan validasi bawaan browser.
* **Perbaikan:** Menambahkan `event.preventDefault()` pada fungsi `initFormKontak()` untuk menghentikan aksi bawaan form. Dibuat fungsi helper `validasiNama()`, `validasiEmail()`, dan `validasiPesan()` beserta penanganan `aria-invalid` dan pesan error yang ramah pengguna.

## Hasil Pengujian Fitur & Responsivitas
* **Navigasi Mobile:** Berfungsi dengan baik di viewport < 768px, menu menutup otomatis saat link section diklik.
* **Filter Produk:** Merender ulang daftar produk sesuai kategori yang dipilih tanpa *lag* atau duplikasi elemen.
* **Accordion FAQ:** Buka/tutup panel berfungsi smooth dan atribut `hidden` berpindah dengan benar.
* **Validasi Form:** Mencegah submission data kosong, menampilkan pesan error jika format salah, dan menampilkan pesan sukses setelah reset input.
* **Scroll Back-to-Top:** Tombol tersembunyi secara otomatis saat di bagian atas dan muncul konsisten setelah scroll > 300px.

## Refleksi Belajar
Melalui pengerjaan Mini Project 02 ini, saya mendalami konsep-konsep dasar JavaScript modern seperti manipulasi DOM murni (DOM Manipulation), penerapan *Event Delegation*, serta pengelolaan *State* interaktif sederhana. Saya juga belajar pentingnya menjaga kualitas kode dengan `'use strict'`, memperhitungkan aspek aksesibilitas, dan mengoptimalkan performa manipulasi elemen HTML menggunakan `DocumentFragment`.

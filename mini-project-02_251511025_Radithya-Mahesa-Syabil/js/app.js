'use strict';

// data product
const daftarProduk = [
    {
        id: 1,
        nama: 'Baguetteto',
        kategori: 'Roti Bread',
        gambar: 'assets/2.jpg',
        alt: 'Roti Baguetteto',
        deskripsi: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus'
    },
    {
        id: 2,
        nama: 'Quasong',
        kategori: 'Roti Sweet',
        gambar: 'assets/3.jpg',
        alt: 'Roti Quasong',
        deskripsi: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.'
    },
    {
        id: 3,
        nama: 'Toblox Roast',
        kategori: 'Roti Panggang',
        gambar: 'assets/4.jpg',
        alt: 'Roti Toblox Roast',
        deskripsi: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.'
    },
    {
        id: 4,
        nama: 'Roti Cokelat',
        kategori: 'Roti Sweet',
        gambar: 'assets/5.jpg',
        alt: 'Roti Cokelat',
        deskripsi: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.'
    },
    {
        id: 5,
        nama: 'Roti Basic',
        kategori: 'Roti Bread',
        gambar: 'assets/7.jpg',
        alt: 'Roti Keju',
        deskripsi: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.'
    },
    {
        id: 6,
        nama: 'Roti Bakar',
        kategori: 'Roti Panggang',
        gambar: 'assets/8.jpg',
        alt: 'Roti Bakar Burn',
        deskripsi: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.'
    }
];

// bagian selector
const tombolNav = document.querySelector('#tombol-nav');
const menuNav = document.querySelector('#nav-menu');
const tombolTema = document.querySelector('#tombol-tema');
const barFilter = document.querySelector('#bar-filter');
const containerProduk = document.querySelector('#daftar-produk');
const daftarFaqEl = document.querySelector('#daftar-faq');
const formKontak = document.querySelector('#form-kontak');
const inputNama = document.querySelector('#input-nama');
const inputEmail = document.querySelector('#input-email');
const inputPesan = document.querySelector('#input-pesan');
const errorNama = document.querySelector('#error-nama');
const errorEmail = document.querySelector('#error-email');
const errorPesan = document.querySelector('#error-pesan');
const pesanSukses = document.querySelector('#pesan-sukses');
const tombolAtas = document.querySelector('#tombol-atas');

// state
let filterAktif = 'Semua';

// validator
function validasiNama(nilai) {
    if (nilai.trim() === '') {
        return 'Nama wajib diisi.';
    }
    if (nilai.trim().length < 3) {
        return 'Nama minimal 3 karakter.';
    }
    return '';
}

function validasiEmail(nilai) {
    if (nilai.trim() === '') {
        return 'Email wajib diisi.';
    }
    const polEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!polEmail.test(nilai.trim())) {
        return 'Format email tidak valid.';
    }
    return '';
}

function validasiPesan(nilai) {
    if (nilai.trim() === '') {
        return 'Pesan wajib diisi.';
    }
    if (nilai.trim().length < 10) {
        return 'Pesan minimal 10 karakter.';
    }
    return '';
}

// helper
function tampilkanError(elInput, elError, pesan) {
    if (pesan) {
        elError.textContent = pesan;
        elInput.setAttribute('aria-invalid', 'true');
    } else {
        elError.textContent = '';
        elInput.setAttribute('aria-invalid', 'false');
    }
}

// bagian merender
function buatKartuProduk(produk) {
    const kartu = document.createElement('article');
    kartu.classList.add('product-card');

    const gambar = document.createElement('img');
    gambar.src = produk.gambar;
    gambar.alt = produk.alt;
    gambar.classList.add('product-img');

    const judul = document.createElement('h3');
    judul.textContent = produk.nama;

    const deskripsi = document.createElement('p');
    deskripsi.textContent = produk.deskripsi;

    kartu.append(gambar, judul, deskripsi);
    return kartu;
}

function renderProduk(kategori) {
    const produkTersaring = kategori === 'Semua'
        ? daftarProduk
        : daftarProduk.filter(item => item.kategori === kategori);

    containerProduk.replaceChildren();

    if (produkTersaring.length === 0) {
        const pesanKosong = document.createElement('p');
        pesanKosong.textContent = 'Produk kosong';
        containerProduk.append(pesanKosong);
        return;
    }

    const fragment = document.createDocumentFragment();
    for (const produk of produkTersaring) {
        fragment.append(buatKartuProduk(produk));
    }

    containerProduk.append(fragment);
}

// bagian init fitur

function initNavMobile() {
    tombolNav.addEventListener('click', () => {
        const terbuka = tombolNav.getAttribute('aria-expanded') === 'true';
        const baruTerbuka = !terbuka;

        tombolNav.setAttribute('aria-expanded', String(baruTerbuka));
        tombolNav.setAttribute('aria-label', baruTerbuka ? 'Tutup menu navigasi' : 'Buka menu navigasi');
        menuNav.classList.toggle('is-open', baruTerbuka);
    });

    menuNav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            tombolNav.setAttribute('aria-expanded', 'false');
            tombolNav.setAttribute('aria-label', 'Buka menu navigasi');
            menuNav.classList.remove('is-open');
        }
    });
}

function initTema() {
    tombolTema.addEventListener('click', () => {
        const aktif = document.body.classList.toggle('dark-theme');

        tombolTema.setAttribute('aria-pressed', String(aktif));
        tombolTema.textContent = aktif ? '☀️' : '🌙';
        tombolTema.setAttribute('aria-label', aktif ? 'Aktifkan tema terang' : 'Aktifkan tema gelap');
    });
}

function initFilter() {
    barFilter.addEventListener('click', (event) => {
        const tombol = event.target.closest('.filter-btn');
        if (!tombol) return;

        const kategori = tombol.dataset.kategori;
        filterAktif = kategori;

        for (const btn of barFilter.querySelectorAll('.filter-btn')) {
            const aktif = btn.dataset.kategori === kategori;
            btn.classList.toggle('is-active', aktif);
            btn.setAttribute('aria-pressed', String(aktif));
        }

        renderProduk(kategori);
    });
}

function initFaq() {
    daftarFaqEl.addEventListener('click', (event) => {
        const tombol = event.target.closest('.faq-toggle');
        if (!tombol) return;

        const terbuka = tombol.getAttribute('aria-expanded') === 'true';
        const idPanel = tombol.getAttribute('aria-controls');
        const panel = document.querySelector('#' + idPanel);

        tombol.setAttribute('aria-expanded', String(!terbuka));
        panel.hidden = terbuka;
    });
}

function initFormKontak() {
    formKontak.addEventListener('submit', (event) => {
        event.preventDefault();

        const errorNamaMsg = validasiNama(inputNama.value);
        const errorEmailMsg = validasiEmail(inputEmail.value);
        const errorPesanMsg = validasiPesan(inputPesan.value);

        tampilkanError(inputNama, errorNama, errorNamaMsg);
        tampilkanError(inputEmail, errorEmail, errorEmailMsg);
        tampilkanError(inputPesan, errorPesan, errorPesanMsg);

        const adaError = errorNamaMsg || errorEmailMsg || errorPesanMsg;

        if (!adaError) {
            formKontak.reset();
            formKontak.hidden = true;
            pesanSukses.hidden = false;
        }
    });
}

function initKembaliKeAtas() {
    const batasScroll = 300;

    window.addEventListener('scroll', () => {
        tombolAtas.hidden = window.scrollY <= batasScroll;
    });

    tombolAtas.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


renderProduk('Semua');
initNavMobile();
initTema();
initFilter();
initFaq();
initFormKontak();
initKembaliKeAtas();

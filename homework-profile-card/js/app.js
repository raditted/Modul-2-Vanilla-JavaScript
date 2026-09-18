'use strict';

const status = document.querySelector('#status');
const tombolMuat = document.querySelector('#muat-data');
const tombolCobaLagi = document.querySelector('#coba-lagi');
const profilContainer = document.querySelector('#profil-container');
const profilNama = document.querySelector('#profil-nama');
const profilBio = document.querySelector('#profil-bio');
const toggleDetail = document.querySelector('#toggle-detail');
const profilDetail = document.querySelector('#profil-detail');
const toggleTema = document.querySelector('#toggle-tema');
const formKeterampilan = document.querySelector('#form-keterampilan');
const inputKeterampilan = document.querySelector('#input-keterampilan');
const errorKeterampilan = document.querySelector('#error-keterampilan');
const daftarKeterampilan = document.querySelector('#daftar-keterampilan');

let keterampilanState = [];

// Fungsi untuk mengganti tema
toggleTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Fungsi untuk toggle detail
toggleDetail.addEventListener('click', () => {
    const isExpanded = toggleDetail.getAttribute('aria-expanded') === 'true';
    toggleDetail.setAttribute('aria-expanded', String(!isExpanded));
    profilDetail.hidden = isExpanded;
    toggleDetail.textContent = isExpanded ? 'Lihat Detail' : 'Tutup Detail';
});

// Fungsi atur state UI
function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;
    tombolCobaLagi.hidden = state !== 'error';
    if (state === 'success' || state === 'empty') {
        profilContainer.hidden = false;
    } else {
        profilContainer.hidden = true;
    }
}

// Fetch data profil
async function ambilProfil() {
    const response = await fetch('data/profile.json');
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}

// Fungsi render daftar keterampilan
function renderKeterampilan() {
    daftarKeterampilan.replaceChildren();
    
    if (keterampilanState.length === 0) {
        aturState('empty', 'Keterampilan kosong.');
        return;
    } else {
        aturState('success', 'Profil berhasil dimuat.');
    }
    
    const fragment = document.createDocumentFragment();
    for (const item of keterampilanState) {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = item.nama;
        
        const buttonHapus = document.createElement('button');
        buttonHapus.textContent = 'Hapus';
        buttonHapus.classList.add('btn-danger');
        buttonHapus.type = 'button';
        
        // Hapus item
        buttonHapus.addEventListener('click', () => {
            keterampilanState = keterampilanState.filter(k => k.id !== item.id);
            renderKeterampilan();
        });
        
        li.append(span, buttonHapus);
        fragment.append(li);
    }
    daftarKeterampilan.append(fragment);
}

// Muat data awal
async function muatData() {
    aturState('loading', 'Memuat profil...');
    tombolMuat.disabled = true;
    
    try {
        const data = await ambilProfil();
        
        profilNama.textContent = data.nama;
        profilBio.textContent = data.bio;
        keterampilanState = data.keterampilan || [];
        
        renderKeterampilan();
    } catch (error) {
        console.error(error);
        aturState('error', `Gagal memuat profil: ${error.message}`);
    } finally {
        tombolMuat.disabled = false;
    }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);

// Tambah keterampilan
formKeterampilan.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const namaKeterampilan = inputKeterampilan.value.trim();
    
    if (namaKeterampilan === '') {
        inputKeterampilan.setAttribute('aria-invalid', 'true');
        errorKeterampilan.textContent = 'Keterampilan tidak boleh kosong.';
        return;
    }
    
    // Cek apakah sudah ada (mencegah ganda)
    if (keterampilanState.some(k => k.nama.toLowerCase() === namaKeterampilan.toLowerCase())) {
        inputKeterampilan.setAttribute('aria-invalid', 'true');
        errorKeterampilan.textContent = 'Keterampilan sudah ada.';
        return;
    }
    
    inputKeterampilan.setAttribute('aria-invalid', 'false');
    errorKeterampilan.textContent = '';
    
    const newItem = {
        id: Date.now(),
        nama: namaKeterampilan
    };
    
    keterampilanState.push(newItem);
    inputKeterampilan.value = '';
    
    renderKeterampilan();
});

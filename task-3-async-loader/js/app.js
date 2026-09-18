'use strict';

const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;
    tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
    const response = await fetch('data/materi.json');
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}

function renderMateri(data) {
    daftar.replaceChildren();
    
    const fragment = document.createDocumentFragment();
    for (const item of data) {
        const article = document.createElement('article');
        article.classList.add('kartu');
        
        const h2 = document.createElement('h2');
        h2.textContent = item.judul;
        
        const p = document.createElement('p');
        p.textContent = `Durasi: ${item.durasi} menit`;
        
        article.append(h2, p);
        fragment.append(article);
    }
    
    daftar.append(fragment);
}

async function muatData() {
    aturState('loading', 'Memuat data...');
    tombolMuat.disabled = true;
    daftar.replaceChildren();
    try {
        const data = await ambilMateri();
        
        if (data.length === 0) {
            aturState('empty', 'Data materi kosong.');
        } else {
            renderMateri(data);
            aturState('success', 'Data berhasil dimuat.');
        }
    } catch (error) {
        console.error(error);
        aturState('error', `Gagal memuat data: ${error.message}`);
    } finally {
        tombolMuat.disabled = false;
    }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);

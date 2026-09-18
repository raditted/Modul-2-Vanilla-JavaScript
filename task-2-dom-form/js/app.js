'use strict';
const peserta = [
    { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
    { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];
const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');
function validasiPeserta(calon) {
    const namaValid = calon.nama.trim().length >= 3;
    const prodiValid = calon.prodi.trim() !== '';
    return {
        valid: namaValid && prodiValid,
        errorNama: namaValid ? '' : 'Nama minimal 3 karakter.',
        errorProdi: prodiValid ? '' : 'Program studi wajib dipilih.'
    };
}
function buatKartuPeserta(item) {
    const article = document.createElement('article');
    article.classList.add('kartu');
    const h2 = document.createElement('h2');
    h2.textContent = item.nama;
    const p = document.createElement('p');
    p.textContent = item.prodi;
    article.append(h2, p);
    return article;
}
function renderPeserta(data) {
    daftar.replaceChildren();
    if (data.length === 0) {
        status.textContent = 'Tidak ada peserta';
    } else {
        status.textContent = '';
        const fragment = document.createDocumentFragment();
        for (const item of data) {
            fragment.append(buatKartuPeserta(item));
        }
        daftar.append(fragment);
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const calon = {
        nama: namaInput.value,
        prodi: prodiInput.value
    };
    const hasilValidasi = validasiPeserta(calon);
    
    errorNama.textContent = hasilValidasi.errorNama;
    namaInput.setAttribute('aria-invalid', String(Boolean(hasilValidasi.errorNama)));
    
    errorProdi.textContent = hasilValidasi.errorProdi;
    prodiInput.setAttribute('aria-invalid', String(Boolean(hasilValidasi.errorProdi)));

    if (hasilValidasi.valid) {
        peserta.push({
            id: Date.now(),
            nama: calon.nama.trim(),
            prodi: calon.prodi
        });
        form.reset();
        filterInput.value = 'semua';
        renderPeserta(peserta);
    }
});
filterInput.addEventListener('change', () => {
    const filter = filterInput.value;
    if (filter === 'semua') {
        renderPeserta(peserta);
    } else {
        const dataFilter = peserta.filter(item => item.prodi === filter);
        renderPeserta(dataFilter);
    }
});
renderPeserta(peserta);
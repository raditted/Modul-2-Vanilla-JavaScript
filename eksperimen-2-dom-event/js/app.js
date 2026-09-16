'use strict';
const judulUtama = document.querySelector('#judul-utama');
const status = document.querySelector('#status');
const namaInput = document.querySelector('#nama');
const jumlahKarakter =
    document.querySelector('#jumlah-karakter');
const tombolUbahJudul =
    document.querySelector('#ubah-judul');
const tombolToggleStatus =
    document.querySelector('#toggle-status');
console.log({
    judulUtama,
    status,
    namaInput,
    jumlahKarakter,
    tombolUbahJudul,
    tombolToggleStatus
});

tombolUbahJudul.addEventListener('click', () => {
    judulUtama.textContent = 'DOM Berhasil Diubah';
    ubahStatus('Teks heading berhasil diubah.');
});

tombolToggleStatus.addEventListener('click', () => {
    const aktif = document.body.classList.toggle('is-active');
    tombolToggleStatus.setAttribute(
        'aria-pressed',
        String(aktif)
    );
    ubahStatus(aktif
        ? 'Mode aktif dinyalakan.'
        : 'Mode aktif dimatikan.');
});

namaInput.addEventListener('input', (event) => {
    const jumlah = event.target.value.length;
    jumlahKarakter.textContent = jumlah;
});

function ubahStatus(pesan) {
    if (!status) {
        console.warn('Elemen #status tidak ditemukan.');
        return;
    }
    status.textContent = pesan;
}

async function muatFitur() {
    tombolMuat.disabled = true;
    tombolMuat.setAttribute('aria-busy', 'true');
    daftarFitur.textContent = '';
    tampilkanState('loading', 'Memuat data...');
    try {
        const data = await ambilFitur();
        if (!Array.isArray(data)) {
            throw new Error('Format data bukan array.');
        }
        if (data.length === 0) {
            tampilkanState('empty', 'Data kosong.');
            return;
        }
        renderFitur(data);
        tampilkanState('success', `${data.length} data tampil.`);
    } catch (error) {
        console.error(error);
        tampilkanState('error', `Gagal: ${error.message}`);
    } finally {
        tombolMuat.disabled = false;
        tombolMuat.removeAttribute('aria-busy');
    }
}
tombolMuat.addEventListener('click', muatFitur);
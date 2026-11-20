// 1. FUNGSI NAVIGASI MENU DINAMIS
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');

function bukaHalaman(targetId) {
    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    navbar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        bukaHalaman(target);
    });
});

menuToggle.addEventListener('click', function() {
    navbar.classList.toggle('open');
});

// 2. VALIDASI FORMULIR KONSULTASI DENGAN JAVASCRIPT
const formKonsultasi = document.getElementById('formKonsultasi');

formKonsultasi.addEventListener('submit', function(e) {
    e.preventDefault();

    const namaInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const teleponInput = document.getElementById('telepon');
    const pesanInput = document.getElementById('pesan');

    const nama = namaInput.value.trim();
    const email = emailInput.value.trim();
    const telepon = teleponInput.value.trim();
    const pesan = pesanInput.value.trim();

    const errorNama = document.getElementById('errorNama');
    const errorEmail = document.getElementById('errorEmail');
    const errorTelepon = document.getElementById('errorTelepon');
    const errorPesan = document.getElementById('errorPesan');
    const hasilBox = document.getElementById('hasilKonsultasi');

    let isValid = true;
    [namaInput, emailInput, teleponInput, pesanInput].forEach(el => el.classList.remove('input-error'));
    [errorNama, errorEmail, errorTelepon, errorPesan].forEach(el => el.textContent = '');
    hasilBox.style.display = 'none';

    if (nama === '') {
        errorNama.textContent = 'Nama lengkap wajib diisi.';
        namaInput.classList.add('input-error');
        isValid = false;
    } else if (nama.length < 3) {
        errorNama.textContent = 'Nama minimal terdiri dari 3 karakter.';
        namaInput.classList.add('input-error');
        isValid = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        errorEmail.textContent = 'Alamat email wajib diisi.';
        emailInput.classList.add('input-error');
        isValid = false;
    } else if (!regexEmail.test(email)) {
        errorEmail.textContent = 'Format email tidak valid (contoh: user@domain.com).';
        emailInput.classList.add('input-error');
        isValid = false;
    }

    const regexTelepon = /^[0-9]{10,15}$/;
    if (telepon === '') {
        errorTelepon.textContent = 'Nomor telepon/WhatsApp wajib diisi.';
        teleponInput.classList.add('input-error');
        isValid = false;
    } else if (!regexTelepon.test(telepon)) {
        errorTelepon.textContent = 'Nomor telepon harus berupa angka (10-15 digit tanpa spasi atau tanda hubung).';
        teleponInput.classList.add('input-error');
        isValid = false;
    }

    if (pesan === '') {
        errorPesan.textContent = 'Pesan atau pertanyaan konsultasi wajib diisi.';
        pesanInput.classList.add('input-error');
        isValid = false;
    } else if (pesan.length < 10) {
        errorPesan.textContent = 'Pesan terlalu singkat, tuliskan minimal 10 karakter.';
        pesanInput.classList.add('input-error');
        isValid = false;
    }

    if (isValid) {
        hasilBox.style.display = 'block';
        hasilBox.innerHTML = `
            <h4>Konsultasi Berhasil Terkirim!</h4>
            <p>Terima kasih, <strong>${nama}</strong>. Pertanyaan Anda telah kami catat dan balasan akan dikirimkan ke email <strong>${email}</strong> atau WhatsApp <strong>${telepon}</strong>.</p>
            <p style="margin-top:8px; font-size:0.9rem;"><em>Ringkasan Pesan: "${pesan}"</em></p>
        `;
        formKonsultasi.reset();
    }
});
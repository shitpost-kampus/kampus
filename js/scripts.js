// Simpan data kontributor di localStorage
let contributors = JSON.parse(localStorage.getItem('contributors')) || [];

document.getElementById('redirectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = document.getElementById('keyword').value.toLowerCase();
    if (keyword === 'kontributor') {
        window.location.href = 'login.html';
    } else if (keyword === 'user') {
        window.location.href = 'beranda.html';
    } else {
        alert('Keyword tidak valid. Masukkan "kontributor" atau "user".');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Cek apakah email dan password sesuai dengan yang terdaftar
    const contributor = contributors.find(contributor => contributor.email === email && contributor.password === password);
    if (contributor) {
        alert('Login berhasil!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Email atau password salah!');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Cek apakah email sudah terdaftar
    const existingContributor = contributors.find(contributor => contributor.email === email);
    if (existingContributor) {
        alert('Email sudah terdaftar!');
    } else {
        // Tambahkan kontributor baru
        contributors.push({ email, password });
        localStorage.setItem('contributors', JSON.stringify(contributors));
        alert('Registrasi berhasil! Silakan login.');
        window.location.href = 'login.html';
    }
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const post = { title, content };
    // Simpan postingan di localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    alert('Postingan berhasil diunggah!');
    window.location.href = 'dashboard.html';
});

// Tampilkan postingan di beranda
document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        postsContainer.appendChild(postElement);
    });
});
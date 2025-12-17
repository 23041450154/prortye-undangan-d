/**
 * Wedding Invitation - JavaScript
 * Features: Cover animation, Countdown timer, Scroll reveal animations, 
 * Gallery with Lightbox, Maps embed, Ucapan form, Music toggle
 */

// ===================================
// Configuration Data
// ===================================

// Gallery Photos Data
const galleryPhotos = [
    'assets/gallery/foto-1.jpeg',
    'assets/gallery/foto-2.jpeg',
    'assets/gallery/foto-3.jpeg',
    'assets/gallery/foto-4.jpeg'
];

const galleryCaptions = [
    'Momen pertama kami bertemu',
    'Kenangan indah bersama',
    'Perjalanan cinta kami',
    'Hari yang tak terlupakan'
];

// Maps Configuration
const mapsConfig = {
    akad: {
        alamat: 'Masjid Agung Al-Azhar, Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
        urlMaps: 'https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta',
        embedMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0887673651905!2d106.80089931476884!3d-6.243694395476071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14e22b7d6e9%3A0x19962a6cbec39d0!2sMasjid%20Agung%20Al-Azhar!5e0!3m2!1sid!2sid!4v1639736123456!5m2!1sid!2sid'
    },
    resepsi: {
        alamat: 'Balai Kartini, Jl. Gatot Subroto Kav. 37, Jakarta Selatan',
        urlMaps: 'https://maps.google.com/?q=Balai+Kartini+Jakarta',
        embedMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2153792068824!2d106.81893931476869!3d-6.229869195492036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e1d62a847d%3A0x5b6d5a5bbaa3a5a5!2sBalai%20Kartini!5e0!3m2!1sid!2sid!4v1639736234567!5m2!1sid!2sid'
    }
};

// Lightbox state
let currentLightboxIndex = 0;

// ===================================
// Initialize All Features
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initCoverPage();
    initCountdown();
    initScrollReveal();
    initGallery();
    initLightbox();
    initMapsEmbed();
    initUcapanForm();
    initGiftModal();
    initMusicToggle();
});

// ===================================
// Cover Page - Open Invitation
// ===================================
function initCoverPage() {
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openInvitation');
    const bgMusic = document.getElementById('bgMusic');
    
    openBtn.addEventListener('click', function() {
        // Fade out cover
        cover.classList.add('fade-out');
        
        // Show main content
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 100);
        
        // Play background music
        if (bgMusic) {
            bgMusic.volume = 0.5;
            bgMusic.play().catch(err => {
                console.log('Audio autoplay blocked:', err);
            });
            const musicToggle = document.getElementById('musicToggle');
            if (musicToggle) musicToggle.classList.add('playing');
        }
        
        // Scroll to hero section
        setTimeout(() => {
            document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
}

// ===================================
// Countdown Timer
// ===================================
function initCountdown() {
    // Set wedding date - February 7, 2026, 08:00 WIB (UTC+7)
    const weddingDate = new Date('2026-02-07T08:00:00+07:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================================
// Scroll Reveal Animation (IntersectionObserver)
// ===================================
function initScrollReveal() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Show all elements immediately without animation
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('reveal--active');
        });
        return;
    }
    
    const revealElements = document.querySelectorAll('.reveal');
    
    // Apply stagger delay to specific groups
    applyStaggerDelay('.mempelai-card', 150);
    applyStaggerDelay('.acara-card--with-maps', 200);
    applyStaggerDelay('.timeline-item', 100);
    applyStaggerDelay('.galeri-item', 80);
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--active');
                observer.unobserve(entry.target); // Unobserve after revealing
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

function applyStaggerDelay(selector, delayStep) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * delayStep}ms`;
    });
}

// ===================================
// Gallery Section
// ===================================
function initGallery() {
    const galeriItems = document.querySelectorAll('.galeri-item');
    
    // Add click event listeners to existing gallery items
    galeriItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    // Apply stagger delay after items are created
    setTimeout(() => {
        applyStaggerDelay('.galeri-item', 80);
    }, 100);
}

// ===================================
// Lightbox
// ===================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const overlay = lightbox.querySelector('.lightbox-overlay');
    
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('hidden')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryPhotos.length - 1;
    } else if (currentLightboxIndex >= galleryPhotos.length) {
        currentLightboxIndex = 0;
    }
    
    updateLightboxContent();
}

function updateLightboxContent() {
    const photoSrc = galleryPhotos[currentLightboxIndex];
    const caption = galleryCaptions[currentLightboxIndex];
    
    document.getElementById('lightboxImage').src = photoSrc;
    document.getElementById('lightboxImage').alt = caption;
    document.getElementById('lightboxCaption').textContent = caption;
    document.getElementById('lightboxCounter').textContent = `${currentLightboxIndex + 1} / ${galleryPhotos.length}`;
}

// ===================================
// Maps Embed
// ===================================
function initMapsEmbed() {
    // Set Akad maps
    const embedAkad = document.getElementById('embedMapsAkad');
    const btnAkad = document.getElementById('btnMapsAkad');
    
    if (embedAkad) {
        embedAkad.src = mapsConfig.akad.embedMaps;
    }
    if (btnAkad) {
        btnAkad.href = mapsConfig.akad.urlMaps;
    }
    
    // Set Resepsi maps
    const embedResepsi = document.getElementById('embedMapsResepsi');
    const btnResepsi = document.getElementById('btnMapsResepsi');
    
    if (embedResepsi) {
        embedResepsi.src = mapsConfig.resepsi.embedMaps;
    }
    if (btnResepsi) {
        btnResepsi.href = mapsConfig.resepsi.urlMaps;
    }
}

// ===================================
// Ucapan Form - Submit and Display
// ===================================
function initUcapanForm() {
    const form = document.getElementById('ucapanForm');
    const ucapanList = document.getElementById('ucapanList');
    
    loadUcapan();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('namaInput').value.trim();
        const pesan = document.getElementById('pesanInput').value.trim();
        
        if (!nama || !pesan) {
            alert('Mohon isi nama dan ucapan Anda');
            return;
        }
        
        const ucapan = {
            id: Date.now(),
            nama: nama,
            pesan: pesan,
            waktu: new Date().toLocaleString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        saveUcapan(ucapan);
        addUcapanToList(ucapan, true);
        form.reset();
        
        setTimeout(() => {
            ucapanList.scrollTop = ucapanList.scrollHeight;
        }, 100);
    });
}

function loadUcapan() {
    const ucapanList = document.getElementById('ucapanList');
    const storedUcapan = JSON.parse(localStorage.getItem('wedding_ucapan') || '[]');
    
    if (storedUcapan.length === 0) {
        ucapanList.innerHTML = `
            <div class="empty-ucapan">
                <p>Jadilah yang pertama memberikan ucapan & doa untuk kedua mempelai 💕</p>
            </div>
        `;
        return;
    }
    
    ucapanList.innerHTML = '';
    storedUcapan.forEach(ucapan => {
        addUcapanToList(ucapan, false);
    });
}

function saveUcapan(ucapan) {
    const storedUcapan = JSON.parse(localStorage.getItem('wedding_ucapan') || '[]');
    storedUcapan.push(ucapan);
    localStorage.setItem('wedding_ucapan', JSON.stringify(storedUcapan));
}

function addUcapanToList(ucapan, animate = true) {
    const ucapanList = document.getElementById('ucapanList');
    
    const emptyMessage = ucapanList.querySelector('.empty-ucapan');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    const ucapanElement = document.createElement('div');
    ucapanElement.className = 'ucapan-item';
    if (!animate) {
        ucapanElement.style.animation = 'none';
    }
    
    ucapanElement.innerHTML = `
        <div class="ucapan-bubble">
            <p class="ucapan-nama">${escapeHtml(ucapan.nama)}</p>
            <p class="ucapan-pesan">${escapeHtml(ucapan.pesan)}</p>
            <p class="ucapan-waktu">${ucapan.waktu}</p>
        </div>
    `;
    
    ucapanList.appendChild(ucapanElement);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Gift Modal
// ===================================
function initGiftModal() {
    const openBtn = document.getElementById('openGiftModal');
    const closeBtn = document.getElementById('closeGiftModal');
    const modal = document.getElementById('giftModal');
    const overlay = modal.querySelector('.modal-overlay');
    const copyBtns = document.querySelectorAll('.btn-copy');
    
    openBtn.addEventListener('click', function() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopied(btn);
            }).catch(err => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopied(btn);
            });
        });
    });
}

function showCopied(btn) {
    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'Tersalin!';
    btn.classList.add('copied');
    
    setTimeout(() => {
        btn.querySelector('span').textContent = originalText;
        btn.classList.remove('copied');
    }, 2000);
}

// ===================================
// Music Toggle
// ===================================
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicOn = document.getElementById('musicOn');
    const musicOff = document.getElementById('musicOff');
    
    if (!bgMusic || !musicToggle) return;
    
    let isPlaying = false;
    
    bgMusic.addEventListener('play', function() {
        isPlaying = true;
        updateMusicIcon();
    });
    
    bgMusic.addEventListener('pause', function() {
        isPlaying = false;
        updateMusicIcon();
    });
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.volume = 0.5;
            bgMusic.play().catch(err => {
                console.log('Audio play failed:', err);
            });
        }
    });
    
    function updateMusicIcon() {
        if (isPlaying) {
            musicOn.classList.remove('hidden');
            musicOff.classList.add('hidden');
            musicToggle.classList.add('playing');
        } else {
            musicOn.classList.add('hidden');
            musicOff.classList.remove('hidden');
            musicToggle.classList.remove('playing');
        }
    }
}

// ===================================
// Smooth scroll for anchor links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

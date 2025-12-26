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
    'assets/gallery/gallery-1.jpeg',
    'assets/gallery/gallery-2.jpeg',
    'assets/gallery/gallery-3.jpeg',
    'assets/gallery/gallery-4.jpeg',
    'assets/gallery/gallery-5.jpeg',
    'assets/gallery/gallery-6.jpeg'
];

const galleryCaptions = [
    'Momen pertama kami bertemu',
    'Kenangan indah bersama',
    'Perjalanan cinta kami',
    'Hari yang tak terlupakan',
    'Hari yang tak terlupakan',
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
        alamat: 'Nusa Agung, Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan',
        urlMaps: 'https://www.google.com/maps/place/4%C2%B006\'54.5%22S+104%C2%B045\'26.2%22E/@-4.1151302,104.7546961,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-4.1151302!4d104.757271?hl=id&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
        embedMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18994.15782930331!2d104.61028388070964!3d-4.178113111958477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e391ed502e6530d%3A0x63c3ed902e883746!2sSido%20Rahayu%2C%20Kec.%20Belitang%2C%20Kabupaten%20Ogan%20Komering%20Ulu%20Timur%2C%20Sumatera%20Selatan!5e0!3m2!1sid!2sid!4v1766227699291!5m2!1sid!2sid'
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
    const weddingDate = new Date('2026-02-02T08:00:00+07:00').getTime();
    
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
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyut-r6fwDpEmqCSmdHMRfimmod54gy4QR9X0RlwpdBvnybEGU4I_Pu98ZBn9sgUF4Nxg/exec';

function initUcapanForm() {
    const form = document.getElementById('ucapanForm');
    const ucapanList = document.getElementById('ucapanList');
    
    loadUcapan();
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        // e.stopPropagation();
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Prevent multiple submissions
        if (submitBtn.disabled) {
            return;
        }
        
        const originalBtnText = submitBtn.querySelector('span').textContent;
        
        const nama = document.getElementById('namaInput').value.trim();
        const pesan = document.getElementById('pesanInput').value.trim();
        
        if (!nama || !pesan) {
            alert('Mohon isi nama dan ucapan Anda');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.style.pointerEvents = 'none';
        submitBtn.querySelector('span').textContent = 'Mengirim...';
        
        // Save original values before reset
        const savedNama = nama;
        const savedPesan = pesan;
        
        // Reset form immediately to prevent resubmit
        form.reset();
        
        // Show optimistic update immediately
        const now = new Date();
        const newUcapan = {
            nama: savedNama,
            ucapan: savedPesan,
            timestamp: now.toISOString()
        };
        
        // Add to top of list immediately
        const ucapanList = document.getElementById('ucapanList');
        if (ucapanList.querySelector('.empty-ucapan')) {
            ucapanList.innerHTML = '';
        }
        addUcapanToList(newUcapan, true); // Add with animation at top
        
        // Update global data
        if (!window.allUcapanData) {
            window.allUcapanData = [];
        }
        window.allUcapanData.unshift(newUcapan);
        
        // Show view all button if needed
        const viewAllBtn = document.getElementById('viewAllBtn');
        if (window.allUcapanData.length > 5) {
            viewAllBtn.style.display = 'flex';
        }
        
        // Send to Google Spreadsheet in background
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama: savedNama,
                ucapan: savedPesan
            })
        }).then(() => {
            console.log('Data sent to spreadsheet');
            // Reload after 3 seconds to sync with server
            setTimeout(() => {
                loadUcapan();
            }, 3000);
        }).catch(err => {
            console.log('Background save error:', err);
        });
        
        // Show success message
        submitBtn.querySelector('span').textContent = 'Terkirim!';
        
        // Re-enable button after 3 seconds
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.pointerEvents = 'auto';
        }, 3000);
            submitBtn.disabled = false;
        }, 2000);
    };


async function loadUcapan() {
    const ucapanList = document.getElementById('ucapanList');
    const viewAllBtn = document.getElementById('viewAllBtn');
    
    // Show loading only if no data yet
    if (!window.allUcapanData || window.allUcapanData.length === 0) {
        ucapanList.innerHTML = `
            <div class="empty-ucapan">
                <p>Memuat ucapan...</p>
            </div>
        `;
    }
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const result = await response.json();
        
        if (result.status === 'success' && result.data && result.data.length > 0) {
            // Store all ucapan data globally
            window.allUcapanData = result.data.reverse(); // Newest first
            
            // Clear and render immediately
            ucapanList.innerHTML = '';
            
            // Show only 5 ucapan initially
            const initialCount = Math.min(5, window.allUcapanData.length);
            for (let i = 0; i < initialCount; i++) {
                addUcapanToList(window.allUcapanData[i], false);
            }
            
            // Show "View All" button if more than 5 ucapan
            if (window.allUcapanData.length > 5) {
                viewAllBtn.style.display = 'flex';
                viewAllBtn.onclick = toggleViewAll;
            }
        } else {
            ucapanList.innerHTML = `
                <div class="empty-ucapan">
                    <p>Jadilah yang pertama memberikan ucapan & doa untuk kedua mempelai 💕</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading ucapan:', error);
        // Only show error if no cached data
        if (!window.allUcapanData || window.allUcapanData.length === 0) {
            ucapanList.innerHTML = `
                <div class="empty-ucapan">
                    <p>Jadilah yang pertama memberikan ucapan & doa untuk kedua mempelai 💕</p>
                </div>
            `;
        }
    }
}

function toggleViewAll() {
    const modal = document.getElementById('ucapanModal');
    const modalUcapanList = document.getElementById('modalUcapanList');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Populate modal with all ucapan
    modalUcapanList.innerHTML = '';
    window.allUcapanData.forEach(ucapan => {
        const ucapanElement = document.createElement('div');
        ucapanElement.className = 'ucapan-item';
        
        // Format timestamp
        let waktu = ucapan.waktu || ucapan.timestamp;
        if (waktu) {
            // Check if it's from spreadsheet (already formatted) or needs formatting
            if (typeof waktu === 'string' && !waktu.includes('WIB')) {
                // Try to parse and format to WIB
                try {
                    waktu = formatTimestampWIB(waktu);
                } catch (e) {
                    // If parsing fails, use as is
                    console.log('Using original timestamp format:', waktu);
                }
            } else if (waktu instanceof Date) {
                waktu = formatTimestampWIB(waktu);
            }
            // If already contains WIB, use as is
        } else {
            waktu = formatTimestampWIB(new Date());
        }
        
        // Generate avatar from first letter of name
        const initial = ucapan.nama.charAt(0).toUpperCase();
        const avatarColor = getAvatarColor(ucapan.nama);
        
        ucapanElement.innerHTML = `
            <div class="ucapan-bubble">
                <div class="ucapan-with-avatar">
                    <div class="ucapan-avatar" style="background: ${avatarColor};">
                        ${initial}
                    </div>
                    <div class="ucapan-content">
                        <p class="ucapan-nama">${escapeHtml(ucapan.nama)}</p>
                        <p class="ucapan-pesan">${escapeHtml(ucapan.ucapan || ucapan.pesan)}</p>
                        <p class="ucapan-waktu">${waktu}</p>
                    </div>
                </div>
            </div>
        `;
        
        modalUcapanList.appendChild(ucapanElement);
    });
    
    // Close modal handlers
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.onclick = closeModal;
    modalOverlay.onclick = closeModal;
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function addUcapanToList(ucapan, animate = true) {
    const ucapanList = document.getElementById('ucapanList');
    
    const emptyMessage = ucapanList.querySelector('.empty-ucapan');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    const ucapanElement = document.createElement('div');
    ucapanElement.className = 'ucapan-item';
    
    // Add special animation for new messages
    if (animate) {
        ucapanElement.classList.add('new-message');
    } else {
        ucapanElement.style.animation = 'none';
    }
    
    // Format timestamp
    let waktu = ucapan.waktu || ucapan.timestamp;
    if (waktu) {
        // Check if it's from spreadsheet (already formatted) or needs formatting
        if (typeof waktu === 'string' && !waktu.includes('WIB')) {
            // Try to parse and format to WIB
            try {
                waktu = formatTimestampWIB(waktu);
            } catch (e) {
                // If parsing fails, use as is
                console.log('Using original timestamp format:', waktu);
            }
        } else if (waktu instanceof Date) {
            waktu = formatTimestampWIB(waktu);
        }
        // If already contains WIB, use as is
    } else {
        waktu = formatTimestampWIB(new Date());
    }
    
    const bubbleClass = animate ? 'ucapan-bubble new-highlight' : 'ucapan-bubble';
    
    // Generate avatar from first letter of name
    const initial = ucapan.nama.charAt(0).toUpperCase();
    const avatarColor = getAvatarColor(ucapan.nama);
    
    ucapanElement.innerHTML = `
        <div class="${bubbleClass}">
            <div class="ucapan-with-avatar">
                <div class="ucapan-avatar" style="background: ${avatarColor};">
                    ${initial}
                </div>
                <div class="ucapan-content">
                    <p class="ucapan-nama">${escapeHtml(ucapan.nama)}</p>
                    <p class="ucapan-pesan">${escapeHtml(ucapan.ucapan || ucapan.pesan)}</p>
                    <p class="ucapan-waktu">${waktu}</p>
                </div>
            </div>
        </div>
    `;
    
    // Prepend to show newest first
    ucapanList.insertBefore(ucapanElement, ucapanList.firstChild);
    
    // Remove animation classes after animation completes
    if (animate) {
        setTimeout(() => {
            ucapanElement.classList.remove('new-message');
            const bubble = ucapanElement.querySelector('.ucapan-bubble');
            if (bubble) {
                bubble.classList.remove('new-highlight');
            }
        }, 2000);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getAvatarColor(name) {
    const colors = [
        'linear-gradient(135deg, #f3a6b5, #f7c6d0)',
        'linear-gradient(135deg, #f7c6d0, #fdf2f4)',
        'linear-gradient(135deg, #e8899a, #f3a6b5)',
        'linear-gradient(135deg, #fdb3c5, #f7d0d8)',
        'linear-gradient(135deg, #ff9eb3, #ffc2d1)'
    ];
    
    // Generate consistent color based on name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
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
// Scroll Buttons for Ucapan List
// ===================================
function initScrollButtons() {
    const ucapanList = document.getElementById('ucapanList');
    const scrollUpBtn = document.getElementById('scrollUp');
    const scrollDownBtn = document.getElementById('scrollDown');
    
    if (!ucapanList || !scrollUpBtn || !scrollDownBtn) return;
    
    const scrollAmount = 100; // Scroll 100px per click
    
    // Prevent wheel scroll inside ucapan list
    ucapanList.addEventListener('wheel', function(e) {
        // Check if content is scrollable
        const hasScroll = ucapanList.scrollHeight > ucapanList.clientHeight;
        
        if (hasScroll) {
            // Prevent default scroll behavior on ucapan list
            e.preventDefault();
            e.stopPropagation();
        }
        // If no scroll needed, event will bubble up and scroll the page
    }, { passive: false });
    
    scrollUpBtn.addEventListener('click', function() {
        ucapanList.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    scrollDownBtn.addEventListener('click', function() {
        ucapanList.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update button visibility based on scroll position
    function updateButtonStates() {
        const isAtTop = ucapanList.scrollTop === 0;
        const isAtBottom = ucapanList.scrollTop + ucapanList.clientHeight >= ucapanList.scrollHeight - 5;
        
        scrollUpBtn.style.opacity = isAtTop ? '0.3' : '1';
        scrollUpBtn.style.pointerEvents = isAtTop ? 'none' : 'auto';
        
        scrollDownBtn.style.opacity = isAtBottom ? '0.3' : '1';
        scrollDownBtn.style.pointerEvents = isAtBottom ? 'none' : 'auto';
    }
    
    ucapanList.addEventListener('scroll', updateButtonStates);
    updateButtonStates(); // Initial check
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

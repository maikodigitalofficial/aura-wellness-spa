

// ============================================
// TEAM SECTION - WORKING 3D CAROUSEL
// ============================================

const therapists = [
    {
        img: 'https://i.pinimg.com/736x/e7/74/cd/e774cdd1065ae57e8654e87e7a3d2897.jpg',
        name: 'DR. AMINA OCHIENG',
        number: '#1',
        role: 'Wellness Director',
        desc: 'Lead Wellness Director with over 15 years of experience in holistic healing, specializing in therapeutic massage and stress recovery treatments.'
    },
    {
        img: 'https://i.pinimg.com/1200x/a2/09/d6/a209d6e66859493e14c59bc92e5b2e02.jpg',
        name: 'JAMES MWANGI',
        number: '#2',
        role: 'Senior Therapist',
        desc: 'Senior Massage Therapist certified in deep tissue and Swedish techniques. Known for his intuitive touch and ability to release chronic tension.'
    },
    {
        img: 'https://i.pinimg.com/736x/6f/d7/0c/6fd70c78a35477f075fb7c2c255327df.jpg',
        name: 'SARAH KIMANI',
        number: '#3',
        role: 'Skincare Specialist',
        desc: 'Skincare Specialist and Licensed Esthetician. Expert in organic facials, anti-aging treatments, and personalized skin wellness programs.'
    },
    {
        img: 'https://i.pinimg.com/736x/b0/c5/29/b0c5290314d28adf8dfd0110b477ff75.jpg',
        name: 'DAVID ODUOR',
        number: '#4',
        role: 'Aromatherapy Expert',
        desc: 'Aromatherapy Expert and Meditation Guide. Creates bespoke essential oil blends and leads mindfulness sessions for complete mental clarity.'
    }
];

let currentIndex = 0;
let isAnimating = false;
const carousel = document.getElementById('teamCarousel');
const dotsContainer = document.getElementById('teamDots');

function initTeamCarousel() {
    if (!carousel) return;

    // Build cards - NO click handlers on individual cards
    therapists.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.dataset.index = i;
        // Add data attribute to identify as card
        card.setAttribute('data-card', 'true');
        card.innerHTML = `
            <img src="${t.img}" alt="${t.name}" loading="lazy" data-card="true">
            <div class="team-card-info" data-card="true">
                <div class="team-card-number" data-card="true">${t.number}</div>
                <div class="team-card-name" data-card="true">${t.name}</div>
                <div class="team-card-role" data-card="true">${t.role}</div>
                <div class="team-card-desc" data-card="true">${t.desc}</div>
            </div>
        `;
        carousel.appendChild(card);
    });

    // Build dots
    therapists.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'team-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    });

    // Nav buttons
    document.getElementById('teamPrevBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
    });
    document.getElementById('teamNextBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
    });

    // SINGLE event listener on carousel container using event delegation
    carousel.addEventListener('click', function (e) {
        // Find closest card element
        const card = e.target.closest('.team-card');
        if (!card) return;

        const index = parseInt(card.dataset.index);
        if (index !== currentIndex) {
            goToSlide(index);
        }
    });

    // Touch/drag support
    let startX = 0;
    let isDragging = false;
    const wrapper = document.getElementById('teamCarouselWrapper');

    wrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = startX - e.touches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            isDragging = false;
        }
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Mouse drag
    wrapper.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        wrapper.style.cursor = 'grabbing';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            isDragging = false;
            wrapper.style.cursor = 'grab';
        }
    });

    wrapper.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    // Initial render
    updateCarousel();
}

function updateCarousel() {
    const cards = carousel.querySelectorAll('.team-card');
    const total = therapists.length;

    cards.forEach((card, i) => {
        // Remove all position classes
        card.classList.remove('active', 'side-left', 'side-right', 'hidden');

        const diff = i - currentIndex;

        // Handle wrapping
        let normalizedDiff = diff;
        if (diff > total / 2) normalizedDiff = diff - total;
        if (diff < -total / 2) normalizedDiff = diff + total;

        if (normalizedDiff === 0) {
            card.classList.add('active');
        } else if (normalizedDiff === -1 || (normalizedDiff === total - 1)) {
            card.classList.add('side-left');
        } else if (normalizedDiff === 1 || (normalizedDiff === -(total - 1))) {
            card.classList.add('side-right');
        } else {
            card.classList.add('hidden');
        }
    });

    // Update dots
    const dots = dotsContainer.querySelectorAll('.team-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function goToSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    currentIndex = index;
    if (currentIndex < 0) currentIndex = therapists.length - 1;
    if (currentIndex >= therapists.length) currentIndex = 0;

    updateCarousel();

    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamCarousel);
} else {
    initTeamCarousel();
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('testimonialsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    const cards = slider.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    function getVisibleCards() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxIndex() {
        return totalCards - getVisibleCards();
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 24;
        const offset = currentIndex * (cardWidth + gap);
        slider.style.transform = `translateX(-${offset}px)`;
        updateArrows();
    }

    function updateArrows() {
        const maxIndex = getMaxIndex();

        if (currentIndex === 0) {
            prevBtn.classList.remove('active');
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';

            nextBtn.classList.remove('inactive');
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        } else if (currentIndex >= maxIndex) {
            prevBtn.classList.add('active');
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';

            nextBtn.classList.add('inactive');
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.classList.add('active');
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';

            nextBtn.classList.remove('inactive');
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', function () {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const newMax = getMaxIndex();
            if (currentIndex > newMax) {
                currentIndex = newMax;
            }
            updateSlider();
        }, 150);
    });

    updateArrows();
});




// ============================================
// FAQ SECTION - ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items (optional - remove this block to allow multiple open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Floating Hearts Background ---
    const heartsContainer = document.getElementById('floating-hearts-container');
    const heartsCount = 15;
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        
        const left = Math.random() * 100;
        const size = Math.random() * (25 - 10) + 10;
        const duration = Math.random() * (15 - 8) + 8;
        const delay = Math.random() * 5;
        
        heart.style.left = `${left}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
            createHeart();
        }, (duration + delay) * 1000);
    }
    
    for (let i = 0; i < heartsCount; i++) {
        createHeart();
    }

    // --- Space Stars Background ---
    const starsContainer = document.getElementById('stars-container');
    const starsCount = 100;

    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize star properties
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 3 + 1; // 1px to 4px
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 5;
        
        star.style.left = `${left}vw`;
        star.style.top = `${top}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }

    // --- Slideshow Logic ---
    const slides = document.querySelectorAll('.slide');
    const navControls = document.getElementById('nav-controls');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const openBtn = document.getElementById('open-btn');
    
    let currentSlide = 0;
    
    // Initialize slideshow
    function showSlide(index) {
        // Handle bounds
        if (index < 1) index = 1; // Don't let them go back to intro via buttons
        if (index >= slides.length) index = slides.length - 1;
        
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active to current
        slides[index].classList.add('active');
        currentSlide = index;
        
        // Button states
        prevBtn.disabled = (currentSlide === 1);
        
        if (currentSlide === slides.length - 1) {
            nextBtn.style.display = 'none'; // Hide next on last slide
        } else {
            nextBtn.style.display = 'block';
        }
    }

    // Open button logic (Slide 0 -> Slide 1)
    openBtn.addEventListener('click', () => {
        fireConfetti();
        
        // Play music
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.volume = 0.5; // Set volume to 50%
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
        }
        
        // Fade out intro slowly
        slides[0].style.opacity = '0';
        slides[0].style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            slides[0].classList.remove('active');
            slides[0].style.display = 'none';
            
            // Show first content slide
            navControls.classList.remove('hidden');
            showSlide(1);
        }, 800);
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // --- Confetti Effect ---
    function fireConfetti() {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff6b81', '#ff7f50', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff6b81', '#ff7f50', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});

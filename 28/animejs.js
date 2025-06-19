document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slide-dots');
    let currentSlide = 0;
    let slideInterval;

    // インジケーターの生成
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // スライドの表示
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // 次のスライドへ
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 前のスライドへ
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 特定のスライドへ移動
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetInterval();
    }

    // 自動再生の間隔をリセット
    function resetInterval() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    // 自動再生の開始
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000); // 5秒ごとに次のスライドへ
    }

    // イベントリスナーの設定
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // キーボードナビゲーション
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // スワイプ対応（タッチデバイス用）
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.slideshow').addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.querySelector('.slideshow').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetInterval();
        }
    }

    // 初期化
    createDots();
    startAutoPlay();
});
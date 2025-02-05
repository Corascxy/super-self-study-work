document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentSlide = 0;
    let interval;

    // 创建轮播点
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 自动轮播
    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // 事件监听
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // 鼠标悬停时暂停轮播
    document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.carousel').addEventListener('mouseleave', startAutoSlide);

    // 开始自动轮播
    startAutoSlide();

    // 添加图片加载处理
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.parentElement.classList.remove('loading');
        });
        if (!img.complete) {
            img.parentElement.classList.add('loading');
        }
    });

    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.carousel');
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }

    // 添加键盘支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // 留言板功能
    const messageForm = document.querySelector('.message-form');
    const messagesContainer = document.querySelector('.messages-container');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('visitor-name').value;
        const content = document.getElementById('message-content').value;

        // 创建新留言
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card animate__animated animate__fadeIn';
        
        const currentTime = new Date().toLocaleString();
        messageCard.innerHTML = `
            <div class="message-header">
                <span class="visitor-name">${name}</span>
                <span class="message-time">${currentTime}</span>
            </div>
            <p class="message-content">${content}</p>
        `;

        // 添加到留言列表顶部
        messagesContainer.insertBefore(messageCard, messagesContainer.firstChild);

        // 清空表单
        messageForm.reset();
    });

    // 加载更多功能示例
    loadMoreBtn.addEventListener('click', () => {
        // 这里可以添加加载更多留言的逻辑
        loadMoreBtn.textContent = '加载中...';
        setTimeout(() => {
            loadMoreBtn.textContent = '加载更多';
        }, 1000);
    });
}); 
const sliders = (slidesSelector, dir, prevBtnSelector, nextBtnSelector) => {
    let slideIndex = 1,
        paused = false;

    const slides = document.querySelectorAll(slidesSelector);

    function showSlides(n) {
        if(n > slides.length) {
            slideIndex = 1;
        }

        if(n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(slide => {
            slide.classList.add('animated');
            slide.style.display = 'none';
        });

        slides[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    function changeSlides(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prevBtnSelector),
              nextBtn = document.querySelector(nextBtnSelector);

        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            slides[slideIndex - 1].classList.remove('slideInLeft');
            slides[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            slides[slideIndex - 1].classList.remove('slideInRight');
            slides[slideIndex - 1].classList.add('slideInLeft');
        });
    } catch(e) {}

    function activateAnimation() {
        if(dir === 'vertical') {
            paused = setInterval(function() {
                changeSlides(1);
                slides[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(function() {
                changeSlides(1);
                slides[slideIndex - 1].classList.remove('slideInRight');
                slides[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }

    activateAnimation();

    slides[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    slides[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};

export default sliders;
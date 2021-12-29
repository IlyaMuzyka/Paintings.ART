const modals = () => {
    let btnPressed;

    function bindModal(triggersSelector, modalSelector, closeSelector, destroy = false) {
        const triggers = document.querySelectorAll(triggersSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
              
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                }

                if(destroy) {
                    trigger.remove();
                }

                btnPressed = true;

                windows.forEach(window => {
                    window.style.display = 'none';
                    window.classList.add('animated', 'fadeIn');
                });
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(window => {
                window.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                windows.forEach(window => {
                    window.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            const windows = document.querySelectorAll('[data-modal]'),
                  scroll = calcScroll();

            windows.forEach(window => {
                if(getComputedStyle(window).display !== 'none') {
                    display = 'block';
                }
            });

            if(!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        const div = document.createElement('div');

        div.style.cssText = 'width: 50px; height: 50px; overflow-y: scroll; visibility: hidden;';
        document.body.appendChild(div);

        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        const trigger = document.querySelector(selector),
              scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

        window.addEventListener('scroll', () => {
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                trigger.click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

    openByScroll('.fixed-gift');

    showModalByTime('.popup-consultation', 60000);
};

export default modals;
const modals = () => {
    function bindModal(triggersSelector, modalSelector, closeSelector, closeClickOverlay = true) {
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

                windows.forEach(window => {
                    window.style.display = 'none';
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
            if(e.target === modal && closeClickOverlay) {
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
            const windows = document.querySelectorAll('[data-modal]');

            windows.forEach(window => {
                if(getComputedStyle(window).display !== 'none') {
                    display = 'block';
                }
            });

            if(!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
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

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

    showModalByTime('.popup-consultation', 60000);
};

export default modals;
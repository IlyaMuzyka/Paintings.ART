import {getResource} from '../services/requests';

const showMoreStyles = (btnSelector, wrapperSelector) => {
    const btn = document.querySelector(btnSelector);

    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles')
            .then(res => createCards(res))
            .catch(error => console.log(error));

        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            const card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            card.innerHTML = `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;

            document.querySelector(wrapperSelector).appendChild(card);
        });
    }
};

export default showMoreStyles;
const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          menuBtns = menu.querySelectorAll('li'),
          portfolio = document.querySelector('.portfolio-wrapper'),
          portfolioItems = portfolio.querySelectorAll('.portfolio-block'),
          lack = document.querySelector('.portfolio-no');

    const typeFilter = (type) => {
        portfolioItems.forEach(portfolioItem => {
            portfolioItem.style.display = 'none';
            portfolioItem.classList.remove('animated', 'fadeIn');
        });

        lack.style.display = 'none';
        lack.classList.remove('animated', 'fadeIn');

        if(type) {
            type.forEach(item => {
                item.style.display = 'block';
                item.classList.add('animated', 'fadeIn');
            });
        } else {
            lack.style.display = 'block';
            lack.classList.add('animated', 'fadeIn');
        }
    };

    const useFilter = (selector) => {
        const btn = menu.querySelector(selector),
              type = portfolio.querySelectorAll(selector);
        
        btn.addEventListener('click', () => {
            type.length > 0 ? typeFilter(type) : typeFilter();
        });
    };

    menu.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.tagName == 'LI') {
            menuBtns.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });

    useFilter('.all');
    useFilter('.lovers');
    useFilter('.chef');
    useFilter('.girl');
    useFilter('.guy');
    useFilter('.grandmother');
    useFilter('.granddad');
};

export default filter;
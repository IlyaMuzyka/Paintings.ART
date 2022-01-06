const pictureSize = (blocksSelector) => {
    const blocks = document.querySelectorAll(blocksSelector);

    const showImg = (block) => {
        const img = block.querySelector('img'),
              elements = block.querySelectorAll('p:not(.sizes-hit)');

        elements.forEach(el => el.style.display = 'none');   
        img.src = img.src.slice(0, -4) + '-1.png';
    };

    const hideImg = (block) => {
        const img = block.querySelector('img'),
              elements = block.querySelectorAll('p:not(.sizes-hit)');

        elements.forEach(el => el.style.display = 'block');   
        img.src = img.src.slice(0, -6) + '.png';
    };

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        });
        block.addEventListener('mouseout', () => {
            hideImg(block);
        });
    });
};

export default pictureSize;
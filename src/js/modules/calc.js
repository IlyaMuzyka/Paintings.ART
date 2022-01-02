const calc = (sizeSelector, materialSelector, optionsSelector, promocodeSelector, resultSelector) => {
    const size = document.querySelector(sizeSelector),
          material = document.querySelector(materialSelector),
          options = document.querySelector(optionsSelector),
          promocode = document.querySelector(promocodeSelector),
          result = document.querySelector(resultSelector);

    let sum = 0;

    const calcFunc = () => {
        sum = Math.round((+size.value) * (+material.value) + (+options.value));

        if(size.value == '' || material.value == '') {
            result.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else if(promocode.value === 'IWANTPOPART') {
            result.textContent = Math.round(sum * 0.7);
        } else {
            result.textContent = sum;
        }
    };

    size.addEventListener('change', calcFunc);
    material.addEventListener('change', calcFunc);
    options.addEventListener('change', calcFunc);
    promocode.addEventListener('input', calcFunc);
};

export default calc;
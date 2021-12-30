// import checkNumInputs from './checkNumInputs';

const forms = () => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          uploadInputs = document.querySelectorAll('[name="upload"]');

    const messages = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся.',
        failure: 'Что-то пошло не так :(',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    // checkNumInputs('input[name="user_phone"]');

    const postData = async (url, data) => {
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = '';
        });
        uploadInputs.forEach(uploadInput => {
            uploadInput.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    uploadInputs.forEach(uploadInput => {
        uploadInput.addEventListener('input', () => {
            let dots;
            const fileNameEl = uploadInput.previousElementSibling,
                  fileNameArr = uploadInput.files[0].name.split('.');

            fileNameArr[0].length > 6 ? dots = '...' : dots = '.';
            const fileNameVal = fileNameArr[0].substring(0, 6) + dots + fileNameArr[1];
            fileNameEl.textContent = fileNameVal;
        });
    });

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div'),
                  statusImg = document.createElement('img'),
                  textMessage = document.createElement('div');

            statusMessage.classList.add('status');
            form.parentNode.appendChild(statusMessage);

            form.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                form.style.display = 'none';
            }, 400);

            statusImg.setAttribute('src', messages.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            textMessage.textContent = messages.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(form);
            let api;

            form.closest('.popup-design') || form.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(result => {
                    console.log(result);
                    statusImg.setAttribute('src', messages.ok);
                    textMessage.textContent = messages.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', messages.fail);
                    textMessage.textContent = messages.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;
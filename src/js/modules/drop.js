const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, .1)';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.backgroundColor = 'transparent';
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['drop', 'dragleave'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            let dots;
            const fileNameEl = input.previousElementSibling,
                  fileNameArr = input.files[0].name.split('.');

            fileNameArr[0].length > 6 ? dots = '...' : dots = '.';
            const fileNameVal = fileNameArr[0].substring(0, 6) + dots + fileNameArr[1];
            fileNameEl.textContent = fileNameVal;
        });
    });
};

export default drop;
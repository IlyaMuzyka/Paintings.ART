const accordion = (triggersSelector) => {
    const triggers = document.querySelectorAll(triggersSelector);

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            triggers.forEach(trigger => {
                if(!this.classList.contains('active')) {
                    trigger.classList.remove('active');
                    trigger.nextElementSibling.classList.remove('active');
                    trigger.nextElementSibling.style.maxHeight = '0px';
                }
            });

            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');

            if(this.classList.contains('active')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 60 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
};

export default accordion;
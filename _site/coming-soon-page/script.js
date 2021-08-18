const form = document.querySelector('form');
const email = document.querySelector('#email');

form.addEventListener('submit', e => {
    e.preventDefault();

    const emailValue = email.value;

    if(!isEmail(emailValue)) {
        form.classList.add('error');
    }else {
        form.classList.remove('error');
    }
})

function isEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
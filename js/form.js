const formData = document.querySelectorAll(".formData");
const form = document.getElementById('contact-form');
const closeBtn = document.querySelector(".close");
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submitFormBtn');
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function closeModal() {
    document.getElementById('contact-artist-form').style.display = "none";
}

closeBtn.addEventListener("click", closeModal);
window.addEventListener("keydown", function (e) {
    console.log(e.key)
    if (e.key === 'Escape') {
        closeModal()
    }
});

function checkValidity() {
    let isValid = true;

    //Value.length must be > 2
    if (firstName.value.length < 2) {
        firstName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
        firstName.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }
    if (lastName.value.length < 2) {
        lastName.parentElement.setAttribute('data-error', 'Ce champ doit contenir au moins 2 caractères');
        lastName.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }
    // Check if email is not null and if it's actually an email address
    if (email.value.length < 1 || emailRegex.test(email.value) === false) {
        email.parentElement.setAttribute('data-error', 'Cette adresse mail n\'est pas valide');
        email.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }

    if (message.value.length < 1) {
        message.parentElement.setAttribute('data-error', 'Veuillez écrire un message');
        message.parentElement.setAttribute('data-error-visible', 'true');
        isValid = false;
    }

    return isValid;
}

function submitForm(event) {
    event.preventDefault();
    formData.forEach(el => el.setAttribute('data-error-visible', 'false'));

    if (checkValidity()) {
        let results = {
            "prenom": firstName.value,
            "nom": lastName.value,
            "email": email.value,
            "message": message.value
        }
        form.reset();
        console.log(results);
        closeModal();
    } 
}

submit.addEventListener("click", submitForm);

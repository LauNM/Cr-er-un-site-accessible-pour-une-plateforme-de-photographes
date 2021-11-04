import { infoList } from "./classes/functions.js";
import { Artist } from "./classes/artist.js";
import { Media } from "./classes/media.js";


function displayPage(data) {

    const artist = new Artist(data.id, data.portrait, data.name, data.city, data.country, data.tagline, data.price, data.tags);
  
    artistSection.appendChild(artist.createPage());
    artistSection.insertAdjacentHTML('beforeend', artist.displaySelectFilter());
    formArtistName.appendChild(artist.displayArtistNameInForm());
    priceSection.insertAdjacentHTML('beforeend', artist.displayPrice());
    
}

function renderMedia(data, photographerName) {

    const media = new Media(data.id, data.photographerId, photographerName, data.title,  data.image, data.video, data.altText, data.tags, data.likes, data.date, data.price);
    //Stock { media } into infoList that is created in classes.js
    infoList.push(media);
    mediaSection.appendChild(media.createMedia());

    let total = 0;
    infoList.forEach((item) => {
        total += item._likes;
    });
    
    totalOfLikes.innerHTML = total;
}

// THEN
const artistSection = document.getElementById("artist");
const formArtistName = document.getElementById("formArtistName");
const mediaSection = document.getElementById("media-section");
const priceSection = document.getElementById("dayPrice");
const closeBtn = document.querySelector(".close");
const totalOfLikes = document.getElementById("totalOfLikes");

/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

fetch('../data.json').then(response => {
    return response.json();
}).then(data => {
    let infos = [...data.photographers];
    let media = [...data.media];

    // Get id of photographer in the URL to fetch all media & infos for this photographer
    const idPhotographer = parseInt((new URLSearchParams(window.location.search)).get('id'), 10);
    const [photographerData] = (infos.filter(info => info.id === idPhotographer));

    displayPage(photographerData);
    
    const photographerName = photographerData.name;

    //Keep media from the wanted photographer thanks to the photographer_id
    const mediaData = media.filter(item => item.photographerId === idPhotographer);

    mediaData.forEach((item) => { renderMedia(item, photographerName); })   

}).catch(err => {
    console.log(err);
});


// FORM 
const formData = document.querySelectorAll(".formData");
const form = document.getElementById('contact');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submitFormBtn');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function closeModal() {
    document.getElementById('contact-artist-form').style.display = "none";
}
closeBtn.addEventListener("click", closeModal);

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
    } else {
        return false;
    }
}

submit.addEventListener("click", submitForm);




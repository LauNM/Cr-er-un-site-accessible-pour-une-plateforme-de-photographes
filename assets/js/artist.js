import { Artist } from "./classes.js";
import { Media } from "./classes.js";


function displayPage(data) {

    const artist = new Artist(data.id, data.portrait, data.name, data.city, data.country, data.tagline, data.price, data.tags);
  
    artistSection.appendChild(artist.displayPage());
    artistSection.insertAdjacentHTML('beforeend', artist.displaySelectFilter());
    formArtistName.appendChild(artist.displayArtistNameInForm());
    //artistSection.insertAdjacentHTML('afterbegin', artist.artistPage());
    totalOfLikes.insertAdjacentHTML('beforeend', artist.displayPrice());
}

function renderMedia(data, photographerName) {

    const media = new Media(data.id, data._photographerId, photographerName, data.title,  data.image,data.video, data.tags, data.likes, data.date, data.price);
    mediaSection.appendChild(media.createMedia());
}

/* function calculateTotalOfLikes(photographer, media) {
    let total = 0;
    media.forEach((item) => {
        // console.log(item)
        renderMedia(item, photographer);
        total += item.likes;
    })
    return total;
} */

function renderTotal(tabOfLikes) {
    let numTotal = 0;
    tabOfLikes.forEach((item) => {
        numTotal += parseInt(item);
    });
    return numTotal;
}

function renderTotalLikes(total) {
    return `<span>
                ${total} 
                <i class="fas fa-heart"></i>
            </span>`
}

// THEN
const artistSection = document.getElementById("artist");
const formArtistName = document.getElementById("formArtistName");
const mediaSection = document.getElementById("media-section");
const totalOfLikes = document.getElementById("totalOfLikes");
const closeBtn = document.querySelector(".close");

// const likes = document.getElementsByClassName("likes")

/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/
let infos = [];
let media = [];
fetch('../data.json').then(response => {
    return response.json();
}).then(data => {
    infos = [...data.photographers];
    media = [...data.media];

    const idPhotographer = parseInt((new URLSearchParams(window.location.search)).get('id'), 10);

    const photographerData = (infos.filter(info => info.id === idPhotographer));
    displayPage(photographerData[0]);
    const photographerName = photographerData[0].name;

    const mediaData = media.filter(item => item.photographerId === idPhotographer);

    //const total = calculateTotalOfLikes(photographerName, mediaData);
    mediaData.forEach((item) => { renderMedia(item, photographerName); })
    const likes = [...document.querySelectorAll(".likes")].map(element => element.innerHTML);
    const total = renderTotal(likes);

    totalOfLikes.insertAdjacentHTML('afterbegin',  renderTotalLikes(total));
    

}).catch(err => {
    console.log(err);
});


// FORM 
const form = document.getElementById('contact');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submitFormBtn');

function closeModal() {
    document.getElementById('contact-artist-form').style.display = "none";
}
closeBtn.addEventListener("click", closeModal);

function submitForm(event) {
    event.preventDefault();
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

submit.addEventListener("click", submitForm);




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
    console.log(mediaData)

    mediaData.forEach((item) => { renderMedia(item, photographerName); })   

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




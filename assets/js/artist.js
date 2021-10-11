import { Artist } from "./classes.js";
import { Media } from "./classes.js";

function displayPage(data) {

    const artist = new Artist(data.id, data.portrait, data.name, data.city, data.country, data.tagline, data.price, data.tags);
    artistSection.insertAdjacentHTML('afterbegin', artist.artistPage());
    totalOfLikes.insertAdjacentHTML('beforeend', artist.displayPrice());
}

function renderMedia(data, photographerName) {

    const media = new Media(data.id, data._photographerId, photographerName, data.title,  data.image,data.video, data.tags, data.likes, data.date, data.price);
    mediaSection.insertAdjacentHTML('afterbegin', media.createMedia());
    media.incrementLikes();

}

function renderTotalLikes(total) {
    return `<span>
                ${total} 
                <i class="fas fa-heart"></i>
            </span>`
}

// THEN
const artistSection = document.getElementById("artist");
const mediaSection = document.getElementById("media-section");
const totalOfLikes = document.getElementById("totalOfLikes");
const likesIcon = document.getElementsByClassName("likesIcon");

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

    let total = 0;
    mediaData.forEach((item) => {
        renderMedia(item, photographerName);
        total += item.likes;
    })

    totalOfLikes.insertAdjacentHTML('afterbegin',  renderTotalLikes(total));

}).catch(err => {
    console.log(err);
});




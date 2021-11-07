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
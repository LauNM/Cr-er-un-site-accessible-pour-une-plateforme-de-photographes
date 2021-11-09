import { infoList, sortBy } from "./classes/functions.js";
import { Artist } from "./classes/artist.js";
import { Media } from "./classes/media.js";

let infos = [];
export let mediaData = [];


function displayPage(data) {

    const artist = new Artist(data.id, data.portrait, data.name, data.city, data.country, data.tagline, data.price, data.tags);
  
    artistSection.appendChild(artist.createPage());
    artistSection.appendChild(artist.displaySelectFilter());
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

function displayAllMedia(medias, option,idPhotographer, photographerName) {
    mediaSection.innerHTML = '';
    const mediaData = medias.filter(item => item.photographerId === idPhotographer);
    sortBy(mediaData, option);
    mediaData.forEach((item) => { renderMedia(item, photographerName); })   
}


// probleme avec infolist qui ne se vide pas
export function displayAllFilteredMedia(medias, option,idPhotographer, photographerName) {
    
    mediaSection.innerHTML = '';
    const mediaData = medias.filter(item => item.photographerId === idPhotographer);
    sortBy(mediaData, option);
    console.log(infoList)
    mediaData.forEach((data) => { 
        const media = new Media(data.id, data.photographerId, photographerName, data.title,  data.image, data.video, data.altText, data.tags, data.likes, data.date, data.price);
        //Stock { media } into infoList that is created in classes.js
        infoList.push(media);
        mediaSection.appendChild(media.createMedia()); 
    })   
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
    infos = [...data.photographers];
    mediaData = [...data.media];
    // Get id of photographer in the URL to fetch all media & infos for this photographer
    const idPhotographer = parseInt((new URLSearchParams(window.location.search)).get('id'), 10);
    const [photographerData] = (infos.filter(info => info.id === idPhotographer));

    displayPage(photographerData);

    const photographerName = photographerData.name;

    //Keep media from the wanted photographer thanks to the photographer_id

    let op = 'popularity';
    displayAllMedia(mediaData, op, idPhotographer, photographerName)

}).catch(err => {
    console.log(err);
});
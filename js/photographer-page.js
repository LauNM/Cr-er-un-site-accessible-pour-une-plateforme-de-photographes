import { infoList, sortBy, calculeTotalOfLikes } from "./functions.js";
import { Artist } from "./classes/artist.js";
import { Media } from "./classes/media.js";

let infos = [];
export let mediaData = [];
// THEN
const artistSection = document.getElementById("artist-header");
const formArtistName = document.getElementById("formArtistName");
const mediaSection = document.getElementById("artist-main");
const priceSection = document.getElementById("day-price");
const numberTotalLikes = document.getElementById("number-total-likes");


function displayStaticContent(data) {
    const artist = new Artist(
        data.id, 
        data.portrait, 
        data.name, 
        data.city, 
        data.country, 
        data.tagline, 
        data.price, 
        data.tags
        );
    artistSection.appendChild(artist.createArtistPagePresentation());
    artistSection.appendChild(artist.createSortingDataButton());
    formArtistName.appendChild(artist.displayArtistNameInForm());
    priceSection.insertAdjacentHTML('beforeend', artist.price);
}



function renderMedia(data, photographerName) {
    const media = new Media(
        data.id, 
        data.photographerId, 
        photographerName, 
        data.title,  
        data.image, 
        data.video, 
        data.altText, 
        data.tags, 
        data.likes, 
        data.date, 
        data.price
        );
    return media;
}

function displayAllMedia(medias, option,idPhotographer, photographerName) {
    mediaSection.innerHTML = '';
    const mediaData = medias.filter(item => item.photographerId === idPhotographer);
    sortBy(mediaData, option);
    mediaData.forEach((item) => { 
        const media = renderMedia(item, photographerName);
        infoList.push(media);
        mediaSection.appendChild(media.createArticleMedia());
    })   
    numberTotalLikes.innerHTML = calculeTotalOfLikes(infoList);
}

/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

fetch('../data.json').then(response => {
    return response.json();
}).then(data => {
    infos = [...data.photographers];
    mediaData = [...data.media];
    
    // Get id of photographer in the URL to fetch all media & infos for this photographer
    const idPhotographer = parseInt((new URLSearchParams(window.location.search)).get('id'), 10);
    const [photographerData] = (infos.filter(info => info.id === idPhotographer));

    displayStaticContent(photographerData);

    const photographerName = photographerData.name;

    let option = 'likes';
    displayAllMedia(mediaData, option, idPhotographer, photographerName)

}).catch(err => {
    console.log(err);
});
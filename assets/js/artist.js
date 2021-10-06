import { Artist } from "./classes.js";
import { Media } from "./classes.js";

function displayPage(data) {

        const artist = new Artist(data.id, data.portrait, data.name, data.city, data.country, data.tagline, data.price, data.tags);
        artistSection.insertAdjacentHTML('afterbegin', artist.artistPage());
}
function renderPhoto(data, photographerName) {

    const photo = new Media(data.id, data._photographerId, photographerName, data.title, data.image,data.video,data.tags, data.likes, data.date, data.price);
    mediaSection.insertAdjacentHTML('afterbegin', photo.createArticlePhoto());
}
function renderVideo(data, photographerName) {

    const video = new Media(data.id, data._photographerId, photographerName, data.title,  data.image,data.video, data.tags, data.likes, data.date, data.price);
    mediaSection.insertAdjacentHTML('afterbegin', video.createArticleVideo());
}
// THEN
const artistSection = document.getElementById("artist");
const mediaSection = document.getElementById("media-section");

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

    const mediaData = media.filter(photo => photo.photographerId === idPhotographer);

    mediaData.forEach((item) => {
        if (item.image){
            renderPhoto(item, photographerName);
        }
        if (item.video){
            renderVideo(item, photographerName);
        }
    })


}).catch(err => {
    console.log(err);
});




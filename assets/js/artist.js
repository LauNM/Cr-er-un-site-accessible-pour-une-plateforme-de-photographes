import { Artist } from "./classes.js";
import { Media } from "./classes.js";

function createPage(data) {

        const artist = new Artist(data.id, data.portrait, data.name, data.city, data.country, data.tagline, data.price, data.tags);
        artistSection.insertAdjacentHTML('afterbegin', artist.artistPage());
    ;
}
function renderPhoto(data) {

        const photo = new Media(data.id, data._photographerId, data.title, data.image, data.tags, data.likes, data.date, data.price);
        photoSection.insertAdjacentHTML('afterbegin', photo.createArticlePhoto());
    ;
}
// THEN
const artistSection = document.getElementById("artist");
const photoSection = document.getElementById("photo-section");

/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/
let infos = [];
let photos = [];
fetch('/assets/data.json').then(response => {
    return response.json();
}).then(data => {
    infos = [...data.photographers];
    photos = [...data.media];
    //const test gets argument in URL and keeps only what is after "?id="
    const test = parseInt(window.location.search.slice(4));
    //const test2 gets argument, cut it after "=" and return only the value
    const test2 =  parseInt(window.location.search.split('=')[1]);
    //better way to get id ?
    const idPhotographer = parseInt((new URLSearchParams(window.location.search)).get('id'));

   const photographerData = infos.filter(info => info.id === test);
   const mediaData = photos.filter(photo => photo.photographerId === test);
   console.log(photographerData[0]);
   createPage(photographerData[0]);
   renderPhoto(mediaData[0]);
console.log(photographerData[0])

}).catch(err => {
    console.log(err);
});




import { Artist } from "./classes.js";
import { Media } from "./classes.js";

function createPage(data) {

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
    //const test gets argument in URL and keeps only what is after "?id="
    const test = parseInt(window.location.search.slice(4));
    //const test2 gets argument, cut it after "=" and return only the value
    const test2 =  parseInt(window.location.search.split('=')[1]);
    //better way to get id ?
    const idPhotographer = parseInt((new URLSearchParams(window.location.search)).get('id'));


    const photographerData = infos.filter(info => info.id === test);
    createPage(photographerData[0]);
    const photographerName = photographerData[0].name;
console.log(photographerName)
    const mediaData = media.filter(photo => photo.photographerId === test);

    const imageRegex = /.*\.(gif|jpe?g|bmp|png)$/igm;
    const videoRegex = /.*\.(mp4)$/igm;
    mediaData.forEach((item) => {
        if (imageRegex.test(item.image)){
            renderPhoto(item, photographerName);
        }
        if (videoRegex.test(item.video)){
            renderVideo(item, photographerName);
        }
    })


}).catch(err => {
    console.log(err);
});




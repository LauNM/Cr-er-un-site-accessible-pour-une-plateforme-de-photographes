import { Artist } from "./classes.js";

function createPage(data) {
   
        const artist = new Artist(data.id, data.portrait, data.name, data.city, data.country, data.tagline, data.price, data.tags);
        artistSection.insertAdjacentHTML('afterbegin', artist.artistPage());
    ;
}
// THEN
const artistSection = document.getElementById("artist");

/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/
let infos = []
fetch('/assets/data.json').then(response => {
    return response.json();
}).then(data => {
    infos = [...data.photographers];
    //const test gets argument in URL and keeps only what is after "?id="
    const test = parseInt(window.location.search.slice(4));
    //const test2 gets argument, cut it after "=" and return only the value
    const test2 =  parseInt(window.location.search.split('=')[1]);
    //better way to get id ?
    const idPhotographer = parseInt((new URLSearchParams(window.location.search)).get('id'));
    
   const photographerData = infos.filter(info => info.id === test);
   console.log(photographerData[0]);
   createPage(photographerData[0]);

}).catch(err => {
    console.log(err);
});




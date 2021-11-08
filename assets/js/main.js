import { addTags, infoList } from "./classes/functions.js";
import { Artist } from "./classes/artist.js";



//Create tab with all tags found in data
const tagsList = (data) => {
    let tagsTab = [];
    data.forEach(el => {
        el.tags.forEach(tag => {
            if (!tagsTab.includes(tag)) {
                tagsTab.push(tag)
            }
        })
    })
    return tagsTab;
}

function displayArtistCardList(data) {
    data.forEach(e => {
        const artist = new Artist(e.id, e.portrait, e.name, e.city, e.country, e.tagline, e.price, e.tags);
        infoList.push(artist)
        cardsSection.appendChild(artist.createArticleArtist());
    });
}

// THEN
const cardsSection = document.getElementById("cards");
const navTags = document.getElementById("nav");
const responsiveNavTags = document.getElementById("responsive-nav");
const goToContent = document.getElementById("goToContent");



/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

fetch('./assets/data.json').then(response => {
    return response.json();
}).then(data => {
    let infos = [...data.photographers];
    const tagList = tagsList(infos);

    //filter function not dynamic yet
   
    navTags.appendChild(addTags(tagList));
    responsiveNavTags.appendChild(addTags(tagList));
    //console.log((new URLSearchParams(window.location.search)).get('tag'))
    displayArtistCardList(infos);
    
    
}).catch(err => {
    console.log(err);
});

function appear() {
    let y = window.scrollY;
    if (y < 50){
        goToContent.className = "hide"
    } else {
        goToContent.className = "show"
    }
}
window.addEventListener("scroll", appear);
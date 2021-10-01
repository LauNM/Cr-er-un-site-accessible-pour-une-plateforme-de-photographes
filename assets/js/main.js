import { Artist } from "./classes.js";
//Create html list with tags
const addTagsNav = (tags) => {
    let list = '';
    tags.forEach(tag => {
        list += `<li class="tag">
            <a href="#">#${tag}</a>
        </li>`
    })
    return list;
}

//Create tab with all tags in data
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

function createCard(data) {
    data.forEach(e => {
        const artist = new Artist(e.id, e.portrait, e.name, e.city, e.country, e.tagline, e.price, e.tags);
        cardsSection.insertAdjacentHTML('afterbegin', artist.createArticleArtist());
    });
}
// THEN
const cardsSection = document.getElementById("cards");
const navTags = document.getElementById("nav-tags");
const responsiveNavTags = document.getElementById("responsive-nav-tags");


/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

let infos = []
fetch('../data.json').then(response => {
    return response.json();
}).then(data => {
    data.photographers.forEach((e) => {infos.push(e); } )
    createCard(infos);
    navTags.insertAdjacentHTML('afterbegin', addTagsNav(tagsList(infos)));
    responsiveNavTags.insertAdjacentHTML('afterbegin', addTagsNav(tagsList(infos)));

}).catch(err => {
    console.log(err);
});

import { addButtonTags, filteredData, tagsList } from "./classes/functions.js";

function displayGoTo() {
    let y = window.scrollY;
    if (y < 50){
        goToContent.className = "hide"
    } else {
        goToContent.className = "show"
    }
}

export let allData = [];
const cardsSection = document.getElementById("cards");
const navTags = document.getElementById("nav");
const responsiveNavTags = document.getElementById("responsive-nav");
const goToContent = document.getElementById("goToContent");


/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

fetch('../data.json').then(response => {
    return response.json();
}).then(data => {
    let infos = [...data.photographers];
    allData = [...infos];
    // create buttons for each tag in navbar
    const tagList = tagsList(infos);
    navTags.appendChild(addButtonTags(tagList));
    responsiveNavTags.appendChild(addButtonTags(tagList));

    // get tag in url if exist
    let tag = new URLSearchParams(window.location.search).get('tag')
    
    // filter data

    filteredData(infos, tag).forEach(element => {
        cardsSection.appendChild(element.createArticleArtist());
    });

    window.addEventListener("scroll", displayGoTo);

}).catch(err => {
    console.log(err);
});


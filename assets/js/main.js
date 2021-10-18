import { Artist } from "./classes.js";


//Create html list with tags

const createTagsNav = (tags, listId) => {
    const list = document.createElement('ul');
    list.id = listId;
    tags.forEach(tag => {
        const listItem = document.createElement('li');
    
        const item = document.createElement('a');
        item.className = "tag";
        item.href="#";
        item.textContent = '#'+tag;
        item.id = tag;
        item.addEventListener('click', () => {
            console.log('coucou', tag)
        })

        listItem.appendChild(item);
        list.appendChild(listItem);
    })
    return list;
}



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
        cardsSection.insertAdjacentHTML('afterbegin', artist.createArticleArtist());
    });
}

const filter = (data, tag, filterData) => {
    data.filter((item) => {
        item.tags.includes(tag) ? filterData.push(item) : ''
    })
   return filterData;
}
// THEN
const cardsSection = document.getElementById("cards");
const navTags = document.getElementById("nav");
const responsiveNavTags = document.getElementById("responsive-nav");
const goToContent = document.getElementById("goToContent");



/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

let infos = []
fetch('./assets/data.json').then(response => {
    return response.json();
}).then(data => {
    infos = [...data.photographers];
    const tagList = tagsList(infos);
    let filteredData = [];

    //filter function not dynamic yet
    filter(infos, '', filteredData);
    navTags.appendChild(createTagsNav(tagList, "nav-tags"));
    responsiveNavTags.appendChild(createTagsNav(tagList,"responsive-nav-tags"));
    filteredData.length === 0 ? displayArtistCardList(infos) : displayArtistCardList(filteredData);

    
}).catch(err => {
    console.log(err);
});

function appear() {
    let y = window.scrollY;
    console.log(y)
    if (y < 130){
        goToContent.className = "hide"
    } else {
        goToContent.className = "show btn"
    }
}
window.addEventListener("scroll", appear);
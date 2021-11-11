import { Artist } from "./artist.js";
import { allData } from "../main.js";

export let newData = [];
export let infoList = [];

const cardsSection = document.getElementById("cards");

const test = () => {
    window.location = '/';
}

                                            /* TAGS */
// CREATE TAG LIST

export const tagsList = (data) => {
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

// CREATE BUTTON OR LINK FOR TAGS, DEPENDING ON PAGE
export const addButtonTags = (tags) => {
    const list = document.createElement('ul');
    tags.forEach(tag => {
        const item = document.createElement('li');
        item.className = "tag";
        const link = document.createElement('a');
        link.textContent = `#${tag}`;
        link.addEventListener('click', () => {
            cardsSection.innerHTML = '';
            filteredData(allData, tag).forEach(element => {
                cardsSection.appendChild(element.createArticleArtist());
            });
        })
        item.appendChild(link);
        list.appendChild(item)
    })
    return list;
};

export const addLinkTags = (tags) => {
    const list = document.createElement('ul');
    tags.forEach(tag => {
        const item = document.createElement('li');
        item.className = "tag";
        const link = document.createElement('a');
        link.textContent = `#${tag}`;
        link.href = `/?tag=${tag}`;

        item.appendChild(link);
        list.appendChild(item)
    })
    return list;
};

// RETURN FILTERED DATA
const createArtistArray = (data) => {
    let artistArray = [];
    data.forEach((element)=> {
        const artist = new Artist(
            element.id, 
            element.portrait, 
            element.name, 
            element.city, 
            element.country, 
            element.tagline, 
            element.price, 
            element.tags
            );
        artistArray.push(artist);
    })
    console.log('artistarray: ', artistArray)
    return artistArray;
}
export const filteredData = (data, tag) => {
    console.log('is tag: ', tag)
    if (tag === null) {
        return createArtistArray(data);
    }
    else {
        newData = [];
        data.filter((item) => {
            if (item.tags.includes(tag)) {
                newData.push(item);
            }
        })
        return createArtistArray(newData);
    }
}

// FUNCTION TO SORT DATA 

function sortByPopularity(data) {
    data.sort((a, b) => {
        return a.likes - b.likes;
    });
}
function sortByDate(data) {
    data.sort((a, b) => {
        let da = new Date(a.date),
            db = new Date(b.date);
        return da - db;
    });
}
function sortByTitle(data) {
    data.sort((a, b) => {
        let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}

export function sortBy(data, option) {
    if (option === 'likes') {
        sortByPopularity(data);
    }
    if (option === 'date') {
        sortByDate(data);
    }
    if (option === 'title') {
        sortByTitle(data);
    }
}




import { Artist } from "./classes/artist.js";
import { allData } from "./main.js";

export let newData = [];
export let infoList = [];

const cardsSection = document.getElementById("cards");

                                            /* TAGS */
// CREATE TAG LIST

export const createTagsList = (data) => {
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
export const createButtonsTag = (tags) => {
    const list = document.createElement('ul');
    tags.forEach(tag => {
        const item = document.createElement('li');
        item.className = "tag";
        const button = document.createElement('button');
        button.textContent = `#${tag}`;
        button.className = "buttonTag";
        button.addEventListener('click', () => {
            cardsSection.innerHTML = '';
            filterDataByTag(allData, tag).forEach(element => {
                cardsSection.appendChild(element.createArticleArtist());
            });
        })
        item.appendChild(button);
        list.appendChild(item)
    })
    return list;
};

export const createLinksTag = (tags) => {
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
const arrayOfArtistData = (data) => {
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
    return artistArray;
}

export const filterDataByTag = (data, tag) => {
    if (tag === null) {
        return arrayOfArtistData(data);
    }
    else {
        newData = [];
        data.filter((item) => {
            if (item.tags.includes(tag)) {
                newData.push(item);
            }
        })
        return arrayOfArtistData(newData);
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




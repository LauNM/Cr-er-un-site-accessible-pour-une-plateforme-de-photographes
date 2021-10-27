import { Lightbox } from "../lightbox.js";

export let filteredData = [];
export const infoList = [];
export let selectedTag = [];

const cardsSection = document.getElementById("cards");

export const addTags = (tags) => {
    const list = document.createElement('ul');
    tags.forEach(tag => {
        const item = document.createElement('li');
        item.className = "tag";
        const link = document.createElement('a');
        link.textContent = `#${tag}`;

        link.addEventListener('click', () => {
            if (window.location.search.length === 0) {
                cardsSection.innerHTML = '';
                filteredData = [];
                filter(infoList, tag)
            }
            else {
                link.href = `/?tag=${tag}`;
            }
        })


        item.appendChild(link);
        list.appendChild(item)
    })
    return list;
};

const filter = (data, tag) => {
    data.filter((e) => {
        if (e._tags.includes(tag)) {
            cardsSection.appendChild(e.createArticleArtist());
            filteredData.push(e);
        }
    })
    return filteredData;
}




import { filterDataByTag, createTagsList } from "./functions.js";
import { getPhotographersData } from "./data.js";

const displayGoTo = () => {
    let y = window.scrollY;
    if (y < 50) {
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

async function init() {
    try {
        const { photographers } = await getPhotographersData();
        const tagList = createTagsList(photographers);

        const createArtistCardWithTags = (data) => {
            data.forEach(element => {
                const article = element.createArtistCard();
                const tagsSection = document.createElement('section');
                tagsSection.className = "card-tags";
                tagsSection.appendChild(createButtonsTag(element.tags));
                article.appendChild(tagsSection);

                cardsSection.appendChild(article);
            })
        }
        const createButtonsTag = (tags) => {
            const list = document.createElement('ul');
            tags.forEach(tag => {
                const item = document.createElement('li');
                item.className = "tag";
                item.ariaLabel = "Tag";
                const button = document.createElement('button');
                button.textContent = `#${tag}`;
                button.className = "buttonTag";
                button.addEventListener('click', () => {
                    cardsSection.innerHTML = '';
                    createArtistCardWithTags(filterDataByTag(photographers, tag))
                })
                item.appendChild(button);
                list.appendChild(item)
            })
            return list;
        };

        navTags.appendChild(createButtonsTag(tagList));
        responsiveNavTags.appendChild(createButtonsTag(tagList));


        // get tag in url if exist
        let tag = new URLSearchParams(window.location.search).get('tag')

        // filter data

        let dataFiltered = filterDataByTag(photographers, tag);
        createArtistCardWithTags(dataFiltered)

        window.addEventListener("scroll", displayGoTo);

    }
    catch (err) {
        console.log(err)
    }

}
init();

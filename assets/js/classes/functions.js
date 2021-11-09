export let filteredData = [];
export let infoList = [];
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


/* FUNCTION TO SORT DATA */


function sortByPopularity (data) {
    data.sort((a, b) => {
        return a.likes - b.likes;
    });
}
function sortByDate (data) {
    data.sort((a, b) => {
        let da = new Date(a.date),
            db = new Date(b.date);
        return da - db;
    });
}
function sortByTitle (data) {
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




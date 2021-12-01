import { Artist } from "./classes/artist.js";

export let infoList = [];

const mediaSection = document.getElementById("artist-main");

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

export const createLinksTag = (tags) => {
    const list = document.createElement('ul');
    tags.forEach(tag => {
        const item = document.createElement('li');
        item.className = "tag";
        item.ariaLabel = "Tag";
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
    data.forEach((element) => {
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
        let newData = [];
        data.filter((item) => {
            if (item.tags.includes(tag)) {
                newData.push(item);
            }
        })
        return arrayOfArtistData(newData);
    }
}

// FUNCTION TO SORT DATA 

const sortByPopularity = (data) => {
    data.sort((a, b) => {
        return a.likes - b.likes;
    });
}
const sortByDate = (data) => {
    data.sort((a, b) => {
        let da = new Date(a.date),
            db = new Date(b.date);
        return da - db;
    });
}
const sortByTitle = (data) => {
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

export function displayAllFilteredMedia(data, option) {
    mediaSection.innerHTML = '';
    sortBy(data, option);
    data.forEach((media) => {
        mediaSection.appendChild(media.createArticleMedia());
    })
}


export const calculeTotalOfLikes = (data) => {
    let total = 0;
    data.forEach((item) => {
        total += item._likes;
    });
    return total;
}

export const focusInElement = (place) => {
    const focusableEls = place.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), input[type="submit"]:not([disabled]), select:not([disabled])');
    const firstFocusableEl = focusableEls[0];  
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    place.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          if ( e.shiftKey )  {
            if (document.activeElement === firstFocusableEl) {
              lastFocusableEl.focus();
              e.preventDefault();
            }
          } else  {
            if (document.activeElement === lastFocusableEl) {
              firstFocusableEl.focus();
              e.preventDefault();
            }
          }
        }
      });
}
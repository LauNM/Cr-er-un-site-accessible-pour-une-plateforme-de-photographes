
class Artist {
    constructor(portrait, name, city, country, tagline, price, tags) {
        this.portrait = portrait;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.tags = tags;


        this.createArticleArtist = () => {
            return ` <article class="photographer-description">
                        <a id="${this.name}">
                            <section class="card-header">
                                <img src="assets/img/Photographers/${this.portrait}" alt="ID photo" class="id-photo">
                                <h2>${this.name}</h2>
                            </section>
                        </a>
                        <section class="card-main">
                            <h3>${this.city}, ${this.country}</h3>
                            <p class="description">${this.tagline}</p>
                            <p class="price">${this.price} €/jour</p>
                        </section>
                        <section class="card-tags">
                            <ul>
                                ${this.addTagsArtist()}
                            </ul>
                        </section>
                    </article> `
        }

        this.addTagsArtist = () => {
            let list = '';
            this.tags.forEach(tag => {
                list += `<li class="tag">
                            <a href="#">#${tag}</a>
                        </li>`
            })
            return list;
        }

        this.artistPage = () => {
            return ` <div>
                        <div class="artist-header">
                            <section>
                                <h2>${this.name}</h2>

                                    <section class="card-tags">
                                        <ul>

                                        </ul>
                                    </section>
                            </section>
                            <button>Contactez-moi</button>

                        </div>
                        <section class="artist-main">
                          <p>Trier par</p>
                          <button>Popularité</button>
                          <div class="artist-photos">
                            <article class="card-photos">
                                <img src="" alt="Photo" class="card-photo">
                                <span>
                                    <h2></h2>
                                    <h2>12</h2>
                                </span>
                            </article>
                          </div>
                        </section>
                    </div>`
        }
    }
}

/*
// FUNCTIONS
/!*const createArticle = (portrait, name, city, country, tagline, price, tags) => {
    return ` <article class="photographer-description">
        <a id="${name}" onclick="displayArtistPage('${name}')">
            <section class="card-header">
                <img src="assets/img/Photographers/${portrait}" alt="ID photo" class="id-photo">
                <h2>${name}</h2>
            </section>
        </a>
        <section class="card-main">
            <h3>${city}, ${country}</h3>
            <p class="description">${tagline}</p>
            <p class="price">${price} €/jour</p>
        </section>
        <section class="card-tags">
            <ul>
                ${tags}
            </ul>
        </section>
    </article>
    `
}*!/

//Create taglist for 1 photographer
const addTagsNav = (tags) => {
    let list = '';
    tags.forEach(tag => {
        list += `<li class="tag">
            <a href="#">#${tag}</a>
        </li>`
    })
    return list;
}

//Create taglist from all tags in data
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

/!*function createCard(data) {
    data.forEach(e => {
        cardsSection.insertAdjacentHTML('afterbegin', createArticle(e.portrait, e.name, e.city, e.country, e.tagline, e.price, addTags(e.tags)));
    });
}*!/
function createCard(data) {
    data.forEach(e => {
        const artist = new Artist();
        cardsSection.insertAdjacentHTML('afterbegin', artist.createArticleArtist());
    });
}

const displayArtistPage = (artist) => {
    console.log(`you clicked on artist named ${artist}`);
    window.location.assign(`/artist.html`);
    console.log(`you clicked on artist named ${artist}`);
}


// THEN
const cardsSection = document.getElementById("cards");
const navTags = document.getElementById("nav-tags");
const artist = document.getElementById("artist");

/!* -------------------------------------- FETCH DATA HERE -------------------------------------------*!/
let infos = []
fetch('assets/data.json').then(response => {
    return response.json();
}).then(data => {
    data.photographers.forEach((e) => {infos.push(e); } )
    createCard(infos);
    navTags.insertAdjacentHTML('afterbegin', addTagsNav(tagsList(infos)));

}).catch(err => {
    console.log(err);
});


*/

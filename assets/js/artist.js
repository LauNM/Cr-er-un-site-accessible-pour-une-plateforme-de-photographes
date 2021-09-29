
class Artist {
    constructor(portrait, name, city, country, tagline, price, tags) {
        this._portrait = portrait;
        this._name = name;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
        this._tags = tags;


        this.createArticleArtist = () => {
            return ` <article class="photographer-description">
                        <a id="${this._name}">
                            <section class="card-header">
                                <img src="assets/img/Photographers/${this._portrait}" alt="ID photo" class="id-photo">
                                <h2>${this._name}</h2>
                            </section>
                        </a>
                        <section class="card-main">
                            <h3>${this._city}, ${this._country}</h3>
                            <p class="description">${this._tagline}</p>
                            <p class="price">${this._price} €/jour</p>
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
            this._tags.forEach(tag => {
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
                                <h2>${this._name}</h2>

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



function createCard(data) {
    data.forEach(e => {
        const artist = new Artist(e.portrait, e.name, e.city, e.country, e.tagline, e.price, e.tags);
        cardsSection.insertAdjacentHTML('afterbegin', artist.createArticleArtist());
    });
}

const displayArtistPage = (artist) => {
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




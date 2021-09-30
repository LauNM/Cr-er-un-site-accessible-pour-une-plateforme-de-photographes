export class Artist {
    constructor(id, portrait, name, city, country, tagline, price, tags) {
        this._id = id;
        this._portrait = portrait;
        this._name = name;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
        this._tags = tags;


        this.createArticleArtist = () => {
            return ` <article class="photographer-description">
                        <a href="./assets/pages/artist.html?id=${this._id}" id="${this._name}">
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
            return `<!-- <div>-->
                        <div class="artist-header">
                            <div class="artist-presentation">
                                <section class="artist-infos">
                                    <h1>${this._name}</h1>
                                    <section class="artist-main">
                                        <p class="localisation">${this._city}, ${this._country}</p>
                                        <p class="description">${this._tagline}</p>
                                    </section>
                                    <section class="tags">
                                       <ul>
                                            ${this.addTagsArtist()}
                                        </ul>
                                    </section>
                                </section>
                                <section class="button">
                                    <button class="contact-btn">Contactez-moi</button>
                                </section>
                            </div>
                            <img src="../img/Photographers/${this._portrait}" alt="ID photo" class="id-photo">
                        </div>
                        <!--<section class="artist-main">
                            <label for="sort-by">Trier par :</label>
                            <select name="sort" id="sort-by">
                               <option class="select-item" value="popularity">Popularité</option>
                               <option class="select-item" value="date">Date</option>
                               <option class="select-item" value="title">Titre</option>
                            </select>
                            <div class="artist-photos">
                                <article class="photos">
                                    <img src="" alt="Photo" class="photo">
                                    <span>
                                        <h2></h2>
                                        <h2></h2>
                                    </span>
                                </article>
                            </div>
                        </section>-->
<!--                    </div>-->`
        }
    }
}

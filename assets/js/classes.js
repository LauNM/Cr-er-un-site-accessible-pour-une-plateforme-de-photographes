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
                        <a tabindex="0" href="./assets/pages/artist.html?id=${this._id}" id="${this._name}">
                            <section class="card-header">
                                <img src="assets/media/Photographers/${this._portrait}" alt="ID photo" class="id-photo">
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
            return `<div>
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
                                    <button tabindex="0" class="contact-btn">Contactez-moi</button>
                                </section>
                            </div>
                            <img src="../media/Photographers/${this._portrait}" alt="ID photo" class="id-photo">
                        </div>
                        <section class="artist-main">
                            <label for="sort-by">Trier par :</label>
                            <select tabindex="0" name="sort" id="sort-by">
                                <option tabindex="0" class="select-item" value="popularity">Popularité</option>
                                <option tabindex="0" class="select-item" value="date">Date</option>
                                <option tabindex="0" class="select-item" value="title">Titre</option>
                            </select>                             
                        </section>
                    </div>`
        }

        this.displayPrice = () => {
            return `<span class="dayPrice">
                        ${this._price}€ / jour
                    </span>`
        }
    }
}

export class Media {
    constructor(id, photographerId, photographerName, title, image, video, tags, likes, date, price) {
        this._id = id;
        this._photographerId = photographerId;
        this._photographerName = photographerName;
        this._title = title;
        this._image = image;
        this._video = video;
        this._tags = tags;
        this._likes = likes;
        this._moreLikes = this._likes++;
        this._date = date;
        this._price = price;

        this.createMedia = () => {
            return `<article id="${this._id}" class="artist-media">
                        ${this.chooseMediaType()}
                    <div class="media-infos">
                        <p class="media-title">${this._title}</p>
                        <span class="likes">
                            <p class="numberOfLikes">${this._likes}</p>
                            <i tabindex="0" class="fas fa-heart likesIcon" onclick="this.incrementLikes()"></i>
                        </span>
                    </div>
                </article>`
            }

        this.chooseMediaType = () => {
            if (this._image) {
               const imageType = new Image(this._photographerName, this._image);
                return imageType.makeImage();
            }
            if (this._video) {
               const videoType = new Video(this._photographerName, this._video);
               return videoType.makeVideo();
            }
        }

        this.incrementLikes = () => {
            console.log(document.getElementsByClassName('numberOfLikes').value);
        }
    }
}

class Image extends Media {
    constructor(photographerName, image) {
        super()
        this._photographerName = photographerName;
        this._image = image;
        this.makeImage = () => {
            return ` <img tabindex="0" src="../media/${this._photographerName}/${this._image}" alt="Photo" class="photo">`

        }
    }
}

class Video extends Media {
    constructor(photographerName, video) {
        super()
        this._photographerName = photographerName;
        this._video = video;
        this.makeVideo = () => {
            return ` <video tabindex="0" class="video" data-state="hidden">
                        <source src="../media/${this._photographerName}/${this._video}" type="video/mp4">
                        <p>Votre navigateur ne prend pas en charge les vidéos HTML5.
                        Voici <a href="../media/${this._photographerName}/${this._video}">un lien pour télécharger la vidéo</a>.</p>
                    </video>`
        }
    }
}

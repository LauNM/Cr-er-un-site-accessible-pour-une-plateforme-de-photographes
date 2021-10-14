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

        this.displayArtistInfo = () => {
            const artistInfoSection = document.createElement('section');
            artistInfoSection.className = "artist-infos";

            const artistName = document.createElement('h1');
            artistName.textContent = this._name;
            const artistMain = document.createElement('section');
            artistMain.className = "artist-main";

                const localisation = document.createElement('p');
                localisation.className = "localisation";
                localisation.textContent = `${this._city}, ${this._country}`; 
                const description = document.createElement('p');
                description.className = "description";
                description.textContent = this._tagline;

                artistMain.appendChild(localisation);
                artistMain.appendChild(description);

            const tags = document.createElement('section');
            tags.className = "tags";
                const list = document.createElement('ul');
                list.insertAdjacentHTML('afterbegin',this.addTagsArtist());
                tags.appendChild(list);

            artistInfoSection.appendChild(artistName);
            artistInfoSection.appendChild(artistMain);
            artistInfoSection.appendChild(tags);
            return artistInfoSection;
        }

        this.displayButtonContact = () => {
            const contactSection = document.createElement('section');
            contactSection.className = "button";
                const contactBtn = document.createElement('button');
                contactBtn.className = "contact-btn";
                contactBtn.id = "contact-this-artist";
                contactBtn.tabIndex = "0";
                contactBtn.textContent = "Contactez-moi";
                contactBtn.addEventListener('click', () => {
                    document.getElementById('contact-artist-form').style.display = "block";
                })

            contactSection.appendChild(contactBtn);
            return contactSection;
        }

        this.displayIdPhoto = () => {
            const idPhoto = document.createElement('img');
            idPhoto.className = "id-photo";
            idPhoto.src = `../media/Photographers/${this._portrait}`;
            idPhoto.alt = "ID Photo";
            
            return idPhoto;
        }

        this.displayPage = () => {
            const artistHeader = document.createElement('div');
            artistHeader.className = "artist-header";
                const artistPresentation = document.createElement('div');
                artistPresentation.className = "artist-presentation";
                artistPresentation.appendChild(this.displayArtistInfo());
                artistPresentation.appendChild(this.displayButtonContact());
            artistHeader.appendChild(artistPresentation);
            artistHeader.appendChild(this.displayIdPhoto());

            return artistHeader;
        }

        this.displaySelectFilter = () => {
            return `<section class="artist-main">
                        <label for="sort-by">Trier par :</label>
                        <select tabindex="0" name="sort" id="sort-by">
                            <option tabindex="0" class="select-item" value="popularity">Popularité</option>
                            <option tabindex="0" class="select-item" value="date">Date</option>
                            <option tabindex="0" class="select-item" value="title">Titre</option>
                        </select>                             
                    </section>`
        }

        this.displayArtistNameInForm = () => {
            const span = document.createElement('span');
            span.textContent = this._name;
            return span;
        }
        
        /* this.artistPage = () => {
            return `
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
                        <div class="bground">
                            <div class="content">
                                <h1>Contactez-moi</h1>
                                <p>${this._name}</p>
                                <span class="close"></span>
                                <div class="modal-body">
                                    <form
                                            id="contact"
                                            name="contact"
                                            method="post"
                                    >
                                        <div class="formData">
                                            <label for="first">Prénom</label><br>
                                            <input
                                                    class="text-control"
                                                    type="text"
                                                    id="first"
                                                    name="first"
                                            /><br>
                                        </div>
                                        <div class="formData">
                                            <label for="last">Nom</label><br>
                                            <input
                                                    class="text-control"
                                                    type="text"
                                                    id="last"
                                                    name="last"
                                            /><br>
                                        </div>
                                        <div class="formData">
                                            <label for="email">E-mail</label><br>
                                            <input
                                                    class="text-control"
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                            /><br>
                                        </div>
                                        <div class="formData">
                                            <label for="message">Votre message</label><br>
                                            <input
                                                    class="text-control"
                                                    type="textarea"
                                                    id="message"
                                                    name="message"
                                            /><br>
                                        </div>
                                       
                                        <input
                                                class="button btn-submit"
                                                type="submit"
                                                value="Envoyer"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>`
        }
 */
       
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
        this._date = date;
        this._price = price;
        

        this.createMedia = () => {
            let newValue = this._likes;

            const article = document.createElement("article");
            article.id = this._id;
            article.className = "artist-media";

            const mediaInfo = document.createElement("div");
            mediaInfo.className = "media-infos";

            const title = document.createElement("p");
            title.className = "media-title";
            title.textContent = this._title;

            const likeSection = document.createElement("span");
            likeSection.className = "likes-section";

            const numberOfLikes = document.createElement("p");
            numberOfLikes.className = "likes";
            numberOfLikes.textContent = newValue;

            const heartIcon = document.createElement("i");
            heartIcon.className = "fas fa-heart";
            heartIcon.tabIndex = "0";

            heartIcon.addEventListener('click', () => {
                newValue += 1;
                numberOfLikes.textContent = newValue;
            });
            /* heartIcon.addEventListener('keypress', () => {
                let newLikes = this._likes += 1;
                numberOfLikes.textContent.replace(this._likes, newLikes);   
            }); */
            likeSection.appendChild(numberOfLikes);
            likeSection.appendChild(heartIcon);
            mediaInfo.appendChild(title);
            mediaInfo.appendChild(likeSection);
            article.insertAdjacentHTML('afterbegin',this.chooseMediaType())
            article.appendChild(mediaInfo);

            return article;
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
        
        
       
    }
    addLikes = (likes) => {
        this._likes += 1;
    }
    getLikes = () => {
        return this._likes;
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

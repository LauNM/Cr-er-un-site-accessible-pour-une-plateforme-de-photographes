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
                    link.href = '/';
                    
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
            const article = document.createElement('article');
            article.className = "photographer-description";

                const a = document.createElement('a');
                a.tabIndex = "0";
                a.href =`./assets/pages/artist.html?id=${this._id}` ;
                a.id=`${this._name}`;

                    const cardHeader = document.createElement('section');
                    cardHeader.className="card-header";

                        const img = document.createElement('img');
                        img.src = `assets/media/Photographers/${this._portrait}`;
                        img.alt = "ID photo";
                        img.className = "id-photo";

                        const name = document.createElement('h2');
                        name.textContent = this._name;

                        cardHeader.appendChild(img);
                        cardHeader.appendChild(name);
                    a.appendChild(cardHeader);
                
                const cardMain = document.createElement('section');
                cardMain.className = "card-main";

                    const title = document.createElement('h3');
                    title.textContent = `${this._city}, ${this._country}`;

                    const description = document.createElement('p');
                    description.className = "description";
                    description.textContent = this._tagline;

                    const price = document.createElement('p');
                    price.className = "price";
                    price.textContent = `${this._price} €/jour`;

                    cardMain.appendChild(title);
                    cardMain.appendChild(description);
                    cardMain.appendChild(price);

                const cardTags = document.createElement('section');
                cardTags.className = "card-tags";
                cardTags.appendChild(addTags(this._tags));

            article.appendChild(a);
            article.appendChild(cardMain);
            article.appendChild(cardTags);

            return article;
        }

        this.createArtistInfo = () => {
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
            tags.appendChild(addTags(this._tags));

            artistInfoSection.appendChild(artistName);
            artistInfoSection.appendChild(artistMain);
            artistInfoSection.appendChild(tags);
            return artistInfoSection;
        }

        this.createButtonContact = () => {
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

        this.createIdPhoto = () => {
            const idPhoto = document.createElement('img');
            idPhoto.className = "id-photo";
            idPhoto.src = `../media/Photographers/${this._portrait}`;
            idPhoto.alt = "ID Photo";
            
            return idPhoto;
        }

        this.createPage = () => {
            const artistHeader = document.createElement('div');
            artistHeader.className = "artist-header";
                const artistPresentation = document.createElement('div');
                artistPresentation.className = "artist-presentation";
                artistPresentation.appendChild(this.createArtistInfo());
                artistPresentation.appendChild(this.createButtonContact());
            artistHeader.appendChild(artistPresentation);
            artistHeader.appendChild(this.createIdPhoto());

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
       
        this.displayPrice = () => {
            return this._price;
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
            numberOfLikes.textContent = this._likes;

            const heartIcon = document.createElement("i");
            heartIcon.className = "fas fa-heart";
            heartIcon.tabIndex = "0";

            heartIcon.addEventListener('click', () => {
                this._likes += 1;
                numberOfLikes.textContent = this._likes;
                console.log(infoList)
                
                let total = 0;
                infoList.forEach((item) => {
                    total += item._likes;
                });

                document.querySelector("#totalOfLikes").innerHTML = total;
            
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
            return ` <a href="../media/${this._photographerName}/${this._image}" class="media-link">
                        <img 
                        tabindex="0" 
                        src="../media/${this._photographerName}/${this._image}" 
                        alt="Photo" 
                        class="photo">
                    </a>`

        }
    }
}

class Video extends Media {
    constructor(photographerName, video) {
        super()
        this._photographerName = photographerName;
        this._video = video;
        this.makeVideo = () => {
            return ` <a href="../media/${this._photographerName}/${this._video}" class="media-link">
                        <video 
                        tabindex="0" 
                        class="video" 
                        data-state="hidden">
                            <source src="../media/${this._photographerName}/${this._video}" type="video/mp4">
                        </video>
                    </a>`
        }
    }
}

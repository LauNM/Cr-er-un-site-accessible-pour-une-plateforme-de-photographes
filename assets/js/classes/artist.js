import { addTags } from "./functions.js";
import { infoList } from "./functions.js";
import { sortBy } from "../photographer-page.js";

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
            a.href = `./assets/pages/photographer-page.html?id=${this._id}`;
            a.id = `${this._name}`;

            const cardHeader = document.createElement('section');
            cardHeader.className = "card-header";

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
            const tab = {
                likes : 'Popularité',
                date : 'Date',
                title : 'Titre'
            }
            const section = document.createElement('section');
            section.className = 'artist-main';
                const label = document.createElement('label');
                label.for = "sort-by";
                label.innerHTML = "Trier par :";

                const select = document.createElement('select');
                select.tabIndex = 0;
                select.name = "sort";
                select.id = "sort-by";
                

                for(let el in tab){
                    const option = document.createElement('option');
                    option.tabIndex = 0;
                    option.className = "select-item";
                    option.value = el;
                    option.innerHTML = tab[el];
                    option.addEventListener('change', () => {
                        console.log(el)
                    })

                    select.appendChild(option);
                }
                section.appendChild(label);
                section.appendChild(select);
            return section;
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
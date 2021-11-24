import { infoList, createLinksTag, displayAllFilteredMedia } from "../functions.js";



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
    }
    get tags() {
        return this._tags;
    }
    set tags(value) {
        this._tags = value;
    }

    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }

    /*

    HOME PAGE
    functions to create parts of artist article 

     */
    createLinkToArtistPage = () => {
        const a = document.createElement('a');
        a.tabIndex = "0";
        a.href = `./pages/photographer-page.html?id=${this._id}`;
        a.id = `${this._name}`;
        a.ariaLabel = this._name;
        a.appendChild(this.createCardHeader());

        return a;
    }
    createCardHeader = () => {
        const cardHeader = document.createElement('section');
        cardHeader.className = "card-header";
        cardHeader.ariaLabel = this._name;

        const img = document.createElement('img');
        img.src = `../assets/media/Photographers/${this._portrait}`;
        img.alt = "";
        img.className = "id-photo";

        const name = document.createElement('h2');
        name.textContent = this._name;

        cardHeader.appendChild(img);
        cardHeader.appendChild(name);
        return cardHeader;
    }
    createCardMain = () => {
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

        return cardMain;
    }

    // CREATION OF GLOBAL ARTIST ARTICLE FOR HOME PAGE

    createArtistCard = () => {
        const article = document.createElement('article');
        article.className = "photographer-description";

        article.appendChild(this.createLinkToArtistPage());
        article.appendChild(this.createCardMain());

        return article;
    }

    /*

        ARTIST PAGE
        functions to create parts of artist article 

     */
    createArtistInformations = () => {
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

        const tagsSection = document.createElement('section');
        tagsSection.className = "tags";
        tagsSection.appendChild(createLinksTag(this._tags));

        artistInfoSection.appendChild(artistName);
        artistInfoSection.appendChild(artistMain);
        artistInfoSection.appendChild(tagsSection);
        return artistInfoSection;
    }

    createButtonContact = () => {
        const contactSection = document.createElement('section');
        contactSection.className = "contact";
        const contactBtn = document.createElement('button');
        contactBtn.className = "contact-btn";
        contactBtn.ariaLabel = "Contact me";
        contactBtn.id = "contact-this-artist";
        contactBtn.tabIndex = "0";
        contactBtn.textContent = "Contactez-moi";
        contactBtn.addEventListener('click', () => {
            document.getElementById('contact-artist-form').style.display = "block";
        })

        contactSection.appendChild(contactBtn);
        return contactSection;
    }

    createIdPhoto = () => {
        const imageWrapper = document.createElement('section');
        imageWrapper.className = "image-wrapper";
        const idPhoto = document.createElement('img');
        idPhoto.className = "id-photo";
        idPhoto.src = `../assets/media/Photographers/${this._portrait}`;
        idPhoto.alt = this._name;
        imageWrapper.appendChild(idPhoto)

        return imageWrapper;
    }

    // CREATION OF GLOBAL ARTIST PRESENTATION FOR ARTIST PAGE
    createArtistPagePresentation = () => {
        const artistPresentation = document.createElement('div');
        artistPresentation.className = "artist-presentation";
        artistPresentation.appendChild(this.createArtistInformations());
        artistPresentation.appendChild(this.createButtonContact());
        artistPresentation.appendChild(this.createIdPhoto());

        return artistPresentation;
    }


    //CREATE SORTING DATA BUTTON

    createSortingDataButton = () => {
        const tab = {
            likes: 'Popularité',
            date: 'Date',
            title: 'Titre'
        }
        const section = document.createElement('section');
        section.className = 'artist-main';
        const label = document.createElement('label');
        label.for = "order-by";
        label.innerHTML = "Trier par ";

        const select = document.createElement('select');
        select.tabIndex = 0;
        select.ariaLabel = "Order By";
        select.name = "order-by";
        select.id = "order-by";


        for (let el in tab) {
            const option = document.createElement('option');
            option.tabIndex = 0;
            option.className = "select-item";
            option.value = el;
            option.innerHTML = tab[el];

            select.appendChild(option);
        }
        select.addEventListener('change', () => {
            displayAllFilteredMedia(infoList, select.value)
        })

        section.appendChild(label);
        section.appendChild(select);
        return section;
    }



    // DISPLAY ARTIST NAME IN FORM
    displayArtistNameInForm = () => {
        const span = document.createElement('span');
        span.textContent = this._name;
        return span;
    }
}
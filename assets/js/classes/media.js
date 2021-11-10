
import { Lightbox } from "../lightbox.js";
import { infoList } from "./functions.js";

export class Media {
    constructor(id, photographerId, photographerName, title, image, video, altText, tags, likes, date, price) {
        this._id = id;
        this._photographerId = photographerId;
        this._photographerName = photographerName;
        this._title = title;
        this._image = image;
        this._video = video;
        this._altText = altText;
        this._tags = tags;
        this._likes = likes;
        this._date = date;
        this._price = price;

    }

    get title() {
        return this._title;
    }

    set title(val) {
        this._title = val;
    }

    get date() {
        return this._date;
    }

    set date(val) {
        this._date = val;
    }

    get likes() {
        return this._likes;
    }

    set likes(val) {
        this._likes = val;
    }

    chooseMediaType = () => {
        if (this._image) {
            return new Image(this._id, this._photographerName, this._image, this._altText);
        }
        if (this._video) {
            return new Video(this._id, this._photographerName, this._video, this._altText);
        }
    }

    createMedia = () => {

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
        heartIcon.className = "fas fa-heart click";
        heartIcon.tabIndex = "0";

        heartIcon.addEventListener('click', () => {
            this._likes += 1;
            numberOfLikes.textContent = this._likes;

            let total = 0;
            infoList.forEach((item) => {
                total += item._likes;
            });

            document.querySelector("#totalOfLikes").innerHTML = total;

        });
        heartIcon.addEventListener('keypress', () => {
            this._likes += 1;
            numberOfLikes.textContent = this._likes;
            console.log(infoList)

            let total = 0;
            infoList.forEach((item) => {
                total += item._likes;
            });

            document.querySelector("#totalOfLikes").innerHTML = total;
        });
        likeSection.appendChild(numberOfLikes);
        likeSection.appendChild(heartIcon);
        mediaInfo.appendChild(title);
        mediaInfo.appendChild(likeSection);

        const mediaType = this.chooseMediaType();
        article.appendChild(mediaType.render())
        article.appendChild(mediaInfo);

        return article;
    }

}

class Image extends Media {
    constructor(id, photographerName, image, altText) {
        super()
        this._id = id;
        this._photographerName = photographerName;
        this._image = image;
        this._altText = altText;

    }
    render = () => {
        const image = document.createElement('img');

        image.src = `../media/${this._photographerName}/${this._image}`;
        image.id = this._id;
        image.className = "photo";
        image.tabIndex= "0";
        image.alt = this._altText;

        image.addEventListener('click', (e) => {

            new Lightbox(infoList, this._id)
        })
        return image;
    }

    renderLightbox = () => {
        const image = document.createElement('img');

        image.src = `../media/${this._photographerName}/${this._image}`;
        image.style.height = "90vh";
        image.id = this._id;
        image.alt = this._altText;

        return image;
    }
}

class Video extends Media {
    constructor(id, photographerName, video) {
        super()
        this._id = id;
        this._photographerName = photographerName;
        this._video = video;

    }
    render = () => {
        const video = document.createElement('video');
        video.tabIndex = "0";
        video.className = "video";
        video.setAttribute('data-state', 'hidden');
            const source = document.createElement('source');
            source.id = this._id;
            source.src = `../media/${this._photographerName}/${this._video}`;
            source.type = "video/mp4";
        video.appendChild(source);

        video.addEventListener('click', (e) => {
            new Lightbox( infoList, this._id)
        })
        return video;
    }
    renderLightbox = () => {
        const video = document.createElement('video');
        video.autoplay = true;
        video.style.height = "90vh";
            const source = document.createElement('source');
            source.id = this._id;
            source.src = `../media/${this._photographerName}/${this._video}`;
            source.type = "video/mp4";
        video.appendChild(source);

        return video;
    }
}

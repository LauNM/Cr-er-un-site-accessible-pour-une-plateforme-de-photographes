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
            heartIcon.className = "fas fa-heart click";
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
            article.appendChild(this.chooseMediaType())
            article.appendChild(mediaInfo);

            return article;
        }

        this.chooseMediaType = () => {
            if (this._image) {
                const imageType = new Image(this._id, this._photographerName, this._image, this._altText);
                return imageType.makeImage();
            }
            if (this._video) {
                const videoType = new Video(this._id, this._photographerName, this._video, this._altText);
                return videoType.makeVideo();
            }
        }

    }
    getLikes = () => {
        return this._likes;
    }
}

class Image extends Media {
    constructor(id, photographerName, image, altText) {
        super()
        this._id = id;
        this._photographerName = photographerName;
        this._image = image;
        this._altText = altText;
        this.makeImage = () => {
            const image = document.createElement('img');
            
            image.src = `../media/${this._photographerName}/${this._image}`;
            image.id = id;
            image.className = "photo";
            image.tabIndex= "0";
            image.alt = this._altText;
            
            image.addEventListener('click', (e) => {
                
                new Lightbox( infoList, image.src, image.id)
            })
            return image;
        }
    }
}

class Video extends Media {
    constructor(id, photographerName, video) {
        super()
        this._id = id;
        this._photographerName = photographerName;
        this._video = video;
        this.makeVideo = () => {
            const video = document.createElement('video');
            video.tabIndex = "0";
            video.className = "video";
            video.setAttribute('data-state', 'hidden');
                const source = document.createElement('source');
                source.id = id;
                source.src = `../media/${this._photographerName}/${this._video}`;
                source.type = "video/mp4";
            video.appendChild(source);

            video.addEventListener('click', (e) => {
                new Lightbox( infoList, source.src, source.id)
            })
            return video;
        }
    }
}

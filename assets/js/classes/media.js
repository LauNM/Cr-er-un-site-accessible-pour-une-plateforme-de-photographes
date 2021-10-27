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
            /* heartIcon.addEventListener('keypress', () => {
                let newLikes = this._likes += 1;
                numberOfLikes.textContent.replace(this._likes, newLikes);   
            }); */
            likeSection.appendChild(numberOfLikes);
            likeSection.appendChild(heartIcon);
            mediaInfo.appendChild(title);
            mediaInfo.appendChild(likeSection);
            // article.insertAdjacentHTML('afterbegin',this.chooseMediaType())
            article.appendChild(this.chooseMediaType())
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
            const link = document.createElement('a');
            //link.href = `../media/${this._photographerName}/${this._image}`;
            link.href = `#`;
            link.className = "media-link";
            link.innerHTML = `  <img 
                                    tabindex="0" 
                                    src="../media/${this._photographerName}/${this._image}" 
                                    alt="Photo" 
                                    class="photo">`;
            link.addEventListener('click', (e) => {
                new Lightbox( `../media/${this._photographerName}/${this._image}`)
            })
            return link;
        }
    }
}

class Video extends Media {
    constructor(photographerName, video) {
        super()
        this._photographerName = photographerName;
        this._video = video;
        this.makeVideo = () => {
            const link = document.createElement('a');
            link.href = `#`;
           // link.href = `../media/${this._photographerName}/${this._video}`;
            link.className = "media-link";
            link.innerHTML =`<video 
                                tabindex="0" 
                                class="video" 
                                data-state="hidden">
                                    <source src="../media/${this._photographerName}/${this._video}" type="video/mp4">
                                </video>`;
            link.addEventListener('click', (e) => {
                new Lightbox( `../media/${this._photographerName}/${this._video}`)
            })
            return link;
        }
    }
}

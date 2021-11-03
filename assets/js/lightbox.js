export class Lightbox {

    /**
     * 
     * @param {string} url URL de l'image
     * @param {string[]} tab tab with all media of photographer
     */
    constructor (tab, url, id) {
        this._tab = tab;
        this._url = url;
        this._id = id;
        this.element = this.buildDom(url, id);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp (e) {
        if (e.key === 'Escape') {
            this.close(e)
        }
    }
    /**
     * Close lightbox
     * @param {MouseEvent/KeyboardEvent} e 
     */
    close (e) {
        e.preventDefault();
       // this.element.className('fadeOut');
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 300);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * 
     * @param {MouseEvent/KeyboardEvent} e 
     */
     next (e) {
        e.preventDefault();
        const i = Object.keys(this._tab).forEach(key => {
           // console.log(typeof(this._tab[key]))
             console.log(this._tab[key]._id === parseInt(this._id))
        });
       
    }

    /**
     *
     * @param {MouseEvent/KeyboardEvent} e 
     */
     previous (e) {
        e.preventDefault();
       
    }

    /**
     * 
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */
    buildDom (url, id) {
        const dom = document.createElement('div');
        dom.className = 'lightbox';

            const buttonClose = document.createElement('button');
            buttonClose.className = "lightbox__close";

            const buttonNext = document.createElement('button');
            buttonNext.className = "lightbox__next";

            const buttonPrevious = document.createElement('button');
            buttonPrevious.className = "lightbox__previous";

            const container = document.createElement('div');
            container.className = "lightbox__container";

                if(/\.(jpg|gif|png)$/.test(url) ) {
                    const image = document.createElement('img');
                    image.src = url;
                    image.id = id;
                    image.alt = "";
                    image.style.height = "90vh";
                    container.appendChild(image);
                }
                if((/\.(mp4)$/.test(url) )) {
                    const video = document.createElement('video');
                    video.style.height = "90vh";
                    video.autoplay = true;
                        const source = document.createElement('source');
                        source.src = url;
                        source.id = id;
                        source.type = "video/mp4";
                        video.appendChild(source);
                    container.appendChild(video);
                }
            dom.appendChild(buttonClose);
            dom.appendChild(buttonNext);
            dom.appendChild(buttonPrevious);
            dom.appendChild(container);

        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))

        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))

        dom.querySelector('.lightbox__previous').addEventListener('click', this.previous.bind(this))
        return dom;
    }
}


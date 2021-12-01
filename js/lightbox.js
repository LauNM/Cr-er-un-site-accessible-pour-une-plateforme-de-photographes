import { focusInElement } from "./functions.js";

export class Lightbox {

    /**
     * @param {number} id
     * @param {string[]} tab tab with all media of photographer
     */
    constructor (tab, id) {
        this._tab = tab;
        this._id = id;

        this.element = this.buildDom();
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);

        this.index = this._tab.findIndex(media => media._id === parseInt(this._id));
        this.chooseMediaFromIndex(this.index);

        document.addEventListener('keyup', this.onKeyUp);
        document.getElementById("lightbox__next").focus();
        
    }

    /**
     * 
     * @param {Number} index
     */
    chooseMediaFromIndex (index) {

        const mediaSelected = this._tab[index];
        const renderMedia = mediaSelected.chooseMediaType().renderLightbox();
        this.buildMedia(renderMedia);  
    }

    /**
     *
     * @param {KeyboardEvent} e
     */
    onKeyUp (e) {
        if (e.key === 'Escape') {
            this.close(e)
        }
        if (e.key === 'ArrowLeft') {
            this.previous(e)
        }
        if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }
    /**
     * Close lightbox
     * @param {MouseEvent/KeyboardEvent} e
     */
    close (e) {
        e.preventDefault();
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 300);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * Display next media
     * @param {MouseEvent/KeyboardEvent} e
     */
     next (e) {
        e.preventDefault();
        this.index +=1;

        if (this.index === this._tab.length) {
           this.index = 0;
        }
        this.chooseMediaFromIndex(this.index);
    }

    /**
     * Display previous media
     * @param {MouseEvent/KeyboardEvent} e
     */
     previous (e) {
        e.preventDefault();
        this.index -=1;

        if (this.index === -1) {
           this.index = this._tab.length-1;
        }
        this.chooseMediaFromIndex(this.index);
    }

    /**
     *
     * @return {HTMLElement}
     */
    buildDom () {
        const dom = document.createElement('div');
        dom.className = 'lightbox';
            const buttonNext = document.createElement('button');
            buttonNext.id = "lightbox__next";
            buttonNext.ariaLabel = "next";
            const nextIcon = document.createElement('i');
            nextIcon.className = "fas fa-chevron-right fa-3x lightbox-icon";
            buttonNext.appendChild(nextIcon);

            const buttonPrevious = document.createElement('button');
            buttonPrevious.id = "lightbox__previous";
            buttonPrevious.ariaLabel = "previous";
            const previousIcon = document.createElement('i');
            previousIcon.className = "fas fa-chevron-left fa-3x lightbox-icon";
            buttonPrevious.appendChild(previousIcon);

            const buttonClose = document.createElement('button');
            buttonClose.id = "lightbox__close";
            buttonClose.ariaLabel = "close";
            const closeIcon = document.createElement('i');
            closeIcon.className = "fas fa-times fa-3x lightbox-icon";
            buttonClose.appendChild(closeIcon);

            const container = document.createElement('div');
            container.className = "lightbox__container";
            container.id = "mediaContainer";

        dom.appendChild(buttonNext);
        dom.appendChild(buttonPrevious);
        dom.appendChild(buttonClose);
        dom.appendChild(container);

        focusInElement(dom)
        buttonClose.addEventListener('click', this.close.bind(this))
        buttonNext.addEventListener('click', this.next.bind(this))
        buttonPrevious.addEventListener('click', this.previous.bind(this))
        return dom;
    }

    /**
     * Build media container - image or video
     * @param {HTMLElement} media
     */
    buildMedia (media) {
        const container = document.getElementById('mediaContainer');
        container.innerHTML = '';
        container.appendChild(media);
    }

}


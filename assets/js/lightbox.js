export class Lightbox {

    /**
     * 
     * @param {string} url URL de l'image
     */
    constructor (tab, url) {
        this._tab = tab;
        this._url = url;
        console.log(url);
        this.element = this.buildDom(url);
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
     * @param {MouseEvent} e 
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
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */
    buildDom (url) {
        const dom = document.createElement('div');
        dom.className = 'lightbox';
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__previous">précédent</button>
        <div class="lightbox__container">
            <img src="${url}" alt="">
        </div>`;
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        return dom;

    }
}


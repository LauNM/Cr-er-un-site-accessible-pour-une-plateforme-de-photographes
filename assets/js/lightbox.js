export class Lightbox {


    /**
     * 
     * @param {string} url URL de l'image
     */
    constructor (url) {
        this.element = this.buildDom(url)
        document.body.appendChild(this.element)
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
        }, 300)
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

/**
 * 
 <div class="lightbox">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__previous">précédent</button>
        <div class="lightbox__container">
            <img src="../media/Ellie-Rose Wilkens/Architecture_Connected_Curves.jpg" alt="">
        </div>
    </div>
 */

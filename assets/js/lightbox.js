class Lightbox {

    static init () {
        const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]').forEach(link => link.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('href'))
        }))
    }

    /**
     * 
     * @param {string} url URL de l'image
     */
    constructor (url) {
        const element = this.buildDom(url)
        document.body.appendChild(element)
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
        </div>`
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
Lightbox.init()
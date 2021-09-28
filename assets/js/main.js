// FUNCTIONS
const createArticle = (portrait, name, city, country, tagline, price, tags) => {
    return ` <article class="photographer-description">
        <a href="assets/pages/artist.html" id="${name}">
            <section class="card-header">
                <img src="assets/img/Photographers/${portrait}" alt="ID photo" class="id-photo">
                <h2>${name}</h2>
            </section>
        </a>
        <section class="card-main">
            <h3>${city}, ${country}</h3>
            <p class="description">${tagline}</p>
            <p class="price">${price} €/jour</p>
        </section>
        <section class="card-tags">
            <ul>
                ${tags}
            </ul>
        </section>
    </article>
    
   `
}
//Create taglist for 1 photographer
const addTags = (tags) => {
    let list = '';
    tags.forEach(tag => {
        list += `<li class="tag">
            <a href="#">#${tag}</a>
        </li>`
    })
    return list;
}

//Create taglist from all tags in data
const tagsList = (data) => {
    let tagsTab = [];
    data.forEach(el => {
        el.tags.forEach(tag => {
            if (!tagsTab.includes(tag)) {
                tagsTab.push(tag)
            }
        })
    })
    return tagsTab;
}

function createCard(data) {
    data.forEach(e => {
        cardsSection.insertAdjacentHTML('afterbegin', createArticle(e.portrait, e.name, e.city, e.country, e.tagline, e.price, addTags(e.tags)));
    });
}

function artistPage(portrait, name, city, country,tagline, price, tags) {
    return ` <div>
        <div class="artist-header">
            <section>
                <h2>${name}</h2>
                    <h3>${city}, ${country}</h3>
                    <p class="description">${tagline}</p>
                    <section class="card-tags">
                        <ul>
                            ${tags}
                        </ul>
                    </section>
            </section>
            <button>Contactez-moi</button>
            <img src="assets/img/Photographers/${portrait}" alt="ID photo" class="id-photo">
        </div>
        <section class="artist-main">
          <p>Trier par</p>
          <button>Popularité</button>
          <div class="artist-photos">
            <article class="card-photos">
                <img src="" alt="Photo" class="card-photo">
                <span>
                    <h2></h2>
                    <h2>12</h2>
                </span>
            </article>
          </div>
        </section>
    </div>`
}

// THEN
const cardsSection = document.getElementById("cards");
const navTags = document.getElementById("nav-tags");
const artist = document.getElementById("artist");


/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

fetch('assets/data.json').then(response => {
    return response.json();
}).then(data => {
    createCard(data.photographers);
    navTags.insertAdjacentHTML('afterbegin', addTags(tagsList(data.photographers)));

}).catch(err => {
    console.log(err);
});

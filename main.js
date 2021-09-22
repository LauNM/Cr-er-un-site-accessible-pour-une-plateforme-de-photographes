// FUNCTIONS
const createArticle = (portrait, name, city, country, tagline, price, tags) => {
    return ` <article class="photographer-description">
    <section class="card-header">
        <img src="assets/img/Photographers/${portrait}" alt="ID photo" class="id-photo">
        <h2>${name}</h2>
    </section>
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
            tagsTab.indexOf(tag) === -1 ? tagsTab.push(tag) : ''
        })
    })
    return tagsTab;
}

function createCard(data) {
    data.forEach(e => {
        cardsSection.insertAdjacentHTML('afterbegin', createArticle(e.portrait, e.name, e.city, e.country, e.tagline, e.price, addTags(e.tags)));
    });
}

// THEN
const cardsSection = document.getElementById("cards");
const navTags = document.getElementById("nav-tags");


/* -------------------------------------- FETCH DATA HERE -------------------------------------------*/

fetch('assets/data.json').then(response => {
    return response.json();
}).then(data => {
    createCard(data.photographers);
    navTags.insertAdjacentHTML('afterbegin', addTags(tagsList(data.photographers)));

}).catch(err => {
    console.log(err);
});



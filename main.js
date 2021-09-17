// FUNCTIONS
const createArticle = (portrait, name, city, country, tagline, price, tagList) => {
    return ` <article class="photographer-description">
    <section class="card-header">
        <img src="assets/img/Photographers/${portrait}" alt="ID photo" class="id-photo">
        <h2>${name}</h2>
    </section>
    <section>
        <h3>${city}, ${country}</h3>
        <p class="description">${tagline}</p>
        <p class="price">${price} €/jour</p>
    </section>
    <section>
        <ul>
            ${tagList}
        </ul>
    </section>
    </article>
   `
}

const createTagList = (tags) => {
    let list = '';
    tags.forEach(tag => {
        list += `<li class="tag">
            <a href="#">#${tag}</a>
        </li>`
    })
    return list;
}


// THEN
const cardsSection = document.getElementById("cards");


function createCard() {
    fetch('assets/data.json').then(response => {
        return response.json();
    }).then(data => {
        data.photographers.forEach(e => {
            cardsSection.insertAdjacentHTML('afterbegin', createArticle(e.portrait, e.name, e.city, e.country, e.tagline, e.price, createTagList(e.tags)));
        });

    }).catch(err => {
        console.log(err);
    });

}

createCard();

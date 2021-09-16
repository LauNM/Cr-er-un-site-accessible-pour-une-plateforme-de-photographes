// FUNCTIONS
const createArticle = (portrait, name, city, country, tagline, price, tags) => {
  return  ` <article class="photographer-description">
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
            <li class="tag">
                <a href="#">#${tags[0]}</a>
            </li>
            <li class="tag">
                <a href="#">#${tags[1]}</a>
            </li>
            <li class="tag">
                <a href="#">#${tags[2]}</a>
            </li>
        </ul>
    </section>
    </article>
   `
}

const createTagList = (tags) => {
    tags.forEach(tag => {
        console.log( `<li class="tag">
            <a href="#">#${tag}</a>
        </li>`)
    })
}

// THEN
const cardsSection = document.getElementById("cards");


function createCard() {
    fetch('assets/data.json').then(response => {
        return response.json();
    }).then(data => {
        data.photographers.forEach(e => {
            //console.log(createTagList(e.tags));
             cardsSection.insertAdjacentHTML('afterbegin', createArticle(e.portrait, e.name, e.city, e.country, e.tagline, e.price, e.tags));
       });

    }).catch(err => {
        console.log(err);
    });

}
createCard();
const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');

let activeTab = 1, allData;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// even listeners
window.addEventListener('DOMContentLoaded', () => init());
// button event listeners
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}


const mainContainer=document.querySelector('.tab-body-single');

const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);

//getting the id from ulrsearchparams
var id = searchParams.get('id');
 console.log(id)

 // when the page/dom Elements loaded.. this will fire....
document.addEventListener('DOMContentLoaded',fetching);

async function fetching(){
    try {
        const responses = await fetch(`https://superheroapi.com/api.php/3358031561086203/${id}`);

        console.log("without json data",responses);
        const data = await responses.json();

        console.log("json data",data);
        
        showSuperheroDetails(data);

    }
    catch (err) {
        console.log(err)
    }
}

const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "${data.image.url}">
    `;

    document.querySelector('.name').textContent = data.name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>intelligence</span>
        </div>
        <span>${data.powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>strength</span>
        </div>
        <span>${data.powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>speed</span>
        </div>
        <span>${data.powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>durability</span>
        </div>
        <span>${data.powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>power</span>
        </div>
        <span>${data.powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>combat</span>
        </div>
        <span>${data.powerstats.combat}</span>
    </li>
    `;

    document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name</span>
        <span>${data.biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data.biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data.biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data.biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-apperance</span>
        <span>${data.biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data.biography['publisher']}</span>
    </li>
    `;

    document.querySelector('.appearance').innerHTML = `
    <li>
        <span>
            <i class = "fas fa-star"></i> gender
        </span>
        <span>${data.appearance['gender']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> race
        </span>
        <span>${data.appearance['race']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> height
        </span>
        <span>${data.appearance.height}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> weight
        </span>
        <span>${data.appearance.weight}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> eye-color
        </span>
        <span>${data.appearance.eye-color}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> hair-color
        </span>
        <span>${data.appearance.hair-color}</span>
    </li>
    `;

    document.querySelector('.connections').innerHTML = `
    <li>
        <span>group--affiliation</span>
        <span>${data.connection.group-affiliation}</span>
    </li>
    <li>
        <span>relatives</span>
        <span>${data.connections.relatives}</span>
    </li>
    `;
}
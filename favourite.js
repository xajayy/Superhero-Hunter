const favContainer = document.querySelector(".fav-container");
const ifempty = document.querySelector("#id");

// parsing from localstorage
var favArr = JSON.parse(localStorage.getItem('hero'));
if(favArr === null){
    favArr = [];
}

// console.log(favArr);

if(favArr.length === 0){
    ifempty.style.display = "block";
}

// when the page/dom elements loaded this will fire
document.addEventListener('DOMContentLoaded', showFav(favArr));

 async function showFav(favArr){
    for(let idx of favArr){
        const id = favArr[idx];
        // fetching data from api
        try {
            const responses = await fetch(`https://superheroapi.com/api.php/3358031561086203/${idx}`);

            // console.log("without json data",responses);
            const data = await responses.json();

            // console.log("json data",data);
            
            showHeroInfo(data);

        }
        catch (err) {
            console.log(err)
        }

    }
}

function showHeroInfo(data) {
    console.log(data)
    // creating all necessary elements
    var heroContainer = document.createElement('div');
    var heroName = document.createElement('div')
    var imgContainer = document.createElement('div');
    var img = document.createElement('img');
    var removeFav = document.createElement('div');
    var removeFavbtn = document.createElement('button');
    var detailcontainer = document.createElement('div');
    var detailBtn = document.createElement('button');

    //adding them the class...

    heroContainer.classList.add('heroContainer');
    heroName.classList.add("heroName");
    imgContainer.classList.add('imgContainer');
    removeFav.classList.add('removeFav');
    detailcontainer.classList.add('detailcontainer');

    heroName.innerText = data.name;
    img.src = data.image.url;
    imgContainer.appendChild(img);

    removeFavbtn.innerText = 'Remove From Favourites';
    
    detailBtn.innerText = 'Check My SuperPowers  ';

    //on clicking details btn
    detailBtn.addEventListener('click', () => {
        var heroId = data.id;
        console.log(heroId);
        window.open("demo.html?id=" + heroId, "_self");
        //if detail button clicked then details.html get opened provided with hero ID, in same tab....
    })

    removeFavbtn.addEventListener('click', (e) =>{
        var heroId = data.id;
        var i = favArr.indexOf(heroId);
        var target = e.target.parentNode.parentNode;
        // console.log(target);
        target.remove();
        if (favArr.includes(heroId)) {
            favArr.splice(i, 1);
            // console.log(i)
        }
        localStorage.setItem("hero", JSON.stringify(favArr));
        if(favArr.length===0){
            location.reload();
        }
    })

    
    // appending child elements to all the container created...
    removeFav.appendChild(removeFavbtn);

    detailcontainer.appendChild(detailBtn);

    heroContainer.appendChild(imgContainer);
    heroContainer.appendChild(heroName);
    heroContainer.appendChild(removeFav);
    heroContainer.appendChild(detailcontainer);

    favContainer.appendChild(heroContainer);

    // console.log(favContainer);

}
// getting all the required elements
const result = document.querySelector('.result');
const search = document.querySelector('#search-bar input');

search.addEventListener('keyup', searching);


async function searching() {
    console.log('searching...')

    // when input.value==empty div result is null will show nothing
    var value = search.value;

    result.innerHTML = `<div style="margin:20px; color:white; font-size:2rem; font-family:Cursive; text-align:center"> Searching.....</div>`;

    if (value !== null) {

        // fetching data from api
        try {
            const responses = await fetch(`https://www.superheroapi.com/api.php/608407618163812/search/${value.trim()}`)
            // console.log("without json data",responses);
            const data = await responses.json();
            console.log("json data",data);
            showResult(data);

        }
        catch (err) {
            console.log(err)
        }
    }
}

async function showResult(data) {

    if (data.response === 'error') {
        // console.log('error', data.response);

        // if response is not success then a message will appear...

        result.innerHTML = `<div style="margin:20px; color:white; font-size:2rem; font-family:Cursive;text-align:center">Sorry!!! No Results Found Please Search With Diffrent Name....</div>`;
    }
    else {
        result.innerHTML = null;
        for (let i = 0; i < data.results.length && i < 8; i++) {
            // console.log(data.results.length)


            //creating all the necessary elements...
            var searchInfo = document.createElement('div');
            var imgContainer = document.createElement('div');
            var img = document.createElement('img');
            var detailsContainer = document.createElement('div');
            var heroname = document.createElement('div');
            var favBtnContainer = document.createElement('div');
            var favbtn = document.createElement('button');
            var detailsBtnContainer = document.createElement('div');
            var detailsBtn = document.createElement('button');

            // adding them the class
            searchInfo.classList.add('search-info');
            imgContainer.classList.add('img-container');
            detailsContainer.classList.add('details-container');
            favBtnContainer.classList.add('favourite-button-container');
            detailsBtnContainer.classList.add('details-button-container');

            // getting all the required data from api response
            img.src = data.results[i].image.url;
            heroname.innerHTML = data.results[i].name;
            favbtn.innerHTML = "Add To Favourites..🧡";
            detailsBtn.innerHTML = "Check My SuperPowers..💪";


            favbtn.addEventListener('click', () => {
                var heroId = data.results[i].id;
                // console.log(heroId);
                pushfav(heroId);
            });

            // on clicking details button
            detailsBtn.addEventListener('click', () => {
                var heroId = data.results[i].id;
                // showDetails(heroId);
                window.open("demo.html?id=" + heroId, "_self");
                console.log(heroId)
            })



            // appending child elements to all the container created...
            detailsContainer.appendChild(heroname);

            detailsContainer.appendChild(favBtnContainer);
            favBtnContainer.appendChild(favbtn);

            detailsContainer.appendChild(detailsBtnContainer);
            detailsBtnContainer.appendChild(detailsBtn);

            imgContainer.appendChild(img);

            searchInfo.appendChild(imgContainer);
            searchInfo.appendChild(detailsContainer);

            result.appendChild(searchInfo);

            // console.log(searchInfo)


        }
    }
}

function pushfav(heroId) {
    // console.log(hero)
    var favArr;
    if (localStorage.getItem('hero') === null) {  //checking if array exist...
        favArr = [];  //if not any arr exist creating favArr
    }
    else {  //else parse it into favArr..
        favArr = JSON.parse(localStorage.getItem('hero'))
    }
    if (favArr.includes(heroId)) {
        alert('Already Your Favourite');
        return;
    }
    favArr.push(heroId);
    alert('Added To Favourites..');
    console.log(favArr)
    //setting back the localstorage
    localStorage.setItem("hero", JSON.stringify(favArr));

}
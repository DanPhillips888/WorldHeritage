const APILINK = 'http://localhost:3000/api/'
// const IMG_PATH = ''
// const SEARCHAPI = ''

const main = document.getElementById("section");
const locationDropdown = document.getElementById("locationDropdown");

const nameForm = document.getElementById("nameForm");
const nameSearch = document.getElementById("nameQuery");

const locationForm = document.getElementById("locationForm");
const locationSearch = document.getElementById("locationQuery");

returnHeritage(APILINK + 'getAll/');

// array of cards
async function returnHeritage(url){
    await fetch(url)
    .then(res => res.json())
    .then(function(data){
        // console.log(data);
        data.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_colomn = document.createElement('div');
            div_colomn.setAttribute('class', 'colomn');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const center = document.createElement('div');

            const name = document.createElement('h3');
            name.setAttribute('id', 'title');
            const rank = document.createElement('h3');
            name.setAttribute('id', 'title');
            const location = document.createElement('h5');
            location.setAttribute('id', 'title');

            name.innerHTML = `${element.WHName}`;
            location.innerHTML = `${element.Location}`;
            rank.innerHTML = `UNESCO Identifier: ${element.UNESCO}`;
            image.src = "./titleImage.jpg";
            
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(name);
            div_card.appendChild(rank);
            div_card.appendChild(location);
            div_colomn.appendChild(div_card);
            div_row.appendChild(div_colomn);

            main.appendChild(div_row);
        });
    });
}

// single card format
async function returnSite(url){
    await fetch(url)
    .then(res => res.json())
    .then(function(data){
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'singleCard');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const center = document.createElement('div');

            const name = document.createElement('h3');
            name.setAttribute('class', 'title');
            const rank = document.createElement('h3');
            name.setAttribute('id', 'title');
            const location = document.createElement('h5');
            location.setAttribute('class', 'title');
            const description = document.createElement('div');
            description.setAttribute('class', 'description');

            name.innerHTML = `${data.WHName}`;
            rank.innerHTML = `UNESCO ranking: ${data.UNESCO}`;
            location.innerHTML = `Region: ${data.Location}`;
            description.innerHTML = `${data.Description}`;
            image.src = "./titleImage.jpg";
            
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(name);
            div_card.appendChild(rank);
            div_card.appendChild(location);
            div_card.appendChild(description);

            main.appendChild(div_card);
    })
}

// Search by name bar
nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = nameSearch.value;
    console.log(nameSearch.value);

    if (searchItem) {
        returnSite(APILINK + "getOneByName/" + searchItem);
        nameSearch.value = "";
    }
});

// Search by Location
locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = locationSearch.value;
    console.log(locationSearch.value);

    if (searchItem) {
        returnHeritage(APILINK + "getOneByLoc/" + searchItem);
        locationSearch.value = "";
    }
});

// const locationDropdown = document.createElement('div');
locationDropdown.innerHTML = `
    
        <button onclick="myFunction()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content">
            <input type="text" placeholder="Search..." id="myInput" onkeyup="filterFunction()">
            <a href="#about">About</a>
            <a href="#location">Location</a>
            <a href="#about">About</a>
            <a href="#about">About</a>
            <a href="#about">About</a>
        </div>
    
`

// Dropdown button functions
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i=0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
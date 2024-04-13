var info = {};
var movies = {};
var games = {};
var shows = {};
var songs = {};

var dataBase = {};

function saveData(item) {
    if (item === 'movie') {
        movies = {};
    }
    else if (item === 'game') {
        games = {};
    }
    else if (item === 'show') {
        shows = {};
    }
    else if (item === 'song') {
        songs = {};
    }

    for (var i = 1; i <= 5; i++) {
        var itemName = document.getElementById(item + i).value;
        var itemImg = document.getElementById(item + i + "Img").value;
        if (itemName !== '') {
            if (item === 'movie') {
                movies[itemName] = itemImg;
            }
            else if (item === 'game') {
                games[itemName] = itemImg;
            }
            else if (item === 'show') {
                shows[itemName] = itemImg;
            }
            else if (item === 'song') {
                songs[itemName] = itemImg;
            }
        }
    }
    Displayitems(item);
}

function Displayitems(item) {
    var itemInputs = document.getElementById(item + 'Inputs');
    itemInputs.style.display = 'none';

    var ul = document.getElementById(item + 'sList');
    ul.innerHTML = '';
    itemObj = [];

    if (item === 'movie') {
        itemObj = movies;
    }
    else if (item === 'game') {
        itemObj = games;
    }
    else if (item === 'show') {
        itemObj = shows;
    }
    else if (item === 'song') {
        itemObj = songs;
    }

    for (var i in itemObj) {
        var li = document.createElement('li');
        var img = document.createElement('img');
        var h3 = document.createElement('h3');
        h3.textContent = i;
        img.src = itemObj[i];
        li.appendChild(img);
        li.appendChild(h3);
        ul.appendChild(li);
    };
    var itemsDisplay = document.getElementById(item + 'sDisplay');
    itemsDisplay.style.display = 'block';
}

function editItems(item) {
    var itemsDisplay = document.getElementById(item + 'sDisplay');
    var itemInputs = document.getElementById(item + 'Inputs');

    itemInputs.style.display = 'block';
    itemsDisplay.style.display = 'none';
}

function saveInfo()
{
    var name = document.getElementById('name').value;
    var year = document.getElementById('year').value;

    info = {
        name: name,
        birth: year
    }

    displayInfo();
}

function displayInfo() {
    console.log('displayInfo');
    var display = document.getElementById('info');
    var infoInputs = document.getElementById('infoInputs');
    var infoDisplay = document.getElementById('infoDisplay');

    infoInputs.style.display = 'none';
    infoDisplay.style.display = 'block';

    display.textContent = 'Name: ' + info.name + ' | Birth Year: ' + info.birth + ' | Age: ' + (2024 - info.birth);
}

function editInfo() {
    var infoInputs = document.getElementById('infoInputs');
    var infoDisplay = document.getElementById('infoDisplay');

    infoInputs.style.display = 'block';
    infoDisplay.style.display = 'none';
}

function lock() {
    dataBase = {
        info: info,
        movies: movies,
        games: games,
        shows: shows,
        songs: songs
    }
    
    var dataBaseString = JSON.stringify(dataBase);
    localStorage.setItem('dataBase', dataBaseString);

    var customLink = document.getElementById('customLink');
    customLink.textContent = 'https://yardenfalik.github.io/YourChildhoodVault?dataBase=' + dataBaseString;
}

function loadData() {
    var url = window.location.href;
    var dataBaseString = url.split('?dataBase=')[1];
    dataBase = JSON.parse(dataBaseString);

    movies = dataBase.movies;
    games = dataBase.games;
    shows = dataBase.shows;
    songs = dataBase.songs;
    info = dataBase.info;

    Displayitems('movie');
    Displayitems('game');
    Displayitems('show');
    Displayitems('song');
    displayInfo();
}

function clearData() {
    localStorage.removeItem('dataBase');
    movies = {};
    games = {};
    shows = {};
    songs = {};
    info = {};

    editItems('movie');
    editItems('game');
    editItems('show');
    editItems('song');
    editInfo();
}

function load() {
    if (window.location.href.includes('?dataBase=')) {
        loadData();
    }
    else if (localStorage.getItem('dataBase')) {
        dataBase = JSON.parse(localStorage.getItem('dataBase'));

        movies = dataBase.movies;
        games = dataBase.games;
        shows = dataBase.shows;
        songs = dataBase.songs;
        info = dataBase.info;

        Displayitems('movie');
        Displayitems('game');
        Displayitems('show');
        Displayitems('song');
        displayInfo();
    }
}

load();

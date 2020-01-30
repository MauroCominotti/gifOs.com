var matches;
var matches2;
var recorder;
var video;
var form;
var localStorage;
var gifFinished;
var logo;
//var generatedGif;
var urlCopiedGif;

window.onload = function () {
    
    logo = document.querySelector('.img1');
    logo.addEventListener('click', function () {
        document.getElementById('textInput').value = ""; //limpio el input de texto
        getSuggestions();
        
        for (let i = 0; i < matches.length; i++) {
            if (i < 6) {
                if (matches[i].classList.contains('d-none'))
                toggleDisplay(matches[i]);
            }
            else {
                if (!matches[i].classList.contains('d-none'))
                toggleDisplay(matches[i]);
            }
        }
        
    });
    
    var search = document.getElementById('btnSearch');
    search.addEventListener('click', function () {
        if (document.getElementById('textInput').value !== "") {
            getSearchResults();
            if (!matches[2].classList.contains('d-none')) {
                toggleDisplay(matches[2]);
                toggleDisplay(matches[3]);
                toggleDisplay(matches[4]);
                toggleDisplay(matches[5]);
                toggleDisplay(matches[6]);
            }
        }
        else {
            document.getElementById('textInput').placeholder = "Ingrese algo para buscar!!";
        }
    });
    
    matches = document.querySelectorAll('div.principalCol > div');
    document.getElementById('createGifs').addEventListener('click', function () {
        document.getElementById('textInput').value = "";//limpio el input de texto
        getSuggestions();
        const link = document.createElement('a');
        link.href = 'create-gifos.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    getMyGifs();
    document.getElementById('myGifs').addEventListener('click', function () {
        document.getElementById('textInput').value = "";//limpio el input de texto
        getSuggestions();
        if (!matches[6].classList.contains('d-none')) { //si estas en busquedas
            toggleDisplay(matches[6]);
            toggleDisplay(matches[8]);
            toggleDisplay(matches[1]);
        }
        else {
            for (i = 0; i < matches.length; i++) {
                if (i !== 7 && i !== 0 && i !== 6) { toggleDisplay(matches[i]) }
            };
        }
        
    });
    
    matches2 = document.querySelectorAll('div#makingGifs > div');
    
    
    
    document.getElementById('textInput').addEventListener('input', getSuggestions);
    
    var suggestions = document.querySelectorAll('div#suggestionBox div');
    suggestions.forEach(element => {
        element.addEventListener('click', function () { replaceSearch(element.textContent) })
    });
    
    getRandomResults();
    getTrendingResults();
    
    
    
    
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
function toggleDisplay(x) {
    if (x.classList.contains('d-none')) {
        x.classList.remove('fadeOut');
        x.classList.add('fadeInDown');
        setTimeout(function () { x.classList.remove('d-none') }, 1000);
    } else {
        x.classList.remove('fadeInDown');
        x.classList.add('fadeOut');
        setTimeout(function () { x.classList.add('d-none') }, 1000);
    }
}


function toggleDisplay2(x) {
    if (x.classList.contains('d-none')) {
        x.classList.remove('fadeOut');
        x.classList.add('fadeInOpacity');
        setTimeout(function () { x.classList.remove('d-none') }, 1000);
    } else {
        x.classList.remove('fadeInOpacity');
        x.classList.add('fadeOut');
        setTimeout(function () { x.classList.add('d-none') }, 1000);
    }
    
}


// CAMBIAR ESTILOS ------------------------------------------------------------------------------
function changeStylesheet1() {
    document.getElementById('styleSheets').href = 'styles/style2.css';
    logo[0].src = 'images/gifOF_logo.png';
    logo[1].src = 'images/gifOF_logo.png';
    logo[2].src = 'images/gifOF_logo.png';
};

function changeStylesheet2() {
    document.getElementById('styleSheets').href = 'styles/style1.css';
    logo[0].src = 'images/gifOF_logo_dark.png';
    logo[1].src = 'images/gifOF_logo_dark.png';
    logo[2].src = 'images/gifOF_logo_dark.png';
};

// MENU BUTTON ---------------------------------------------------------------------------------------
// show the button content
function showContent() {
    document.getElementById("dropdownBtn").classList.toggle("show");
};

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.btnTopics') && !event.target.matches('.btnIcon') && !event.target.matches('.downArrow') && document.getElementById("dropdownBtn").classList.contains("show")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// ___________________________________________________________________ GIPHY ___________________________________________________________________
//https://developers.giphy.com/docs/optional-settings/#rendition-guide
var apiKey = "&api_key=qZxHL1NNfanD7sSs4fFgauIXTeE8n2z3";
var apiKey2 = "&api_key=LIVDSRZULELA"
// Get search, random and trending gifs ---------------------------------------
function getSearchResults() {
    var text = document.getElementById('textInput');
    document.getElementById('suggestionBox').style = 'display:flex;';
    if (text != null && text.value !== "") {
        //if(text.value.includes('')){text.value = text.value.replace(/\s/g, '%20')};
        var query = "&q=" + text.value;
        var url = "https://api.giphy.com/v1/gifs/search?" + query + apiKey + "&limit=10";
        fetchGifs(url).then(data => {
            showSearchGifs(data)
        });
    }
};

var count = 0;
function getSuggestions() {
    var text = document.getElementById('textInput');
    if (!matches[6].classList.contains('d-none')) { document.getElementById('suggestionBox').style = 'display:flex;'; }
    else { document.getElementById('suggestionBox').style = 'display:block;'; }
    
    if (text != null && text.value !== "") {
        if (count === 0) { toggleDisplay2(document.getElementById('suggestionBox')); count = 1; }
        var query = "&tag=" + text.value;
        var url = "https://api.tenor.com/v1/search_suggestions?" + apiKey2 + query + "&limit=4"; //LA URL ES DE TENOR! CAMBIAR A GIPHY!!!
        for (let i = 0; i < 4; i++) {
            fetchGifs(url).then(data => {
                showSuggestions(data, i)
            });
        }
    }
    else {
        if (!document.getElementById('suggestionBox').classList.contains('d-none')) {
            toggleDisplay2(document.getElementById('suggestionBox'));
            count = 0;
        }
        
    }
}
function getRandomResults() {
    var url = "https://api.giphy.com/v1/gifs/random?" + apiKey;
    for (let i = 0; i < 4; i++) {
        fetchGifs(url).then(data => {
            showRandomGifs(data, i)
        });
    }
};
function getTrendingResults() {
    var url = "https://api.giphy.com/v1/gifs/trending?" + apiKey + "&limit=10";
    fetchGifs(url).then(data => {
        showTrendingGifs(data)
    });
};

function replaceSearch(text) {
    document.getElementById('textInput').value = text;
}

function getMyGifs() {
    
    for (let i = 0; i < 8; i++) {
        var storage = localStorage.getItem('mygif' + i);
        if (storage !== null) {
            storage = JSON.parse(storage);
            var gifID = "&ids=" + storage.id;
            var url = "https://api.giphy.com/v1/gifs?" + apiKey + gifID;
            fetchGifs(url).then(data => {
                showIDGifs(data, i)
            })
            .catch(() => {
                showIDGifs(null, i)
            });
        }
        else {
            showIDGifs(null, i)
        }
    }
}
// Fetch the gifs ---------------------------------------
function fetchGifs(url) {
    const found = fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.log(error)
        return error;
    });
    return found;
}

// Show search, random and trending gifs ---------------------------------------
//FALTA HACER QUE LOS ESPACIOS EN BLANCO SE PUEDAN MANDAR COMO %20 EN LA URL
function showSearchGifs(data) {
    let box;
    document.getElementById('showSearchTitle').textContent = document.getElementById('textInput').value + " (resultados)";
    for (i = 0; i < 10; i++) {
        box = document.getElementById('show_gif' + i);
        box.src = data.data[i].images.original.webp;
        console.log(data)
    }
};
function showSuggestions(data) {
    if (data.results.length !== 0) {
        for (i = 0; i < 4; i++) {
            suggestion = document.getElementById('suggestion' + i);
            suggestion.textContent = data.results[i];
        }
    }
    else {
        for (i = 0; i < 4; i++) {
            suggestion = document.getElementById('suggestion' + i);
            suggestion.textContent = "No hay resultados";
        }
    }
    
}
function showRandomGifs(data, i) {
    let box;
    title = document.getElementById('gifTitle' + i);
    title.textContent = "#" + data.data.title;
    box = document.getElementById('gif' + i);
    box.src = data.data.images.original.webp;
};
function showTrendingGifs(data) {
    let box;
    for (i = 0; i < 10; i++) {
        box = document.getElementById('gif' + (i + 4));
        if (data.data[i].images.original.webp !== "")
        box.src = data.data[i].images.original.webp;
        else
        box.src = data.data[i].images.original.url;
    }
};
function showIDGifs(data, i) {
    if (data !== null) {
        document.getElementById('mygif' + i).src = data.data[0].images.original.url;
    }
    else {
        document.getElementById('mygif' + i).src = "https://media0.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif?cid=790b7611d6930cac4c17e5da5fc76ea10d221f14cac19d58&rid=giphy.gif";
    }
}

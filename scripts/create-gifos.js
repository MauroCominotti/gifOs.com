var matches;
var matches2;
var recorder;
var video;
var form;
var localStorage;
var gifFinished;
var logo;
var generatedGif;
var urlCopiedGif;

window.onload = function () {
    
    matches = document.querySelectorAll('div.principalCol > div');
    
    //document.getElementById('arrowBack').addEventListener('click', function () { for (i = 0; i < matches.length; i++) { if (i !== 6) { toggleDisplay(matches[i]) } } });
    
    getMyGifs();
    
    matches2 = document.querySelectorAll('div#makingGifs > div');
    document.getElementById('startGif').addEventListener('click', function () {
        toggleDisplay(matches[1]);
        for (i = 0; i < matches2.length; i++) { toggleDisplay(matches2[i]) }
    });
    
    document.getElementById('arrowBack2').addEventListener('click', function () {
        
        toggleDisplay(matches[1]);

        if (!matches2[2].classList.contains('d-none')) //si estamos en 'un chequeo antes de empezar'
        {
            toggleDisplay(matches2[0]);
            toggleDisplay(matches2[1]);
            toggleDisplay(matches2[2]);
        }

        if(!document.getElementById('gifSent').classList.contains('d-none')){
            document.getElementById('generatingGif').classList.remove('d-none');
            document.getElementById('gifSent').classList.add('d-none');
            
            document.getElementById('btnCancel').classList.add('d-none');
            document.getElementById('btnStartRecording').classList.remove('d-none');
            document.querySelector('video').classList.remove('d-none');
            document.getElementById('sending-gif').classList.add('d-none');
            
        }

        //for (i = 0; i < matches2.length; i++) { toggleDisplay(matches2[i]) }
    });
    
    video = document.querySelector('video');
    
    document.getElementById('btnStartRecording').onclick = function () {
        this.classList.add('d-none');
        captureCamera(function (camera) {
            video.muted = true;
            video.volume = 0;
            video.srcObject = camera;
            
            recorder = RecordRTC(camera, {
                // type: 'video'
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
            
            
            recorder.startRecording();
            
            // release camera on stopRecording
            recorder.camera = camera;
            
            document.getElementById('btnStopRecording').classList.remove('d-none');
            document.getElementById('timerBlock').classList.remove('d-none');
            video.ontimeupdate = function () { document.getElementById('timerBlock').innerHTML = videoTime() };
        });
        
    };
    
    function addZ(n) {
        return (n < 10 ? '0' : '') + n;
    }
    
    function videoTime() {
        // https://elkardumen.blogspot.com/2016/01/convertir-milisegundos-formato.html
        seg = video.currentTime;
        if (seg > 60)
        seg = seg % 60;
        seg = seg.toFixed(2);
        
        var s = video.currentTime * 1000;
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        
        return (addZ(hrs) + ":" + addZ(mins) + ":" + addZ(seg));
    }
    
    document.getElementById('btnStopRecording').onclick = function () {
        this.classList.add('d-none');
        document.getElementById('btnRestartCapture').classList.remove('d-none');
        document.getElementById('btnSendGif').classList.remove('d-none');
        document.getElementById('progressBar').classList.remove('d-none');
        recorder.stopRecording(stopRecordingCallback);
    };
    
    document.getElementById('btnRestartCapture').addEventListener('click', restartCapture, false);
    document.getElementById('btnSendGif').addEventListener('click', sendGif, false);
    
    gifFinished = document.getElementById('finishedGif');
    gifFinished.addEventListener('load', function () {
        
        // localStorage = window.localStorage;
        // // localStorage.setItem("0", gifFinished.src);
        
        // var imgCanvas = document.createElement("canvas");
        
        
        // // Make sure canvas is as big as the picture
        // imgCanvas.width = gifFinished.width;
        // imgCanvas.height = gifFinished.height;
        
        // var imgContext = imgCanvas.getContext("2d");
        // // Draw image into canvas element
        // imgContext.drawImage(gifFinished, 0, 0, imgCanvas.width, imgCanvas.height);
        
        // // Get canvas contents as a data URL
        // var imgAsDataURL = imgCanvas.toDataURL("image/gif");
        // // imgAsDataURL = 'data:image/gif;' + imgAsDataURL.substring(15);
        // // imgAsDataURL = imgAsDataURL.substring(22);
        
        // // Save image into localStorage
        // try {
        //     // var randomnumber = Math.floor((Math.random()*100000000)+1)
        //     // var randomnumberstringify = String(randomnumber) 
        //     var randomnumberstringify ="mygif"+localStorage.length;
        //     localStorage.setItem(randomnumberstringify, imgAsDataURL);
        // }
        // catch (e) {
        //     console.log("Storage failed: " + e);
        // }
    });
    
    
    document.getElementById('copyGuif').addEventListener('click', copyUrl, false);
    document.getElementById('downloadGuif').addEventListener('click', downloadGuif, false);
    
    document.getElementById('btnDone').addEventListener('click', function () {
        // toggleDisplay(matches[0]);
        // toggleDisplay(matches[1]);
        
        // matches2[0].classList.remove('d-none');
        // matches2[1].classList.remove('d-none');
        // matches2[2].classList.add('d-none');
        // document.getElementById('generatingGif').classList.remove('d-none');
        // document.getElementById('gifSent').classList.add('d-none');
        
        // document.getElementById('btnCancel').classList.add('d-none');
        // document.getElementById('btnStartRecording').classList.remove('d-none');
        // document.querySelector('video').classList.remove('d-none');
        // document.getElementById('sending-gif').classList.add('d-none');
        
        const link = document.createElement('a');
        link.href = 'index.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    }, false);
    
    
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


// ___________________________________________________________________ GIPHY ___________________________________________________________________
//https://developers.giphy.com/docs/optional-settings/#rendition-guide
var apiKey = "&api_key=qZxHL1NNfanD7sSs4fFgauIXTeE8n2z3";
var apiKey2 = "&api_key=LIVDSRZULELA"
// Get search, random and trending gifs ---------------------------------------
function getSearchResults() {
    var text = document.getElementById('textInput');
    document.getElementById('suggestionBox').style = 'display:flex;';
    if (text != null && text.value !== "") {
        var query = "&q=" + text.value;
        var url = "http://api.giphy.com/v1/gifs/search?" + query + apiKey + "&limit=10";
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
    var url = "http://api.giphy.com/v1/gifs/random?" + apiKey;
    for (let i = 0; i < 4; i++) {
        fetchGifs(url).then(data => {
            showRandomGifs(data, i)
        });
    }
};
function getTrendingResults() {
    var url = "http://api.giphy.com/v1/gifs/trending?" + apiKey + "&limit=10";
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
            var url = "http://api.giphy.com/v1/gifs?" + apiKey + gifID;
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
//______________________________________________ VIDEO _____________________________________________________
//https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: { width: 1280, height: 720 } };

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function (camera) {
        video.srcObject = camera;
        video.onloadedmetadata = function (e) {
            video.play();
        };
        callback(camera);
        
    })
    .catch(function (err) { console.log(err.name + ": " + err.message); }) // always check for errors at the end.
}

function stopRecordingCallback() {
    // video.src = video.srcObject = null; Esto me da error al poner el src del video en null, para solucionar pongo un "#" en el src
    video.src = "#";
    video.muted = false;
    video.volume = 1;
    video.classList.add('d-none');
    
    gifFinished.classList.remove('d-none');
    gifFinished.src = URL.createObjectURL(recorder.getBlob());
    
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

function sendGif() {
    document.getElementById('btnRestartCapture').classList.add('d-none');
    gifFinished.classList.add('d-none');
    
    document.getElementById('btnStopRecording').classList.add('d-none');
    document.getElementById('btnSendGif').classList.add('d-none');
    document.getElementById('timerBlock').classList.add('d-none');
    document.getElementById('progressBar').classList.add('d-none');
    
    document.getElementById('btnCancel').classList.remove('d-none');
    document.getElementById('sending-gif').classList.remove('d-none');
    
    setTimeout(function(){ document.getElementById('gifSent').classList.remove('d-none'); document.getElementById('generatingGif').classList.add('d-none'); toggleDisplay(matches[1]);}, 5000)
    // var randomnumberstringify = "mygif" + localStorage.length;
    
    // try {
    //     form = new FormData();
    //     form.append('file', recorder.getBlob(), randomnumberstringify + '.gif');
    //     console.log(form.get('file'));
    
    //ACA GUARDO EL GIF GENERADO
    //generatedGif = form;
    
    //     fetch('https://upload.giphy.com/v1/gifs?' + apiKey, {
    //         method: 'POST',
    //         body: form
    //     })
    //         .then((response) => response.json()
    //         )
    //         .then((result) => {
    //             console.log('Success:', result);
    //             var data = { type: "gif", id: result.data.id }
    //             localStorage.setItem(randomnumberstringify, JSON.stringify(data));
    
    // aca va lo de actualizar las vistas y cargar de vuelta mis guifos
    //urlCopiedGif = result.data.source_image_url;
    
    
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
    // catch (e) {
    //     console.log("Form upload failed: " + e);
    // };
}

function restartCapture() {
    this.classList.add('d-none');
    video.classList.remove('d-none');
    gifFinished.classList.add('d-none');
    document.getElementById('btnStartRecording').classList.remove('d-none');
    document.getElementById('btnStopRecording').classList.add('d-none');
    document.getElementById('btnSendGif').classList.add('d-none');
    document.getElementById('timerBlock').classList.add('d-none');
    document.getElementById('progressBar').classList.add('d-none');
}


// CANCEL BUTTON
// https://medium.com/@nmariasdev/cancelar-promesas-en-javascript-8e757156dd64


//______________________________________________ DOWNLOAD GIF _____________________________________________________
//https://codepen.io/anon/pen/wadevN
// https://eric.blog/2019/01/12/how-to-download-a-gif-from-giphy/
function downloadGuif(){
    // const link = document.createElement('a');
    // link.href = 'https://i.giphy.com/media/QsPVastwBgV2ByqBLK/giphy.gif?cid=01e2c6ddeebfde10c875cc47ab8553fe56212d959439ea63&rid=giphy.gif';
    // link.download = 'download.gif';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

//______________________________________________ COPY URL TO GIF _____________________________________________________
//https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

function copyUrl() {
    /* Select the text field */
    urlCopiedGif.select();
    urlCopiedGif.setSelectionRange(0, 99999); /*For mobile devices*/
    
    /* Copy the text inside the text field */
    document.execCommand("copy");
}

//______________________________________________ PROGRESS BAR _____________________________________________________

// https://www.w3schools.com/howto/howto_js_progressbar.asp
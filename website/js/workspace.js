/*
    Object Game prototype
*/ 
function Game(name, description, imgURL, lastUpdated, files) {
    this.name = name; 
    this.description = description; 
    this.imgURL = imgURL; 
    this.lastUpdated = lastUpdated; 
    this.files = files;
}
/*
    Function to create a game amd save to the database
*/ 
function createGame() {
    let name = document.getElementById("projectName").value; 
    let description = document.getElementById("projectDesc").value; 
    let length = document.getElementById("projectImgUpload").files.length; 
    let currentTime = new Date();     
    let img = ""; 
    var file;
    if(length !== 0) {
        file = document.getElementById("projectImgUpload").files[0]; 
    }
    getSignedRequest(file, name, description, currentTime, createGameStep2); 
}

/*
    Function to change the settings of a game
*/ 
function updateSettings() {
    let name = document.getElementById("updateProjectName").value; 
    let description = document.getElementById("updateProjectDesc").value; 
    let length = document.getElementById("updateProjectImage").files.length; 
    let currentTime = new Date();     
    let img = ""; 
    var file;
    if(length !== 0) {
        file = document.getElementById("updateProjectImage").files[0]; 
    }
    getSignedRequest(file, name, description, currentTime, updateGameStep2, oldName); 
}

/*
    Funciton to load all games a user has
*/ 
function loadGames() {
    let xhr = new XMLHttpRequest(); 
    xhr.open('GET', '/game/allGames');
    xhr.setRequestHeader("Content-Type", "application/json");    
    
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText); 
            if(response != "No Games"){
                let games = []; 
                for(let i = 0; i < response.length; i++){
                    games[i] = {game_name: response[i].game_name, game_description:response[i].game_description, game_imgURL: response[i].game_imgURL, game_lastUpdated: response[i].game_lastUpdated };
                    
                    let template = `
                    <div class="card">
                    <img class="card-img-top" src="${games[i].game_imgURL}" alt="Card image cap">
                    <div class="card-block container">
                        <h4 class="card-title">${games[i].game_name}</h4>
                        <p class="card-text">${games[i].game_description}</p>
                        <a href="./editor?game=${games[i].game_name}" class="btn btn-sm btn-primary tgsmb10 mr-3">Open Project</a>
                        <button class="btn btn-sm btn-primary tgsmb10" data-toggle="modal" data-target="#settingModal" type="button">Project Settings</button>
                    </div>
                    <div class="card-footer text-muted">Last updated ${games[i].game_lastUpdated}</div>
                    </div>   
                    `;

                    let div = document.createElement('div');
                    let cards = document.getElementById("card-deck"); 
                    div.innerHTML = template; 
                    cards.appendChild(div);
                }         
            }
        }
    }
    xhr.send(); 
}

function getSignedRequest(file, name, description, currentTime, callback, oldName){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                let newGame = {game_name : name, description : description, imgURL : response.url, datetime : currentTime};  
                uploadFile(file, response.signedRequest, response.url, newGame, callback, oldName);
            }
            else{
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send();
}

function uploadFile(file, signedRequest, url, newGame, callback, oldName){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not upload file.');
            }
            else{
                callback(newGame, oldName);
            }
        }
    };
    xhr.send(file);
}

function updateGameStep2(newSettings, oldName){
    let xhr = new XMLHttpRequest(); 
    newSettings.new_name = newSettings.game_name;
    newSettings.game_name = oldName;
    xhr.open('POST', '/game/updateGameSettings');
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not create game.');
            }
        }
    };
    xhr.send(JSON.stringify(newSettings));
}

function createGameStep2(newGame, oldName) {
    let xhr = new XMLHttpRequest(); 
    xhr.open('POST', '/game/newGame');
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not create game.');
            }
            else{
                window.location = "./editor?game=" + newGame.game_name;
            }
        }
    };
    xhr.send(JSON.stringify(newGame));
}   
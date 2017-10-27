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

    if(length !== 0) {
        let file = document.getElementById("projectImgUpload").files[0]; 
        img = getSignedRequest(file); 
    }

    let newGame = {game_name : name, description : description, imgURL : img, datetime : currentTime};  
    createGameStep2(newGame);
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
            let games = []; 
            for(let i = 0; i < response.length; i++){
                games[i] = {game_name: response[i].game_name, game_description:response[i].game_description, game_imgURL: response[i].game_imgURL, game_lastUpdated: response[i].game_lastUpdated };
                
                let template = `
                <div class="card">
                <img class="card-img-top" src="${games[i].game_imgURL}" alt="Card image cap">
                <div class="card-block container">
                    <h4 class="card-title">${games[i].game_name}</h4>
                    <p class="card-text">Project Description: ${games[i].game_description}</p>
                    <a onclick="loadGameFiles('${games[i].game_name}')" class="btn btn-sm btn-primary tgsmb10 mr-3">Open Project</a>
                    <button class="btn btn-sm btn-primary tgsmb10" data-toggle="modal" data-target="#settingModal" type="button">Project Setting</button>
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
    xhr.send(); 
}

function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
                console.log(response.getSignedRequest);
                return response.getSignedRequest; 
            }
            else{
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send();
}

function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not upload file.');
            }else{
                createGameStep2(newGame);
            }
        }
    };
    xhr.send(file);
}

function createGameStep2(newGame) {
    let xhr = new XMLHttpRequest(); 
    xhr.open('POST', '/game/newGame');
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not create game.');
            }
        }
    };

    xhr.send(JSON.stringify(newGame));
}   

function loadGameFiles(gameName) {
    debugger;
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", '/game/getGame');

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not get game files.');
            }else{
                console.log(this.responseText);
            }
        }
    };

    xhr.send("game_name=" + gameName);
}

function editorSetup() {
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/typescript");
    editor.resize();
}

function saveContent() {
    let editor = ace.edit("editor");
    let content = editor.getValue(); 
}

function createFile() {
    let fileName = document.getElementById("fileName").value; 
    let listItemNode = document.createElement("button");
    listItemNode.type = "button";     
    listItemNode.className += "list-group-item";
    listItemNode.className += " text-left";
    listItemNode.onclick = setContentNewFile(fileName); 
    let textNode = document.createTextNode(fileName); 
    listItemNode.appendChild(textNode); 
    document.getElementById("fileList").appendChild(listItemNode); 
}

function setContentNewFile(fileName) {
    let editor = ace.edit("editor"); 
    let initialContent = "//" + fileName;
    editor.setValue(initialContent); 
}

function setContent(fileName) {
    let editor = ace.edit("editor"); 
}
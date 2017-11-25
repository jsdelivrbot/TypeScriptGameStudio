function verifyInputs(file, name, description, currentTime) {

    var imgSizeGood = false;
    var imgTypeGood = false;

    $("#projectImgSizeError").toggleClass("hidden");
    $("#projectImgTypeError").toggleClass("hidden");

    if(file.size <= 1024 * 1024 * 10){
        imgSizeGood = true;
    }
    else{
        $("#projectImgSizeError").toggleClass("hidden");
    }

    if((/\.(jpg|jpeg|png)$/i).test(file.name)){
        imgTypeGood = true;
    }
    else{
        $("#projectImgTypeError").toggleClass("hidden");
    }

    if(imgSizeGood && imgTypeGood){
        createGameStep1(file, name, description, currentTime); 
    }
}

/*
    Create a game and save to the database
*/ 
function createGame() {

    var name = document.getElementById("projectName").value; 
    var description = document.getElementById("projectDesc").value; 
    var length = document.getElementById("projectImgUpload").files.length; 
    var currentTime = new Date();     
    var img = ""; 
    var file;

    if(length !== 0) {
        file = document.getElementById("projectImgUpload").files[0]; 
    }

    //Verify the name and make sure the image specs are fine
    verifyInputs(file, name.trim(), description.trim(), currentTime); 

}

/*
    Load all games a user has
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
                        <a href="./editor?game=${games[i].game_name}" class="btn btn-sm tgsmb10 mr-3">Open Project</a>
                        <a class="btn btn-sm tgsmb10" data-toggle="modal" data-target="#settingModal" type="button">Project Settings</a>
                    </div>
                    <div class="card-footer text-muted">Last updated ${games[i].game_lastUpdated}</div>
                    </div>   
                    `;

                    let div = document.createElement('div');
                    div.className += "col-lg-4";
                    let cards = document.getElementById("card-deck"); 
                    div.innerHTML = template; 
                    cards.appendChild(div);
                }         
            }
        }
    }

    xhr.send(); 
}

/*
    Prepare a signed request to Amazon to upload the game's image.
*/
function createGameStep1(file, name, description, currentTime){
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){
            if(xhr.status === 200){
                
                const response = JSON.parse(xhr.responseText);        
                let newGame = {game_name : name, description : description, imgURL : response.url, datetime : currentTime};  

                //File has already been uploaded
                if(response.signedRequest == null){
                    createGameStep2(newGame)
                }
                else{
                    uploadFile(file, response.signedRequest, response.url, newGame);
                }
            }
            else{
                alert('Error. Could not upload game image. Please try again.');
            }
        }
    };

    xhr.send();
}

/*
    Execute the upload to Amazon
*/
function uploadFile(file, signedRequest, url, newGame){

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Error. Could not upload game image. Please try again.');
            }
            else{
                createGameStep2(newGame);
            }
        }
    };

    xhr.send(file);
}

/*
    After the game's image has been uploaded, we should create a new game
    in the database for the user and load the IDE once we receive a response
*/
function createGameStep2(newGame) {

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
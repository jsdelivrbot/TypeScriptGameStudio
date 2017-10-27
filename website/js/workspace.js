function Game(name, description, imgURL, lastUpdated, files) {
    this.name = name; 
    this.description = description; 
    this.imgURL = imgURL; 
    this.lastUpdated = lastUpdated; 
    this.files = files;
}

function createGame() {
    let name = document.getElementById("projectName").value; 
    let description = document.getElementById("projectDesc").value; 
    let length = document.getElementById("projectImgUpload").files.length; 
    let img = ""; 
    // if(length !== 0){
    //     img = document.getElementById("projectImgUpload").files; 
    // }
    let currentTime = new Date(); 

    let newGame = {game_name : name, description : description, imgURL : img, datetime : currentTime};

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
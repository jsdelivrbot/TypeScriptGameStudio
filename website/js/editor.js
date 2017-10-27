var currentGame;
var currentGameFiles = [];

$(document).ready(function(){

    /*
        Parse the query string to retrieve the name of the game being loaded.

        If there is no query string, redirect back to the account page.
    */

    currentGame = getParameterByName("game");

    /*
        TODO: perhaps do this more gracefully? Maybe show an error box
        and tell the user to return to the account page on a button click? Idk...

        At the very least, this should happen before any parts of the 
        DOM are loaded.
    */
    if(currentGame == null || currentGame == undefined){
        window.location = "./account";
    }
    else{
        loadGameFiles(currentGame);
    }
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function compile(){

    saveContent();

    var files = [{
        gfile_name : currentGameFiles[0].gfile_name,
        gfile_contents : ace.edit("editor").getValue()
    }];

    //Save the files to the user's account
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/game/compile");
    xhr.setRequestHeader("Content-Type", "application/json");

    var request = {
        contents : ace.edit("editor").getValue()
    };

    console.log(JSON.stringify(request));

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log("Success");
            }
            else{
                console.log("Error adding file")
            }
        }
    };
    xhr.send(JSON.stringify(request)); 
}

function loadGameFiles(gameName) {
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", '/game/getGame' + "?game_name=" + gameName);

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not get game files.');
            }else{

                if(xhr.response !== "None"){

                    //Load all the files into the DOM
                    var files = JSON.parse(xhr.response);
                    for (var i = 0; i < files.length; i++){

                        //Set the editor contents equal to the first files's
                        if(i == 0){
                            setContentFile(files[i].gfile_contents);
                        }
                        addFileFromAccount(files[i].gfile_name, files[i].gfile_contents);
                        currentGameFiles.push({gfile_name : files[i].gfile_name, gfile_contents : files[i].gfile_contents})
                    }
                    console.log(currentGameFiles);
                }
                else{
                    document.getElementById("editor").innerHTML = "Click the plus sign to the left to create a new file for your game!"
                }
            }
        }
    };

    xhr.send();
}

function editorSetup() {
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/typescript");
    editor.resize();
}

/*
    Save the contents of all the files to the server
*/
function saveContent() {
        
    console.log(ace.edit("editor").getValue());

    var files = [{
        gfile_name : currentGameFiles[0].gfile_name,
        gfile_contents : ace.edit("editor").getValue()
    }];

    //Save the files to the user's account
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/game/updateGameFiles");
    xhr.setRequestHeader("Content-Type", "application/json");

    var request = {
        game_name : currentGame,
        files : files
    };

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log("Success");
            }
            else{
                console.log("Error adding file")
            }
        }
    };
    xhr.send(JSON.stringify(request)); 

    /*    
    var files = [];

    //Iterate through all of the files for the current project
    for (var i = 0; i < currentGameFiles.length; i++){
        addFileFromAccount(currentGameFiles[i].gfile_name, currentGameFiles[i].gfile_contents);
        files.push({gfile_name : files[i].gfile_name, gfile_contents : files[i].gfile_contents})
    }
    */
}

function addFileFromAccount(name, contents){
    let listItemNode = document.createElement("button");
    listItemNode.type = "button";     
    listItemNode.className += "list-group-item";
    listItemNode.className += " text-left";
    let textNode = document.createTextNode(name); 
    listItemNode.appendChild(textNode); 
    document.getElementById("fileList").appendChild(listItemNode);
}

function createFile() {
    let fileName = document.getElementById("fileName").value; 
    let listItemNode = document.createElement("button");
    listItemNode.type = "button";     
    listItemNode.className += "list-group-item";
    listItemNode.className += " text-left";
    setContentNewFile(fileName); 
    let textNode = document.createTextNode(fileName); 
    listItemNode.appendChild(textNode); 
    document.getElementById("fileList").appendChild(listItemNode);

    //Send the new file off to the server to add to the user's account
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/game/addNewGameFile");
    xhr.setRequestHeader("Content-Type", "application/json");

    var game = {
        game_name : currentGame,
        file : {
            gfile_name : fileName,
            gfile_contents : "//" + fileName
        }
    };

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log("Success");
            }
            else{
                console.log("Error adding file")
            }
        }
    };
    xhr.send(JSON.stringify(game)); 
}

function setContentNewFile(fileName) {
    let editor = ace.edit("editor"); 
    let initialContent = "//" + fileName;
    editor.setValue(initialContent); 
    console.log("here");
}

function setContentFile(contents) {
    let editor = ace.edit("editor"); 
    editor.setValue(contents);
}
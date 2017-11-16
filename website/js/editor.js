var currentGame;
var currentGameFiles = [];
var activeFile;
let editor = ace.edit("editor"); 

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

/*
    Initial setup for the editor
*/
function editorSetup() {
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/typescript");
    editor.$blockScrolling =  Infinity;
    editor.setOptions({
        fontSize : "16pt"
    }); 
    editor.resize();
}

/*
    Retrieve a parameter from a query string. For use when loading the IDE
    and loading the proper games.
*/
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
        gfile_contents : editor.getValue()
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
            }
            else{

                if(xhr.response !== "None"){

                    //Load all the files into the DOM
                    var files = JSON.parse(xhr.response);
                    for (var i = 0; i < files.length; i++){

                        //Set the editor contents equal to the first files's
                        if(i == 0){
                            setContentFile(files[i].gfile_contents);
                            activeFile = files[i].gfile_name;
                        }

                        addFileToPage(files[i].gfile_name);
                        currentGameFiles[files[i].gfile_name] = files[i].gfile_contents;
                    }
                }
                else{
                    let initialContent = "//Click the plus sign to the left to add a new file to your project and start coding!";
                    editor.setValue(initialContent); 
                }
            }
        }
    };

    xhr.send();
}

/*
    Save the contents of all the files to the server
*/
function saveContent() {
    
    console.log(currentGameFiles);

    //Push the active file's contents to the currentGameFiles dictionary
    currentGameFiles[activeFile] = editor.getValue();

    var files = [];

    for(key in currentGameFiles){

        files.push({
            gfile_name : key,
            gfile_contents : currentGameFiles[key]
        });
    }

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
}

function switchActiveFile(name){

    console.log(name);

    if(activeFile != name){

        /*
            Do one last push to the currentGameFiles dictionary to 
            ensure the active file is up to date.
        */
        currentGameFiles[activeFile] = editor.getValue();

        //Swap the contents of the editor
        editor.setValue(currentGameFiles[name]);
        activeFile = name;
    }
}

function addFileToPage(fileName){

    let listItemNode = document.createElement("button");

    listItemNode.type = "button";     
    listItemNode.className += "list-group-item";
    listItemNode.className += " text-left";
    listItemNode.id += name;

    let textNode = document.createTextNode(fileName); 
    listItemNode.appendChild(textNode); 
    listItemNode.onclick = function(){
        switchActiveFile(fileName);
    }

    document.getElementById("fileList").appendChild(listItemNode);
}

function createFile() {

    let fileName = document.getElementById("fileName").value; 

    //Send the new file off to the server to add to the user's account
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/game/addNewGameFile");
    xhr.setRequestHeader("Content-Type", "application/json");

    var fileContents = "//" + fileName;

    var game = {
        game_name : currentGame,
        file : {
            gfile_name : fileName,
            gfile_contents : fileContents
        }
    };

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){

            if(xhr.status === 200){     

                currentGameFiles[fileName] = fileContents;
                addFileToPage(fileName);
                switchActiveFile(fileName);
            }
            else{
                console.log("Error adding file")
            }
        }
    };
    xhr.send(JSON.stringify(game)); 
}

function setContentNewFile(fileName) {
    let initialContent = "//" + fileName;
    editor.setValue(initialContent); 
}

function setContentFile(contents) {
    editor.setValue(contents);
}
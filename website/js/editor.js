var currentGame;
var currentGameFiles = [];
var activeFile;
let editor = ace.edit("editor"); 

$(document).ready(editorSetup());

//Remove game when run game modal is loaded and stop all audio
$("#runGameModal").on("hidden.bs.modal", function () {
    
    $("#runGameModalContent").empty();
    let sounds = document.getElementsByTagName('audio');
    for(let i = 0; i < sounds.length; i++){
        console.log(sounds[i]);
        sounds[i].remove();
    } 

    document.getElementById('gameScript').remove();
});

/*
    Initial setup for the editor that runs when the page loads. Also loads the game files into
    the editor
*/
function editorSetup() {

    /*
        Parse the query string to retrieve the name of the game being loaded.

        If there is no query string, redirect back to the account page.
    */
    currentGame = getParameterByName("game");

    if(currentGame == null || currentGame == undefined){

        alert("Please select a game from the account screen");
        window.location = "./account";
    }

    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/typescript");
    editor.$blockScrolling =  Infinity;
    editor.setOptions({
        fontSize : "12pt"
    }); 
    editor.resize();

    loadGameFiles(currentGame);
    loadResourceFiles();

    //Set the Project Name
    $(".site-title").text("TypeScript Game Studio - " + currentGame);

}

function compile(arg){

    saveContent('save');

    let files = [];

    for(key in currentGameFiles){

        files.push({
            gfile_name : key,
            gfile_contents : currentGameFiles[key]
        });
    }
    
    const xhr = new XMLHttpRequest();

    //Compile and run
    if(!arg){
        xhr.open('POST', "/game/compile");
        $("#compileLoad").toggleClass("load-gif");
    }
    //Publish game
    else{
        xhr.open('POST', "/game/publish");
        $("#publishLoad").toggleClass("load-gif");
    }

    //Save the files to the user's account
    xhr.setRequestHeader("Content-Type", "application/json");

    let request = {
        game_name : currentGame,
        contents : files
    };

    //console.log(JSON.stringify(request));

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){

            if(xhr.status === 200){
                
                let res = JSON.parse(xhr.response);

                if(res.error == 1){

                    if(!arg){
                        showPopup("compile");
                        $("#compileLoad").toggleClass("load-gif");                        
                    } 
                    else{
                        $("#publishLoad").toggleClass("load-gif");
                        showPopup("publish");
                    } 
                    
                    //TODO: DISPLAY COMPILOR ERROR ON PAGE
                    alert(res.contents);
                }
                else{

                    //Run the game in a window
                    if(!arg){
                        
                        $("#compileLoad").toggleClass("load-gif");

                        //Clear the contents of the modal
                        $("#runGameModalContent").empty();

                        //Create a new script element and add it to the page
                        let script = document.createElement('script');
                        script.type = "text/javascript";
                        script.id = "gameScript";
                        script.innerHTML = "(function(){" + res.contents + " runGame('runGameModalContent');}());";
                        document.body.appendChild(script);

                        //Run the game in a pop up window

                        //Show the game window
                        $("#runGameModal").modal('show');
                    }

                    else{

                        $("#publishLoad").toggleClass("load-gif");

                        if(res.error == 0){

                            let gameURL = assembleURL(res.game_ID);

                            $("#projectPublishURL").empty();
                            $("#projectPublishURL").val(gameURL);
                            $("#publishedGameModal").modal('show');
                        }
                        else{
                            alert("Error publishing game.")
                        }
                    }
                }
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

                    console.log(xhr.response);
                    //Load all the files into the DOM
                    let files = JSON.parse(xhr.response);

                    if(files != "noGame"){
                        for (let i = 0; i < files.length; i++){

                            //Set the editor contents equal to the first files's
                            if(i == 0){
                                editor.setValue(files[i].gfile_contents, 1);
                                activeFile = files[i].gfile_name;
                            }

                            addFileToPage(files[i].gfile_name);
                            currentGameFiles[files[i].gfile_name] = files[i].gfile_contents;
                        }
                    }
                    else{

                        //Game does not exist
                        alert("This game does not exist");
                        window.location = "./account";
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

function loadResourceFiles() {

    $("#resourceFileList").empty();

    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", '/account/getFiles');

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Could not get resource files.');
            }
            else{

                if(xhr.response !== "none"){

                    //Load all the files into the DOM
                    let files = JSON.parse(xhr.response);                    
                    //console.log(files);

                    for (let i = 0; i < files.length; i++){

                        addResourceToPage(files[i].file_name, files[i].file_url, files[i].file_type);
                    }
                }
                else{

                }
            }
        }
    };

    xhr.send();
}

/*
    Save the contents of all the files to the server
*/
function saveContent(id) {
    
    console.log(currentGameFiles);

    //Push the active file's contents to the currentGameFiles dictionary
    currentGameFiles[activeFile] = editor.getValue();

    let files = [];

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

    let request = {
        game_name : currentGame,
        date : new Date(),
        files : files
    };

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log("Success");
                showPopup(id);
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
        editor.setValue(currentGameFiles[name], 1);
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

    document.getElementById("gameFileList").appendChild(listItemNode);
}

function addResourceToPage(fileName, url, type){

    let template;

    if(type == "jpg" || type == 'png' || type == 'jpeg'){

        template =`
            <span>${fileName}</span>
            <img class="resourceFile" draggable=true data-url="${url}" src="${url}" alt="Image">
        `;
    } 
    else if(type == '.mp3' || type == '.ogg' || type == 'wav'){
        template =`
            <span class="resourceFile" data-url="${url}" draggable=true>${fileName}</span>
        `;
    }

    let div = document.createElement('div');
    div.className += "resc-item"
    div.innerHTML = template; 

    div.addEventListener("dragstart", function(ev){
        ev.dataTransfer.setData("text", $(this).find('.resourceFile').attr("data-url"));
    });

    document.getElementById("resourceFileList").appendChild(div);
}

function createFile() {

    let fileExtension = document.getElementById("fileExtension").options[document.getElementById("fileExtension").selectedIndex].getAttribute("name");
    let fileName = document.getElementById("fileName").value.trim() + fileExtension; 

    //Send the new file off to the server to add to the user's account
    let fileContents = "//" + fileName;

    let game = {
        game_name : currentGame,
        file : {
            gfile_name : fileName,
            gfile_contents : fileContents
        }
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/game/addNewGameFile");
    xhr.setRequestHeader("Content-Type", "application/json");

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

function uploadResourceFile(){

    const files = document.getElementById('file_upload').files;
    const file = files[0];

    $("#noFileError").addClass("hidden");

    if(file == null || file == undefined){
        $("#noFileError").toggleClass("hidden");
    }
    else{

        //TODO : HANDLE IMAGES

        verifyInputs({
            file : file
        }, function(){
            $('#uploadModal').modal('hide');
            loadResourceFiles();
        });
    }
}
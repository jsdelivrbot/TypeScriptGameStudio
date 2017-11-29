/*
    Display the old settings of the project being edited

    Also contains two event handlers for dealing with project settings functionalities.
    One for deleting and the other for editing.
*/
$("#settingsModal").on('show.bs.modal', function(event) {

    let button = $(event.relatedTarget);

    let name = button.data('name');
    let description = button.data('description');
    let modal = $(this);

    modal.find(".modal-body input[id='projectSettingsName']").val(name);
    modal.find(".modal-body textarea[id='projectSettingsDesc']").val(description);
    modal.find(".modal-footer a[id='submit-update']").attr("data-origName", name);
    modal.find(".modal-footer a[id='submit-delete']").attr("data-origName", name);

    /*
        Update project event handler
    */
    modal.find(".modal-footer a[id='submit-update']").on('click', function(){

        let settings = {
            origName : $(this).attr('data-origName'),
            name : $("#projectSettingsName").val(),
            description : $("#projectSettingsDesc").val(),
            file : document.getElementById("projectSettingsFile").files[0],
            dateTime : new Date()
        } 

        let nameGood, descriptionGood = false;

        $("#projectSettingsNoNameError").addClass("hidden");
        $("#projectSettingsNoDescriptionError").addClass("hidden");

        //Verify the user has entered a project name
        if(settings.name.length !== 0) nameGood = true;
        else $("#projectSettingsNoNameError").toggleClass("hidden");

        //Verify the user has entered a project description
        if(settings.description.length !== 0) descriptionGood = true;
        else $("#projectSettingsNoDescriptionError").toggleClass("hidden");

        if(nameGood && descriptionGood){
            if(settings.file !== undefined){
                verifyInputs(settings, submitNewProjectSettings);
            }
            else{
                submitNewProjectSettings(settings);
            }
        }

    });

    /*
        Delete project event handler
    */
    modal.find(".modal-footer a[id='submit-delete']").on('click', function(){
        console.log($(this).attr('data-origName'));
        deleteProject($(this).attr('data-origName'), $(this));
    });
});

/*==============

    Page General Functions

================*/

/*
    Verify the image's size and type are okay for upload.  
*/
function verifyInputs(settings, callback) {

    let imgSizeGood = false;
    let imgTypeGood = false;

    $("#projectImgSizeError").addClass("hidden");
    $("#projectImgTypeError").addClass("hidden");

    //Verify the uploaded image is less than 10 MB
    if(settings.file.size <= 1024 * 1024 * 10) imgSizeGood = true;
    else $("#projectImgSizeError").toggleClass("hidden");

    //Verify the uploaded image is of types jpg, jpeg, or png
    if((/\.(jpg|jpeg|png)$/i).test(settings.file.name)) imgTypeGood = true;
    else $("#projectImgTypeError").toggleClass("hidden");

    if(imgSizeGood && imgTypeGood){
        signS3(settings, callback); 
    }
}

/*
    Load all of a user's games onto the page
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
                let cards = document.getElementById("card-deck"); 

                for(let i = 0; i < response.length; i++){

                    //Prepare the date to be shown in a readible fashion
                    let newDate = new Date(response[i].game_lastUpdated);

                    games[i] = {game_name: response[i].game_name, game_description:response[i].game_description, game_imgURL: response[i].game_imgURL, game_lastUpdated: newDate };
                    
                    let template = `
                    <div class="card">
                    <img class="card-img-top" src="${games[i].game_imgURL}" alt="Card image cap">
                    <div class="card-block container">
                        <h4 class="card-title">${games[i].game_name}</h4>
                        <p class="card-text">${games[i].game_description}</p>
                        <a href="./editor?game=${games[i].game_name}" class="btn btn-sm tgsmb10 mr-3 load-project-btn">Open Project</a>
                        <a class="btn btn-sm tgsmb10" data-toggle="modal" data-target="#settingsModal" data-name="${games[i].game_name}" data-description="${games[i].game_description}" type="button">Project Settings</a>
                    </div>
                    <div class="card-footer text-muted">Last updated ${games[i].game_lastUpdated}</div>
                    </div>   
                    `;

                    let div = document.createElement('div');
                    div.className += "col-lg-4";
                    div.className += " card-container"
                    div.setAttribute("projectName", games[i].game_name);
                    div.innerHTML = template; 
                    cards.appendChild(div);
                }         
            }
        }
    }

    xhr.send(); 
}

/*
    Get a signed request to Amazon
*/
function signS3(settings, callback) { 

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${settings.file.name}&file-type=${settings.file.type}`);

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){

            if(xhr.status === 200){
                
                const response = JSON.parse(xhr.responseText);        
                settings.imgURL = response.url;

                //File has already been uploaded
                if(response.signedRequest == null){
                    callback(settings)
                }
                else{
                    uploadFile(response.signedRequest, response.url, settings, callback);
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
function uploadFile(signedRequest, url, game_settings, callback){

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){

            if(xhr.status !== 200){

                alert('Error. Could not upload game image. Please try again.');
            
            }
            else{
                callback(game_settings);
            }
        }
    };

    xhr.send(game_settings.file);
}

/*==============

    Functions involved in changing project settings and project deletion

================*/

/*
    Submit new project settings to the server
*/
function submitNewProjectSettings(settings) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/game/updateSettings");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){

            if(xhr.status === 200){
                console.log("Success");

                let card =  $(".card-container[projectname='" + settings.origName + "']");

                //Refresh the project card with the new settings
                card.find(".card-title").text(settings.name);
                card.find(".card-text").text(settings.description);
                card.find(".load-project-btn").attr("href", "./editor?game=" + settings.name);
                card.find(".card-img-top").attr("src", settings.imgURL);

                $('#settingsModal').modal('hide');

            }
            else{
                console.log("Error adding file")
            }
        }
    };
    xhr.send(JSON.stringify(settings)); 
}

function deleteProject(name, modal) {
    
    //Save the files to the user's account
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/game/updateGameFiles");
    xhr.setRequestHeader("Content-Type", "application/json");

    let request = {
        game_name : name,
        files : null
    };

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){

            if(xhr.status === 200){

                console.log("Success");
                $(".card-container[projectname='" + name + "']").remove();
            }
            else{
                console.log("Error adding file")
            }
        }
    };
    xhr.send(JSON.stringify(request)); 
}

/*==============

    Functions involved in creating a new game project

================*/

/*
    Initiate the game project creation
*/ 
function createGame() {

    let inputName = document.getElementById("projectName").value,
        inputDescription = document.getElementById("projectDesc").value;

    let nameGood, descriptionGood, fileGood = false

    $("#projectNoNameError").addClass("hidden");
    $("#projectNoDescriptionError").addClass("hidden");
    $("#projectNoImgError").addClass("hidden");

    //Verify the user has entered a project name
    if(inputName.length !== 0) nameGood = true;
    else $("#projectNoNameError").toggleClass("hidden");

    //Verify the user has entered a project description
    if(inputDescription.length !== 0) descriptionGood = true;
    else $("#projectNoDescriptionError").toggleClass("hidden");

    //Verify the user has uploaded a project image
    if(document.getElementById("projectImgUpload").files.length !== 0) fileGood = true;
    else $("#projectNoImgError").toggleClass("hidden");

    if(nameGood && descriptionGood && fileGood){

        let settings = {
            game_name : inputName,
            description : inputDescription,
            file : document.getElementById("projectImgUpload").files[0],
            datetime : new Date()
        } 

        verifyInputs(settings, submitNewGame); 
    }
}

/*
    After the game's image has been uploaded, we should create a new game
    in the database for the user and load the IDE once we receive a response
*/
function submitNewGame(newGame) {

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
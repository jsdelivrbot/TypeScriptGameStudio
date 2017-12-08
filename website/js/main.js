function showPopup(id){
    var popup = document.getElementById(id + "Popup");
    popup.classList.toggle("show");
}

$(".popup").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){ 
    console.log(e); 
});

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

function assembleURL(game_ID){

    if(game_ID == null) return null;
    else if(window.location.hostname == "localhost") return "http://localhost:5000/play?id=" + game_ID;
    else return "https://typescript-game-studio.herokuapp.com/play?id=" + game_ID;
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


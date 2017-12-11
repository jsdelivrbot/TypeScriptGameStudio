$(document).ready(playerSetup());

/*
    Initial setup for the editor that runs when the page loads. Also loads the game files into
    the editor
*/
function playerSetup() {

    /*
        Parse the query string to retrieve the name of the game being loaded.

        If there is no query string, redirect back to the account page.
    */
    game = getParameterByName("id");

    if(game == null || game == undefined){
        playerError("No game ID found. Please use generated game URL to load a game");
    }
    else{  
        getGame(game);
    }
}

/*
    Get the game code from the server

    @param {string} id - the game's ID
*/
function getGame(id){

    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", '/game/loadGame' + "?game_ID=" + id);

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){

            if(xhr.status !== 200){
                playerError("Error loading game. Please try again later.")
            }
            else{

                let response = JSON.parse(xhr.response);
                
                if(response.error == 0){

                    //Clear the contents of the modal
                    $("#game-player").empty();

                    $("#game-title").text(response.game_name);

                    //Create a new script element and add it to the page
                    let script = document.createElement('script');
                    script.type = "text/javascript";
                    script.innerHTML = response.game_contents;
                    document.body.appendChild(script);

                    //Run the game in the player
                    runGame('game-player');
                }
                else{
                    playerError(response.errorText);
                }
            }
        }
    };

    xhr.send();
}
/*
    Display an error to the user
    
    @param {string} error - error to display
*/
function playerError(error){
    $("#player-container").text(error);
}
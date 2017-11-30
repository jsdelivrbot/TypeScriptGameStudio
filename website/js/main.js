function showPopup(id){
    var popup = document.getElementById(id + "Popup");
    popup.classList.toggle("show");
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

function assembleURL(game_ID){

    if(game_ID == null) return null;
    else if(window.location.hostname == "localhost") return "http://localhost:5000/play?id=" + game_ID;
    else return "https://typescript-game-studio.herokuapp.com/play?id=" + game_ID;
}

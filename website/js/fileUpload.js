/*
    Execute the upload to Amazon
*/
function uploadRegFile(file, signedRequest, url){

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                alert('Error. Could not upload game image. Please try again.');
            }
            else{
                alert("File uploaded");
            }
        }
    };

    xhr.send(file);
}
/*
    Function to get the temporary signed request from the app.
    If request successful, continue to upload the file using this signed
    request.
*/
function getSignedRequest(file){

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                if(response.signedRequest == null){
                    alert('File already uploaded');
                }
                else{
                    uploadRegFile(file, response.signedRequest, response.url);
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
    Function called when file input updated. If there is a file selected, then
    start upload procedure by asking for a signed request from the app.
*/
function initUpload(){
    const files = document.getElementById('file_upload').files;
    const file = files[0];
    if(file == null){
        return alert('No file selected.');
    }
    getSignedRequest(file);
}

function showUploadSucessMsg() {
    document.getElementById('file_upload').value = ""; 
    document.getElementById('file_upload_successMsg').style.display = "block"; 
}

function hideUploadSucessMsg() {
    document.getElementById('file_upload_successMsg').style.display = "none";     
}

function updateFileList(fileNamePara) {
    let fileName = fileNamePara;  
    let listItemNode = document.createElement("a");
    listItemNode.className += "list-group-item";
    listItemNode.className += " text-left";
    let textNode = document.createTextNode(fileName); 
    listItemNode.appendChild(textNode); 
    document.getElementById("fileList").appendChild(listItemNode); 
}
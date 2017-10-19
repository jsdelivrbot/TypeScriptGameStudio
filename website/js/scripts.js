
/*
	Retrieve a list of an account's uploaded files from server endpoint.
	Display them on the page.
*/
function getFiles(){

	const xhr = new XMLHttpRequest();
  	xhr.open('GET', '/accountFiles');

  	xhr.onreadystatechange = () => {

	    if(xhr.readyState === 4){

			if(xhr.status === 200){

				const response = JSON.parse(xhr.responseText);

				response.forEach(function(entry){

					var files = $("<span />")
						.text(JSON.stringify(entry));

					var image = $("<img />")
				   		.attr("src", entry.url)
				   		.attr("height", 100)
				   		.attr("width", 100)
				   		.attr("crossorigin", "anonymous");

				   	files.append(image);
				   	files.append("<br>");
				   	files.appendTo($("#files"))
				});

				$("img").on("click", function(){
					console.log($(this).attr("src"));
					loadGame($(this).attr("src"));
				});
			}
	    	else{
	    		alert('Could not reach endpoint');
	    	}
    	}
  };
  xhr.send();
}

/*
	Retrieve the id, email, and display name of the account from the server.
	Display them on the page.
*/
function getAccountInfo(){

	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/accountData');

	xhr.onreadystatechange = () => {

		if(xhr.readyState === 4){

			if(xhr.status === 200){

				const response = JSON.parse(xhr.responseText);

				response.forEach(function(entry){

					var info = $("<span />")
						.text(JSON.stringify(entry));					

				   	info.appendTo($("#account-info"))
				});
			}
			else{
				alert('Could not reach endpoint');
			}
		}
	};
	xhr.send();
}

/*
	Function to carry out the actual PUT request to S3 using the signed request from the app.
*/
function uploadFile(file, signedRequest, url){
	
	const xhr = new XMLHttpRequest();
	xhr.open('PUT', signedRequest);
	
	xhr.onreadystatechange = () => {

		if(xhr.readyState === 4){

			if(xhr.status !== 200){
				alert('Could not upload file.');
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
				uploadFile(file, response.signedRequest, response.url);
			}
			else{
				alert('Could not get signed URL.');
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

	const files = document.getElementById('file-input').files;
	const file = files[0];
	
	if(file == null){
		return alert('No file selected.');
	}
	getSignedRequest(file);
}

/*
	Bind listeners when the page loads.
*/
(() => {
    document.getElementById('file-input').onchange = initUpload;
    getAccountInfo();
    getFiles();
})();


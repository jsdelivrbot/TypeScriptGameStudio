function editorSetup() {
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/typescript");
    editor.resize();
}

function saveContent() {
    let editor = ace.edit("editor");
    let content = editor.getValue(); 
}

function createFile() {
    let fileName = document.getElementById("fileName").value; 
    let listItemNode = document.createElement("button");
    listItemNode.type = "button";     
    listItemNode.className += "list-group-item";
    listItemNode.className += " text-left";
    listItemNode.onclick = setContentNewFile(fileName); 
    let textNode = document.createTextNode(fileName); 
    listItemNode.appendChild(textNode); 
    document.getElementById("fileList").appendChild(listItemNode); 
}

function setContentNewFile(fileName) {
    let editor = ace.edit("editor"); 
    let initialContent = "//" + fileName;
    editor.setValue(initialContent); 
}

function setContent(fileName) {
    let editor = ace.edit("editor"); 
}
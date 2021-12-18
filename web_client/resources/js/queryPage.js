var user = sessionStorage.getItem("user");
var id = sessionStorage.getItem("id");
const TIMEOUT = 300000;
var timeout = window.setTimeout(on_logout, TIMEOUT);
function diplayUsername(){
    document.getElementById("username").innerHTML = user;
}

const Http = new XMLHttpRequest();

async function httprequestquery() {
    res = Http.open("GET", 'http://localhost:3001/'+ id + '/' + document.getElementById("query-entry").value);
    Http.responseType = 'json';
    Http.send();

    Http.onreadystatechange = (e) => {
        if(Http.readyState == XMLHttpRequest.DONE && (Http.status == 400 || Http.response.length == 0)){
            alert("No hay resultados para su busqueda");
        }
        if(Http.readyState == XMLHttpRequest.DONE && Http.status >= 200 && Http.status < 400){
            createTable(Http.response);
           
        }     
        window.clearTimeout(timeout);
        timeout = window.setTimeout(on_logout,TIMEOUT);
    }
}
async function on_logout(){
    window.location.href = "../../index.html";
    sessionStorage.removeItem("user");
}

function createTable(response) {
    console.log(response)
    var div = document.getElementById("welcome-message-div");
    var prevTable = document.getElementById("query-table");

    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");

    var keys = Object.keys(response[0]);

    var row = document.createElement("tr");
    

    for(var i=0; i < keys.length; i++){
        var texto = document.createTextNode(keys[i]);
        var celda = document.createElement("th");

        celda.appendChild(texto);
        row.appendChild(celda);
    }
    tableBody.appendChild(row);


    for(var i=0; i < Object.keys(response).length; i++){
        var row = document.createElement("tr");

        for(var j=0; j <  Object.keys(response[0]).length; j++){
            var celda = document.createElement("td");
            var texto = document.createTextNode(Object.values(response[i])[j]);

            celda.appendChild(texto);
            row.appendChild(celda);
        }

        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);

    if(prevTable != undefined) {
        prevTable.replaceWith(table);
    } else {
        div.replaceWith(table);
    }

    table.id = "query-table"
}


const Http = new XMLHttpRequest();
var user;

async function httprequestlogin() {
    var usuario = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value; 
    sessionStorage.setItem("user", usuario);
    sessionStorage.setItem("id", password);

    res = Http.open("GET", 'http://localhost:3001/' + password);
    Http.responseType = 'json';
    Http.send();

    

    Http.onreadystatechange = (e) => {
        if(Http.readyState == XMLHttpRequest.DONE && Http.status >= 200 && Http.status < 400){
            if(Http.response.username == usuario){
                console.log(Http.response)
                user = usuario;
                window.location.href = "resources/pages/queryPage.html";

            }
        }

    }
}


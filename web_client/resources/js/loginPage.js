const Http = new XMLHttpRequest();

async function httprequestlogin() {
    var usuario = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value; 
    sessionStorage.setItem("user", usuario);
    sessionStorage.setItem("id", password);

    res = Http.open("GET", 'http://localhost:3001/' + password + '?username=' + usuario);
    Http.responseType = 'json';
    Http.send();

    

    Http.onreadystatechange = (e) => {
        if(Http.readyState == XMLHttpRequest.DONE && Http.status != 200){
            alert("Datos de inicio de sesión incorrectos")
        }
        else if(Http.readyState == XMLHttpRequest.DONE && Http.status == 200){
            window.location.href = "resources/pages/queryPage.html";
        }

    }
}


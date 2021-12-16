async function on_logout(){
    window.location.href = "../../index.html";
    sessionStorage.removeItem("user");
}

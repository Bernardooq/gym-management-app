document.addEventListener("DOMContentLoaded", function() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || user.type !== "user") {
        window.location.href = "/";
    }
    const jwt = localStorage.getItem("token"); 

    // Hacer una solicitud para verificar el token JWT
    fetch('http://localhost:3000/users/verifyJWT', {
        method: 'POST', 
        headers: { 'Authorization': jwt, }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Si hay un error en la verificación del token JWT, redirigir al usuario a la página de inicio de sesión
            window.location.href = '/';
        }
    })
    .catch(error => {
        window.location.href = '/';
    });
});
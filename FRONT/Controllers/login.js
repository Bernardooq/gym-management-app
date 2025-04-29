document.addEventListener('DOMContentLoaded', function() {
    console.log('login.js loaded');
    // Obtener referencias a los elementos del DOM
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');
    const lottie = document.getElementById('animation');

    // Agregar evento click al botón de login
    loginButton.addEventListener('click', function() {
        console.log('loginButton clicked');
        // Obtener los valores de los campos de usuario y contraseña
        let email = usernameInput.value;
        let password = passwordInput.value;

        // Verificar si los campos están vacíos
        if (email === '' || password === '') {
            lottie.style.display = 'block';
            setTimeout(() => {
                alert('Por favor, rellene todos los campos');
                lottie.style.display = 'none';
            }, 1000);
            return; // Detener la ejecución si falta algún campo
        }

        // Crear solicitud fetch para almacenar usuario en sessionStorage y JWT en localStorage
        fetch('http://localhost:3000/users/login', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })   
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                lottie.style.display = 'block';
                setTimeout(() => {
                    alert(data.error);
                    lottie.style.display = 'none';
                }, 1000);
                return;
            } else {
                sessionStorage.setItem('user', JSON.stringify(data)); // Almacenar los datos del usuario en sessionStorage
                const usertype = data.type; // Obtener el tipo de usuario directamente del objeto data
                console.log(data);

                // Fetch para obtener el JWT
                fetch('http://localhost:3000/users/loginJWT', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })   
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        lottie.style.display = 'block';
                        setTimeout(() => {
                            alert(data.error);
                            lottie.style.display = 'none';
                        }, 1000);
                        return;
                    } else {
                        console.log(data);  
                        localStorage.setItem('token', data.token);  

                        // Redirigir al usuario según el tipo de usuario
                        if (usertype === "user") {
                            window.location.href = '/home';
                        } else {
                            window.location.href = '/homeCoach';
                        }
                    }
                });
            }
        })
        .catch(error => {
            lottie.style.display = 'block';
            setTimeout(() => {
                alert(error);
                lottie.style.display = 'none';
            }, 1000);
        });
    });
});

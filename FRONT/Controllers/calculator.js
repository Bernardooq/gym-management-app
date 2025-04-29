document.addEventListener("DOMContentLoaded", function() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    
    fetch("http://localhost:3000/users/find/" + user.file)
        .then(response => response.json())
        .then(userData => {
            console.log(userData);
            sessionStorage.setItem('user', JSON.stringify(userData));
            loadData(userData);
        })
        .catch(error => {
            console.error("Error al obtener los datos del usuario:", error);
        });

    function loadData(user) {
        // Cargar en los inputs los datos del usuario
        document.getElementById("age").value = user.progress[user.progress.length - 1].age;
        document.getElementById("height").value = user.progress[user.progress.length - 1].height;
        document.getElementById("weight").value = user.progress[user.progress.length - 1].weight;
    }


    const botonCalculate = document.getElementById("calculate");
    botonCalculate.addEventListener("click", function() {
        const age = parseInt(document.getElementById("age").value) || 0;
        const gender = document.getElementById("gender").value;
        const height = parseFloat(document.getElementById("height").value) || 0;
        const weight = parseFloat(document.getElementById("weight").value) || 0;
        const activity = parseFloat(document.getElementById("activity").value) || 1; 

        // Validar que todos los campos requeridos estén completos
        if (!age || !gender || !height || !weight || !activity) {
            alert("Faltan datos para calcular");
            return; 
        }

        let tbm = (10 * weight) + (6.25 * height) - (5 * age);
        if (gender == "Masculino") {
            tbm = tbm + 5;
        } else if (gender == "Femenino") {
            tbm = tbm - 161;
        }

        let bmrresult = document.getElementById("bmr");
        bmrresult.removeAttribute("disabled");
        tmbmantained = tbm * activity;
        tbmdeficit = tmbmantained - 350
        tmbsuperavite = tmbmantained + 350;
        bmrresult.value = "TMB: " + tbm.toFixed(2) + " kcal" + "\n" + "TMB mantenimiento: " + tmbmantained.toFixed(2) + " kcal" + "\n" + "TMB deficit: " + tbmdeficit.toFixed(2) + " kcal" + "\n" + "TMB superavit: " + tmbsuperavite.toFixed(2) + " kcal";
        bmrresult.setAttribute("disabled", "disabled");
        
        // Indice de masa corporal
        let imc = weight / ((height / 100) * (height / 100));
        let imcresult = document.getElementById("bmi");
        imcresult.removeAttribute("disabled");
        imcresult.value = imc.toFixed(2) + " kg/m²";
    });

    const botonReset = document.getElementById("reset");
    botonReset.addEventListener("click", function() {
        document.getElementById("age").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("height").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("activity").value = "";


        const bmrresult = document.getElementById("bmr");
        const imcresult = document.getElementById("bmi");
        bmrresult.value = "";
        bmrresult.setAttribute("disabled", "disabled");
        imcresult.value = "";
        imcresult.setAttribute("disabled", "disabled");
    });

  });
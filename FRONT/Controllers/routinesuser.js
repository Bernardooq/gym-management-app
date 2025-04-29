document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    let lottie = document.getElementById("animation");
    
    fetch("http://localhost:3000/users/find/" + user.file)
        .then(response => response.json())
        .then(userData => {
            console.log(userData);
            sessionStorage.setItem('user', JSON.stringify(userData));
            lottie.style.display = "block";
            setTimeout(() => {
                displayStudentRoutines(userData.routine); // Mostrar rutinas del usuario
                lottie.style.display = "none";
            }, 500);
        })
        .catch(error => {
            console.error("Error al obtener los datos del usuario:", error);
        });
});

function displayStudentRoutines(routines) {
    const div = document.getElementById("routinediv");

    if (routines.length === 0) {
        const p = document.createElement("p");
        p.textContent = "No hay rutinas disponibles";
        div.appendChild(p);
        return;
    }

    let currentRow;
    
    routines.forEach((routine, index) => {
        if (index % 2 === 0) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row", "row-cols-1", "row-cols-lg-2", "g-3");
        }
        const cardCol = document.createElement("div");
        cardCol.classList.add("col-lg-6", "md-3");

        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "text-dark");
        card.style.backgroundColor = "rgba(137, 43, 226, 0.785)";
        card.style.borderColor = "black";

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.textContent = routine.name;
        cardHeader.style.fontSize ="25px";
        cardHeader.style.color = "white";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const exerciseList = document.createElement("ul");
        exerciseList.classList.add("list-group", "list-group-flush");

        
        routine.exercises.forEach(exercise => {
            const exerciseItem = document.createElement("li");
            exerciseItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            
            const exerciseName = document.createElement("span");
            exerciseName.textContent = exercise.exercise;
            exerciseName.style.color = "white";

            const exerciseDetails = document.createElement("span");
            exerciseDetails.textContent = `Series: ${exercise.sets}, Reps: ${exercise.reps}`;
            exerciseDetails.style.color = "white";

            const link = document.createElement("a");
            link.href = exercise.link;
            link.textContent = "Ver más"; // Agregar texto al enlace
            link.style.color = "white";

            exerciseItem.style.backgroundColor = "rgba(137, 43, 226, 0.785)";
            
            exerciseItem.appendChild(exerciseName);
            exerciseItem.appendChild(exerciseDetails);
            exerciseItem.appendChild(link); // Agregar el enlace al elemento de la lista
            exerciseList.appendChild(exerciseItem);
        });

        cardBody.appendChild(exerciseList);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardCol.appendChild(card);

        currentRow.appendChild(cardCol);

        if(index % 2 === 1 || index === routines.length - 1){
            div.appendChild(currentRow);
        }
        
    });
}

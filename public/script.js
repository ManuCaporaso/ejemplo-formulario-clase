const url = "../assets/docs/students.json";
const overlay = document.querySelector('.overlay');
const input = document.getElementById('input');
const list = document.querySelector('.list');

let studentsArrayObj = [];
let studentsNames = [];

// Función para cargar los nombres desde el archivo JSON
async function getStudents() {
    overlay.classList.add('active');
    try {
        const response = await fetch(url);
        studentsArrayObj = await response.json();

        // Extrae los nombres del array de objetos
        studentsNames = studentsArrayObj.map(student => student.nombre);

        // Ordena los nombres alfabéticamente
        studentsNames.sort();
    } catch (error) {
        console.error('Error al cargar los nombres:', error);
    } finally {
        overlay.classList.remove('active');
    }
}

// Función para mostrar las sugerencias de autocompletado
function showSuggestions(value) {
    // Cierra cualquier lista de autocompletado previa
    closeAllLists();

    if (!value) return;

    // Crea un contenedor para las opciones de autocompletado
    const suggestions = studentsNames.filter(name =>
        name.toLowerCase().startsWith(value.toLowerCase())
    );

    if (suggestions.length === 0) return;

    suggestions.forEach(suggestion => {
        const item = document.createElement('li');
        item.textContent = suggestion;
        item.addEventListener('click', () => {
            input.value = suggestion;
            closeAllLists();
        });
        list.appendChild(item);
    });
}

// Función para cerrar todas las listas de autocompletado
function closeAllLists() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// Maneja el evento de entrada para mostrar sugerencias
input.addEventListener('input', function() {
    showSuggestions(this.value);
});

// Maneja el evento de clic para cerrar la lista si el usuario hace clic fuera del formulario
document.addEventListener('click', function(e) {
    if (e.target !== input) {
        closeAllLists();
    }
});

// Inicializa la carga de datos
getStudents();

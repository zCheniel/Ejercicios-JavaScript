// Variables para almacenar los datos
const alumnos = [];
let promedioMatematicas = 0;
let promedioFisica = 0;
let promedioProgramacion = 0;
let aprobadosMatematicas = 0;
let aprobadosFisica = 0;
let aprobadosProgramacion = 0;
let reprobadosMatematicas = 0;
let reprobadosFisica = 0;
let reprobadosProgramacion = 0;
let aprobadosTodas = 0;
let aprobadosUnaMateria = 0;
let aprobadosDosMaterias = 0;
let notaMaximaMatematicas = 0;
let notaMaximaFisica = 0;
let notaMaximaProgramacion = 0;

// Función para calcular promedio
function calcularPromedio(notas) {
    const suma = notas.reduce((total, nota) => total + nota, 0);
    return suma / notas.length;
}

// Función para actualizar los resultados
function actualizarResultados() {
    // Calcula los promedios
    promedioMatematicas = calcularPromedio(alumnos.map(alumno => alumno.matematicas));
    promedioFisica = calcularPromedio(alumnos.map(alumno => alumno.fisica));
    promedioProgramacion = calcularPromedio(alumnos.map(alumno => alumno.programacion));

    // Calcula el número de aprobados y reprobados en cada materia
    aprobadosMatematicas = alumnos.filter(alumno => alumno.matematicas >= 10).length;
    reprobadosMatematicas = alumnos.filter(alumno => alumno.matematicas < 10).length;
    aprobadosFisica = alumnos.filter(alumno => alumno.fisica >= 10).length;
    reprobadosFisica = alumnos.filter(alumno => alumno.fisica < 10).length;
    aprobadosProgramacion = alumnos.filter(alumno => alumno.programacion >= 10).length;
    reprobadosProgramacion = alumnos.filter(alumno => alumno.programacion < 10).length;

    // Calcula el número de alumnos que aprobaron todas las materias
    aprobadosTodas = alumnos.filter(alumno => alumno.matematicas >= 10 && alumno.fisica >= 10 && alumno.programacion >= 10).length;

    // Calcula el número de alumnos que aprobaron una sola materia
    aprobadosUnaMateria = alumnos.filter(alumno => {
        const notas = [alumno.matematicas, alumno.fisica, alumno.programacion];
        const aprobadas = notas.filter(nota => nota >= 10).length;
        return aprobadas === 1;
    }).length;

    // Calcula el número de alumnos que aprobaron dos materias
    aprobadosDosMaterias = alumnos.filter(alumno => {
        const notas = [alumno.matematicas, alumno.fisica, alumno.programacion];
        const aprobadas = notas.filter(nota => nota >= 10).length;
        return aprobadas === 2;
    }).length;

    // Calcula la nota máxima en cada materia
    notaMaximaMatematicas = Math.max(...alumnos.map(alumno => alumno.matematicas));
    notaMaximaFisica = Math.max(...alumnos.map(alumno => alumno.fisica));
    notaMaximaProgramacion = Math.max(...alumnos.map(alumno => alumno.programacion));

    // Actualiza la interfaz de usuario con los resultados
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
        <p>Promedio Matemáticas: ${promedioMatematicas.toFixed(2)}</p>
        <p>Promedio Física: ${promedioFisica.toFixed(2)}</p>
        <p>Promedio Programación: ${promedioProgramacion.toFixed(2)}</p>
        <p>Número de alumnos aprobados en Matemáticas: ${aprobadosMatematicas}</p>
        <p>Número de alumnos reprobados en Matemáticas: ${reprobadosMatematicas}</p>
        <p>Número de alumnos aprobados en Física: ${aprobadosFisica}</p>
        <p>Número de alumnos reprobados en Física: ${reprobadosFisica}</p>
        <p>Número de alumnos aprobados en Programación: ${aprobadosProgramacion}</p>
        <p>Número de alumnos reprobados en Programación: ${reprobadosProgramacion}</p>
        <p>Número de alumnos que aprobaron todas las materias: ${aprobadosTodas}</p>
        <p>Número de alumnos que aprobaron una sola materia: ${aprobadosUnaMateria}</p>
        <p>Número de alumnos que aprobaron dos materias: ${aprobadosDosMaterias}</p>
        <p>Nota Máxima en Matemáticas: ${notaMaximaMatematicas}</p>
        <p>Nota Máxima en Física: ${notaMaximaFisica}</p>
        <p>Nota Máxima en Programación: ${notaMaximaProgramacion}</p>
    `;
}

// Función para agregar un alumno
function agregarAlumno() {
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const matematicas = parseFloat(document.getElementById('matematicas').value);
    const fisica = parseFloat(document.getElementById('fisica').value);
    const programacion = parseFloat(document.getElementById('programacion').value);

    if (!isNaN(matematicas) && !isNaN(fisica) && !isNaN(programacion)) {
        const alumno = {
            cedula,
            nombre,
            matematicas,
            fisica,
            programacion,
        };
        alumnos.push(alumno);
        actualizarResultados();
        // Limpiar los campos del formulario
        document.getElementById('cedula').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('matematicas').value = '';
        document.getElementById('fisica').value = '';
        document.getElementById('programacion').value = '';
    } else {
        alert('Por favor, ingrese notas válidas.');
    }
}

// Agregar un manejador de eventos al botón "Agregar"
document.getElementById('agregar').addEventListener('click', agregarAlumno);

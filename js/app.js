/**
 * Función que valida los datos ingresados en el formulario.
 * @param {Object} data
 * @returns {boolean}
 */

function validFormFieldInput(data) {
    const alertError = document.querySelector('#alertError');
    let errorMessage = '';

    // Validaciones individuales según requerimiento
    if (!data.name || data.name.trim() === '') {
        errorMessage = 'El nombre de la tarea no puede estar vacío.';
    } else if (!data.description || data.description.trim() === '') {
        errorMessage = 'La descripción no puede estar vacía.';
    } else if (!data.dueDate || data.dueDate.trim() === '') {
        errorMessage = 'Debes seleccionar una fecha de entrega válida.';
    } else if (!data.status || data.status.trim() === '') {
        errorMessage = 'Debes seleccionar un estado para la tarea.';
    }

    // Comprobación de errores e interacción con la Alerta de Bootstrap
    if (errorMessage !== '') {
        alertError.textContent = errorMessage;
        alertError.classList.remove('d-none'); // Mostrar alerta
        return false;
    }

    // Si la información es correcta, ocultar alerta
    alertError.classList.add('d-none');
    alertError.textContent = '';
    return true;
}

// Escuchador de eventos del formulario
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector('#taskForm');

    if (taskForm) {
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Captura de valores usando querySelector y .value
            const nameInput = document.querySelector('#newTaskNameInput');
            const descriptionInput = document.querySelector('#newTaskDescriptionInput');
            const dueDateInput = document.querySelector('#newTaskDueDateInput');
            const statusInput = document.querySelector('#newTaskStatusInput');

            const formData = {
                name: nameInput ? nameInput.value : '',
                description: descriptionInput ? descriptionInput.value : '',
                dueDate: dueDateInput ? dueDateInput.value : '',
                status: statusInput ? statusInput.value : ''
            };

            // Comprobación en consola solicitada por la guía
            console.log("name: " + formData.name);
            console.log("description: " + formData.description);
            console.log("dueDate: " + formData.dueDate);
            console.log("status: " + formData.status);

            // Ejecución de la validación
            if (validFormFieldInput(formData)) {
                console.log("¡Formulario válido! Listo para procesar la tarea.");
                taskForm.reset(); // Limpiar formulario si todo está bien
            }
        });
    }
});
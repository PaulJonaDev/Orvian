const taskManager = new TaskManager();

console.log(taskManager.tasks);

const taskCards = document.querySelectorAll('.task-card');


///Cambio de estado de las tareas al hacer click en el botón de marcar como completada o pendiente
taskCards.forEach((taskCard) => {
    const toggleButton = taskCard.querySelector('.task-toggle');
    const statusBadge = taskCard.querySelector('.badge');
    const taskTitle = taskCard.querySelector('h3');

    toggleButton.addEventListener('click', () => {
        const isCompleted = taskCard.classList.toggle('task-completed');

        if (isCompleted) {
            statusBadge.textContent = 'Completada';
            statusBadge.classList.remove('badge-pending', 'badge-process');
            statusBadge.classList.add('badge-completed');

            taskTitle.style.textDecoration = 'line-through';
            toggleButton.textContent = '↩';
            toggleButton.title = 'Marcar tarea como pendiente';
        } else {
            statusBadge.textContent = 'Pendiente';
            statusBadge.classList.remove('badge-completed', 'badge-process');
            statusBadge.classList.add('badge-pending');

            taskTitle.style.textDecoration = 'none';
            toggleButton.textContent = '✓';
            toggleButton.title = 'Marcar tarea como completada';
        }
    });
});
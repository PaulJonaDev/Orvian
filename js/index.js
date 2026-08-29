
const taskManager = new TaskManager();

const newTaskForm = document.querySelector('#newTaskForm');

if (newTaskForm) {
  newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('#newTaskNameInput');
    const descriptionInput = document.querySelector('#newTaskDescriptionInput');
    const dueDateInput = document.querySelector('#newTaskDueDateInput');
    const statusInput = document.querySelector('#newTaskStatusInput');

    const name = nameInput ? nameInput.value.trim() : '';
    const description = descriptionInput ? descriptionInput.value.trim() : '';
    const dueDate = dueDateInput ? dueDateInput.value.trim() : '';
    const status = statusInput ? statusInput.value : 'PORHACER';

    if (!name || !description || !dueDate) {
      return;
    }

    taskManager.addTask(name, description, dueDate, status);
    newTaskForm.reset();

    console.log(taskManager.tasks);
  });
}

const taskCards = document.querySelectorAll('.task-card');

taskCards.forEach((taskCard) => {
  const toggleButton = taskCard.querySelector('.task-toggle');
  const statusBadge = taskCard.querySelector('.badge');
  const taskTitle = taskCard.querySelector('h3');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isCompleted = taskCard.classList.toggle('task-completed');

      if (isCompleted) {
        if (statusBadge) {
          statusBadge.textContent = 'Completada';
          statusBadge.classList.remove('badge-pending', 'badge-process');
          statusBadge.classList.add('badge-completed');
        }
        if (taskTitle) {
          taskTitle.style.textDecoration = 'line-through';
        }
        toggleButton.textContent = '↩';
        toggleButton.title = 'Marcar tarea como pendiente';
      } else {
        if (statusBadge) {
          statusBadge.textContent = 'Pendiente';
          statusBadge.classList.remove('badge-completed', 'badge-process');
          statusBadge.classList.add('badge-pending');
        }
        if (taskTitle) {
          taskTitle.style.textDecoration = 'none';
        }
        toggleButton.textContent = '✓';
        toggleButton.title = 'Marcar tarea como completada';
      }
    });
  }
});

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
    taskManager.save();
    taskManager.render();
    newTaskForm.reset();
  });
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const parentTask = event.target.closest('[data-task-id]');
    if (parentTask) {
      const taskId = Number(parentTask.dataset.taskId);
      taskManager.deleteTask(taskId);
      taskManager.save();
      taskManager.render();
    }
  }

  if (event.target.classList.contains('task-toggle')) {
    const taskCard = event.target.closest('.task-card');
    if (taskCard) {
      const isCompleted = taskCard.classList.toggle('task-completed');
      const statusBadge = taskCard.querySelector('.badge');
      const taskTitle = taskCard.querySelector('h3');

      if (isCompleted) {
        if (statusBadge) {
          statusBadge.textContent = 'Completada';
          statusBadge.classList.remove('badge-pending', 'badge-process');
          statusBadge.classList.add('badge-completed');
        }
        if (taskTitle) {
          taskTitle.classList.add('text-decoration-line-through');
        }
        event.target.textContent = '↩';
        event.target.title = 'Marcar tarea como pendiente';
      } else {
        if (statusBadge) {
          statusBadge.textContent = 'Pendiente';
          statusBadge.classList.remove('badge-completed', 'badge-process');
          statusBadge.classList.add('badge-pending');
        }
        if (taskTitle) {
          taskTitle.classList.remove('text-decoration-line-through');
        }
        event.target.textContent = '✓';
        event.target.title = 'Marcar tarea como completada';
      }
    }
  }
});

taskManager.render();
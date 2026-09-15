
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

const tasksList = document.querySelector('#tasksList') || document;

tasksList.addEventListener('click', (event) => {
  if (event.target.classList.contains('done-button')) {
    const parentTask = event.target.closest('[data-task-id]');
    if (parentTask) {
      const taskId = Number(parentTask.dataset.taskId);
      const task = taskManager.getTaskById(taskId);
      if (task) {
        task.status = 'DONE';
        taskManager.save();
        taskManager.render();
      }
    }
  }

  if (event.target.classList.contains('delete-button')) {
    const parentTask = event.target.closest('[data-task-id]');
    if (parentTask) {
      const taskId = Number(parentTask.dataset.taskId);
      taskManager.deleteTask(taskId);
      taskManager.save();
      taskManager.render();
    }
  }
});

taskManager.render();
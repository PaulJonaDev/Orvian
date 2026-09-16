class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate, status = 'PORHACER') {
    this.currentId++;
    const task = {
      id: this.currentId,
      name,
      description,
      dueDate,
      status
    };
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    const newTasks = [];
    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

  getTaskById(taskId) {
    let foundTask;
    for (let task of this.tasks) {
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = String(this.currentId);
    localStorage.setItem('currentId', currentId);
  }

  load() {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
    }
    const currentId = localStorage.getItem('currentId');
    if (currentId) {
      this.currentId = Number(currentId);
    }
  }

  createTaskHtml(id, name, description, dueDate, status) {
    const isDone = status === 'DONE';
    const badgeClass = isDone ? 'badge-completed' : 'badge-pending';
    const titleClass = isDone ? 'text-decoration-line-through' : '';

    return `
      <div class="task-card" data-task-id="${id}">
        <h3 class="${titleClass}">${name}</h3>
        <p>${description}</p>
        <small>${dueDate}</small>
        <span class="badge ${badgeClass}">${status}</span>
        <div class="acciones-tarea">
          <button class="done-button btn btn-success">Mark As Done</button>
          <button class="delete-button btn btn-danger">Eliminar</button>
        </div>
      </div>
    `;
  }

  render() {
    const tasksList = document.querySelector('#tasksList');
    if (!tasksList) return;

    const tasksHtmlList = [];
    for (let task of this.tasks) {
      const taskHtml = this.createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.dueDate,
        task.status
      );
      tasksHtmlList.push(taskHtml);
    }

    tasksList.innerHTML = tasksHtmlList.join('\n');
  }
}
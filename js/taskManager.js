class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

addTask(name, description, dueDate, status = 'PORHACER') {
    this.currentId++;
    const task = {
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status


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

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('currentId', String(this.currentId));
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
    
    tasksList.innerHTML = '';
    this.tasks.forEach(task => {
      tasksList.innerHTML += `
        <div class="task-card" data-task-id="${task.id}">
          <h3>${task.name}</h3>
          <p>${task.description}</p>
          <small>${task.dueDate}</small>
          <span class="badge badge-pending">${task.status}</span>
          <div class="acciones-tarea">
            <button class="task-toggle btn btn-success">✓</button>
            <button class="delete-button btn btn-danger">Eliminar</button>
          </div>
        </div>
      `;
    });
  }
}

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

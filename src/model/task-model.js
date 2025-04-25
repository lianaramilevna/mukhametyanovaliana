import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

 
  addTask(title) {
    if (!title.trim()) {
      return;
    }
    const newTask = {
      id: generateID(),
      title,
      status: 'backlog'
    };
    this.#boardtasks.push(newTask);
    this.#notifyObservers();
    return newTask;
  }

  clearTrash() {
    this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
    this.#notifyObservers();
  }

  moveTask(taskId, newStatus, beforeTaskId) {
    const idx = this.#boardtasks.findIndex(t => t.id === taskId);
    if (idx === -1) return;

    const [task] = this.#boardtasks.splice(idx, 1);
    task.status = newStatus;

    let insertIndex = this.#boardtasks.length; 
    if (beforeTaskId) {
      const refIdx = this.#boardtasks.findIndex(t => t.id === beforeTaskId);
      if (refIdx !== -1) {
        insertIndex = refIdx;
      }
    } else {
      const same = this.#boardtasks
        .map((t, i) => t.status === newStatus ? i : -1)
        .filter(i => i >= 0);
      if (same.length) {
        insertIndex = same[same.length - 1] + 1;
      } else {
        const firstOther = this.#boardtasks.findIndex(t => t.status !== newStatus);
        if (firstOther !== -1) insertIndex = firstOther;
      }
    }
    this.#boardtasks.splice(insertIndex, 0, task);
    this.#notifyObservers();
  }
  
  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  #notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
}

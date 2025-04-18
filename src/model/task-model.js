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

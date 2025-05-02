import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      this.#boardtasks = await this.#tasksApiService.tasks;
    } catch {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(t => t.status === status);
  }

  async addTask(title) {
    const newTaskData = { title, status: 'backlog', id: generateID() };
    const created = await this.#tasksApiService.addTask(newTaskData);
    this.#boardtasks.push(created);
    this._notify(UserAction.ADD_TASK, created);
    return created;
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find(t => t.id === taskId);
    if (!task) return;
    const prevStatus = task.status;
    task.status = newStatus;

    try {
      const updated = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updated);
      this._notify(UserAction.UPDATE_TASK, task);
    } catch (err) {
      console.error(err);
      task.status = prevStatus;
      throw err;
    }
  }

  moveTask(taskId, newStatus, beforeTaskId) {
    const idx = this.#boardtasks.findIndex(t => t.id === taskId);
    if (idx === -1) return;

    const [task] = this.#boardtasks.splice(idx, 1);
    task.status = newStatus;

    let insertIndex = this.#boardtasks.length;
    if (beforeTaskId) {
      const refIdx = this.#boardtasks.findIndex(t => t.id === beforeTaskId);
      if (refIdx !== -1) insertIndex = refIdx;
    } else {
      const sameStatus = this.#boardtasks
        .map((t, i) => t.status === newStatus ? i : -1)
        .filter(i => i >= 0);
      if (sameStatus.length) {
        insertIndex = sameStatus[sameStatus.length - 1] + 1;
      }
    }

    this.#boardtasks.splice(insertIndex, 0, task);
    this._notify(UserAction.UPDATE_TASK, task);
  }

  async clearTrashTasks() {
    const trash = this.#boardtasks.filter(t => t.status === 'trash');
    await Promise.all(trash.map(t => this.#tasksApiService.deleteTask(t.id)));
    this.#boardtasks = this.#boardtasks.filter(t => t.status !== 'trash');
    this._notify(UserAction.DELETE_TASK, { status: 'trash' });
  }

  hasTrashTasks() {
    return this.#boardtasks.some(t => t.status === 'trash');
  }
}

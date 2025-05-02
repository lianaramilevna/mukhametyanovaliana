import ListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import BoardComponent from '../view/board-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import TrashClearButtonComponent from '../view/trash-button-component.js';
import NoTaskComponent from '../view/no-task-component.js';
import { render, RenderPosition } from '../framework/render.js';
import { Status, UserAction, UpdateType } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #boardComponent = new BoardComponent();
  #loadingComponent = new LoadingViewComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }

  async init() {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.BEFOREEND);
    await this.#tasksModel.init();

    this.#loadingComponent.element.remove();

    this.#clearBoard();
    this.#renderBoard();
  }

  async createTask() {
    const input = document.querySelector('#taskInput');
    const title = input.value.trim();
    if (!title) return;

    try {
      await this.#tasksModel.addTask(title);
      input.value = '';
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
    }
  }

  async #handleTaskDrop(taskId, newStatus, beforeTaskId) {
    const task = this.#tasksModel.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === newStatus) {
      this.#tasksModel.moveTask(taskId, newStatus, beforeTaskId);
      return;
    }

    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи:', err);
    }
  }

  async #handleClearTrashClick() {
    try {
      await this.#tasksModel.clearTrashTasks();
    } catch (err) {
      console.error('Ошибка при очистке корзины:', err);
    }
  }

  #handleModelEvent(event/*, payload */) {
    switch (event) {
      case UpdateType.INIT:
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer, RenderPosition.BEFOREEND);

    Object.values(Status).forEach((status) => {
      const listComp = new ListComponent(status, this.#handleTaskDrop.bind(this));
      render(listComp, this.#boardComponent.element, RenderPosition.BEFOREEND);

      const tasks = this.#tasksModel.getTasksByStatus(status);
      const container = listComp.getTaskListElement();
      this.#renderTasksList(tasks, container, status === Status.TRASH);
    });
  }

  #clearBoard() {
    this.#boardComponent.element.innerHTML = '';
  }

  #renderTask(task, container) {
    render(new TaskComponent({ task }), container, RenderPosition.BEFOREEND);
  }

  #renderTasksList(tasks, container, isTrash = false) {
    if (tasks.length) {
      tasks.forEach(task => this.#renderTask(task, container));
    } else {
      render(new NoTaskComponent(), container, RenderPosition.BEFOREEND);
    }

    if (isTrash) {
      const btn = new TrashClearButtonComponent({
        onClear: this.#handleClearTrashClick.bind(this),
        isDisabled: !this.#tasksModel.hasTrashTasks()
      });
      render(btn, container, RenderPosition.BEFOREEND);
    }
  }
}

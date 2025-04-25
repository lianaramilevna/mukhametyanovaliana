import ListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/board-component.js";
import { render, RenderPosition } from "../framework/render.js";
import { Status } from "../const.js";
import TrashClearButtonComponent from "../view/trash-button-component.js";
import NoTaskComponent from "../view/no-task-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  #handleTaskDrop = (taskId, newStatus, beforeTaskId) => {
    this.#tasksModel.moveTask(taskId, newStatus, beforeTaskId);
  };

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #renderTask(task, container) {
    render(new TaskComponent({ task }), container);
  }

  #renderTasksList(tasksForStatus, container, isTrash = false) {
    if (tasksForStatus.length > 0) {
      tasksForStatus.forEach(task => this.#renderTask(task, container));
    } else {
      render(new NoTaskComponent(), container);
    }

    if (isTrash) {
      const clearBtn = new TrashClearButtonComponent({
        onClear: this.#clearTrashHandler,
        isDisabled: tasksForStatus.length === 0
      });
      render(clearBtn, container, RenderPosition.BEFOREEND);
    }
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach((status) => {
      const listComponent = new ListComponent(status, this.#handleTaskDrop);
      render(listComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.#tasksModel.getTasksByStatus(status);
      const listContainer = listComponent.getTaskListElement();
      this.#renderTasksList(tasksForStatus, listContainer, status === Status.TRASH);
    });
  }

  #clearBoard() {
   this.#tasksBoardComponent.element.innerHTML = '';
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  init() {
    this.#renderBoard();
  }

  
  createTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();
    if (!title) {
      return;
    }

    this.#tasksModel.addTask(title);
    input.value = "";
  }
  #clearTrashHandler = () => {
    this.#tasksModel.clearTrash();
  }
}
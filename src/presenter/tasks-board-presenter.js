import ListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/board-component.js";
import { render } from "../framework/render.js";
import { Status } from "../const.js";
import TrashClearButtonComponent from "../view/trash-button-component.js";
import NoTaskComponent from "../view/no-task-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  // Отрисовка одной задачи
  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  // Отрисовка списка задач по статусу, с заглушкой если задач нет
  #renderTasksList(tasksForStatus, container, isTrash = false) {
    if (tasksForStatus.length > 0) {
      tasksForStatus.forEach((task) => {
        this.#renderTask(task, container);
      });

      if (isTrash) {
        render(new TrashClearButtonComponent(), container, "beforeend");
      }
    } else {
      const noTaskComponent = new NoTaskComponent();
      render(noTaskComponent, container);
    }
  }

  // Отрисовка всей доски
  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach((status) => {
      const tasksListComponent = new ListComponent(status);
      render(tasksListComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.#boardTasks.filter((task) => task.status === status);
      const isTrash = status === Status.TRASH;

      this.#renderTasksList(tasksForStatus, tasksListComponent.element, isTrash);
    });
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }
}

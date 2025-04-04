import ListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/board-component.js";
import { render } from "../framework/render.js";
import { Status } from "../const.js";
import TrashClearButtonComponent from "../view/trash-button-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.getTasks()];
    render(this.#tasksBoardComponent, this.#boardContainer);

    const statuses = [Status.BACKLOG, Status.PROCESSING, Status.DONE, Status.TRASH];

    for (const status of statuses) {
      const tasksListComponent = new ListComponent(status);
      render(tasksListComponent, this.#tasksBoardComponent.getElement());

      const taskListElement = tasksListComponent.getTaskListElement();

      const filteredTasks  = this.#boardTasks.filter(task => task.status === status);
      filteredTasks .forEach(task => {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, taskListElement);
      });

      if (status === Status.TRASH) {
        const trashClearButtonComponent = new TrashClearButtonComponent();
        render(trashClearButtonComponent, tasksListComponent.getElement(), 'beforeend');
      }
    }
  }
}

import { AbstractComponent } from '../framework/view/abstract-component.js';
import { StatusLabel } from "../const.js";

export default class ListComponent extends AbstractComponent {
  constructor(status, onTaskDrop) {
    super();
    this.status = status;
    this._onTaskDrop = onTaskDrop;

    this.element.addEventListener('dragover', this._onDragOver);
    this.element.addEventListener('drop', this._onDrop);
  }

  get template() {
    const title = StatusLabel[this.status];
    const columnClass = `column--${this.status}`;
    return `
      <div class="column ${columnClass}">
        <h2>${title}</h2>
        <div class="task-list"></div>
      </div>
    `;
  }

  getTaskListElement() {
    return this.element.querySelector('.task-list');
  }

  _onDragOver = (evt) => {
    evt.preventDefault(); 
  };

  _onDrop = (evt) => {
    evt.preventDefault();
    const taskId = evt.dataTransfer.getData('text/plain');

    const listEl = this.getTaskListElement();
    const items = Array.from(listEl.querySelectorAll('.taskboard__item'));
    let beforeId = null;

    for (const item of items) {
      const rect = item.getBoundingClientRect();
      if (evt.clientY < rect.top + rect.height / 2) {
        beforeId = item.dataset.id;
        break;
      }
    }

    this._onTaskDrop(taskId, this.status, beforeId);
  };
}

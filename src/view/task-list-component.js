import { AbstractComponent } from '../framework/view/abstract-component.js';
import { StatusLabel } from "../const.js";

export default class ListComponent extends AbstractComponent {
  constructor(status) {
    super();
    this.status = status;
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
}

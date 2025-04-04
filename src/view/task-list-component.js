import { createElement } from '../framework/render.js';
import { Status, StatusLabel } from "../const.js";

function createListComponentTemplate(status) {
  const title = StatusLabel[status];

  const columnClass = `column--${status}`;

  return `
    <div class="column ${columnClass}">
      <h2>${title}</h2>
      <ul class="task-list"></ul>
    </div>
  `;
}


export default class ListComponent {

  constructor(status) {
    this.status = status;
  }

  getTemplate() {
    return createListComponentTemplate(this.status);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getTaskListElement() {
    return this.getElement().querySelector('.task-list');
  }

  removeElement() {
    this.element = null;
  }
}

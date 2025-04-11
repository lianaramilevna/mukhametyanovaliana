import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
  }

  get template() {
    const { title, status } = this.task;
    return `
      <div class="taskboard__item task task--${status}">
        <div class="task__body">
          <p class="task--view">${title}</p>
          <input type="text" class="task--input" style="display: none;"/>
        </div>
      </div>
    `;
  }
}

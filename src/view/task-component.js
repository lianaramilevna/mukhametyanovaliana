import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
    this.#makeTaskDraggable();
  }

  get template() {
    const { title, status, id} = this.task;
    return `
      <div class="taskboard__item task task--${status}"data-id="${id}">
        <div class="task__body">
          <p class="task--view">${title}</p>
          <input type="text" class="task--input" style="display: none;"/>
        </div>
      </div>
    `;
  }
  #makeTaskDraggable() {
    this.element.setAttribute('draggable', true);
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }
}

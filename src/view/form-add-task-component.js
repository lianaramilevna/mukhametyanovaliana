import { createElement } from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div class="add-task">
      <h2>Новая задача</h2>
      <div class="new-task">
        <input type="text" id="taskInput" placeholder="Название задачи..." />
        <button id="addTaskBtn">+ Добавить</button>
      </div>
    </div>
  `;
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

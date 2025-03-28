import { createElement } from '../framework/render.js';

function createListComponentTemplate() {
  return `
    <div class="column">
      <h2>Название блока</h2>
      <ul class="task-list"></ul>
    </div>
  `;
}

export default class ListComponent {
  getTemplate() {
    return createListComponentTemplate();
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

import { createElement } from '../framework/render.js';

function createTrashClearButtonTemplate() {
  return `
    <button class="trash-button"> ✕ Очистить </button>
  `;
}

export default class TrashClearButtonComponent {
  getTemplate() {
    return createTrashClearButtonTemplate();
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

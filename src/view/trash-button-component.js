import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class TrashClearButtonComponent extends AbstractComponent {
  get template() {
    return `
      <button class="trash-button"> ✕ Очистить </button>
    `;
  }
}

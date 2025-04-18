import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class TrashClearButtonComponent extends AbstractComponent {
  #handleClear = null;
  #isDisabled = false;
  
  constructor({ onClear, isDisabled = false }) {
    super();
    this.#handleClear = onClear;
    this.#isDisabled = isDisabled;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return `
      <button class="trash-button"${this.#isDisabled ? 'disabled' : ''}>✕ Очистить</button>
    `;
  }

  #clickHandler = (evt) => {
    if (this.#isDisabled) {
      evt.preventDefault();
      return;
    }
    evt.preventDefault();
    this.#handleClear();
  }
}
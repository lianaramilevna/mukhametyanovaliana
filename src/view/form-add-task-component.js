import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }
  
  get template() {
    return `
      <form class="add-task">
        <h2>Новая задача</h2>
        <div class="new-task">
          <input type="text" id="taskInput" placeholder="Название задачи..." />
          <button id="addTaskBtn">+ Добавить</button>
        </div>
      </form>
    `;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}

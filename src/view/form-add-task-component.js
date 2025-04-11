import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
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
}

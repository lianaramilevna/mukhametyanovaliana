import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class NoTaskComponent extends AbstractComponent {
  get template() {
    return `
      <li class="taskboard__item no-task">
        Перетащите карточку
      </li>
    `;
  }
}

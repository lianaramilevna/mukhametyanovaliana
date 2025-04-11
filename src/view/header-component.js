import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return `
      <div class="header">
        Список задач
      </div>
    `;
  }
}

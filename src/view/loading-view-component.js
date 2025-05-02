import { AbstractComponent } from '../framework/view/abstract-component.js';

function createLoadingTemplate() {
  return (
    `<p class="board__loading">
      Loading…
    </p>`
  );
}

export default class LoadingViewComponent extends AbstractComponent {
  get template() {
    return createLoadingTemplate();
  }
}

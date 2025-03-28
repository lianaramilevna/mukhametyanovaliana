import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import BoardComponent from './view/board-component.js';
import ListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), bodyContainer);

const boardComponent = new BoardComponent();
render(boardComponent, bodyContainer);

const boardElement = boardComponent.getElement();

for (let i = 0; i < 4; i++) {
  const listComponent = new ListComponent();
  render(listComponent, boardElement);
  const taskListElement = listComponent.getTaskListElement();
  for (let j = 0; j < 4; j++) {
    const taskComponent = new TaskComponent();
    render(taskComponent, taskListElement);
  }
}

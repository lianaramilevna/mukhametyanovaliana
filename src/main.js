import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/task-model.js';

const bodyContainer  = document.querySelector('.board-app');

const tasksModel = new TasksModel();

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: bodyContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick
});
render(formAddTaskComponent, bodyContainer, RenderPosition.BEFOREEND);

tasksBoardPresenter.init();

// Обработчик события для добавления новой задачи
function handleNewTaskButtonClick() {
  tasksBoardPresenter.createTask();
}


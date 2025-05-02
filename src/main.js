import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';


const END_POINT = 'https://680c90c62ea307e081d44f6b.mockapi.io';

const bodyContainer  = document.querySelector('.board-app');

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT),
});

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: bodyContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

render(
  new FormAddTaskComponent({ onClick: () => tasksBoardPresenter.createTask() }),
  bodyContainer,
  RenderPosition.BEFOREEND
);

tasksBoardPresenter.init();


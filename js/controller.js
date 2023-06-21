import * as model from "./model.js";
import { create } from "lodash";
import newProject from "./views/newProject.js";
import editProject from "./views/editProject.js";
import newTask from "./views/newTask.js";
import editTask from "./views/editTask.js";
import stateTask from "./views/stateTask.js";
import manageContent from "./views/manageContent.js";
import detailsTask from "./views/detailsTask.js";

// ============= Projects ============= //
const controlNewProject = function () {
  // Generate HTML Markup for element and add it to model projects list.
  const elementHTML = newProject.generateMarkup(model.createProject());
  // Make Add new project element to HTML structure
  const projectEl = newProject.addElementHTML(elementHTML);
  const nameFieldEl = editProject.selectProjectName(projectEl);
  // Focus name input field of created project, so it can be edited
  editProject.focusElement(nameFieldEl);
  // Make "Add new Task" Button working in newly created project
  controlNewTaskBtn(projectEl);
  // Make Project Name editable.
  editProject.editInput(nameFieldEl);
};

// const controlEditProjectName = function (nameInput) {
//   editProject.editInput(nameInput);
// };

// Store every edit of Project Name
const controlStoreProjectName = function (nameInput) {
  model.updateProjectName(nameInput, editProject.getProjectId(nameInput));
};

// ============= Tasks ============= //

const controlNewTaskBtn = function (project) {
  // console.log(project);
  // const newTaskBtn = project.querySelector(".button_add_new_task");
  newTask.addHandler(controlNewTask, project);
};

const controlNewTask = function (projectId) {
  const elementHTML = newTask.generateMarkup(model.createTask(projectId));
  const taskEl = newTask.addElementHTML(elementHTML);
  const taskNameEl = editTask.selectTaskName(taskEl);
  controlEditTaskName(taskNameEl);
};

const controlEditTaskName = function (taskNameEl) {
  editTask.editInput(taskNameEl);
};

const controlTaskPanel = function (clicked) {
  // Store clicked task Element
  const clickedTask = clicked.target.closest(".task");
  // Add task-panel to secondary panel
  manageContent.changePanel(
    "secondary",
    manageContent.chooseSubPanel("task-panel")
  );
  // Store task panel element
  // Remove hidden class from Second Panel
  controlSecondPanel("show");
  controlTaskDataDetails(clickedTask);
};

const controlTaskDataDetails = function (task) {
  const taskPanelEl = manageContent.secondaryPanel.querySelector(".task-panel");
  detailsTask.changeParentEl(taskPanelEl);
  const elementHTML = detailsTask.generateMarkup(editTask.getTaskData(task));
  const taskDetailsEl = detailsTask.addElementHTML(elementHTML);
  console.log(taskDetailsEl);
};

const controlSecondPanel = function (whatToDo) {
  manageContent.elementVisibility(manageContent.secondaryPanel, whatToDo);
};

const controlStoreTaskData = function (taskNameEl) {
  const data = editTask.getTaskData(taskNameEl);
  model.editTask(data.id, data);
};

// ============= Initialization function ============= //

const init = function () {
  newProject.addHandler(controlNewProject);
  editProject.addUpdateHandler(controlStoreProjectName);
  editTask.addUpdateHandler(controlStoreTaskData);
  stateTask.checkboxListener();
  stateTask.addUpdateHandler(controlStoreTaskData);
  // Listen to task clicking, so the event can be used later.
  editTask.listenToClass(["task-text", "task"], ".projects-container");
  editTask.addListenerHandler(controlTaskPanel);
};
init();

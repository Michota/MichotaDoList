import * as model from "./model.js";
import { create } from "lodash";
import newProject from "./views/newProject.js";
import editProject from "./views/editProject.js";
import newTask from "./views/newTask.js";
import editTask from "./views/editTask.js";
import stateTask from "./views/stateTask.js";

// ============= Projects ============= //
const controlNewProject = function (loaded = undefined) {
  // Generate HTML Markup for element and add it to model projects list.
  const elementHTML = newProject.generateMarkup(model.createProject(loaded));
  // Make Add new project element to HTML structure
  const projectEl = newProject.addElementHTML(elementHTML);
  const nameFieldEl = editProject.selectProjectName(projectEl);
  // Focus name input field of created project, so it can be edited
  editProject.focusElement(nameFieldEl);
  // Make "Add new Task" Button working in newly created project
  controlNewTaskBtn(projectEl, true);
  // Make Project Name editable.
  editProject.editInput(nameFieldEl);
};

// const controlEditProjectName = function (nameInput) {
//   editProject.editInput(nameInput);
// };

// Store every edit of Project Name
const controlStoreProjectName = function (nameInput) {
  model.updateProjectName(nameInput, editProject.getProjectId(nameInput));
  model.saveProjects();
};

// ============= Tasks ============= //

const controlNewTaskBtn = function (project) {
  // console.log(project);
  // const newTaskBtn = project.querySelector(".button_add_new_task");
  newTask.addHandler(controlNewTask, project);
};

const controlNewTask = function (projectId, loadedTask = undefined) {
  // if (loadedTask)

  const elementHTML = newTask.generateMarkup(
    model.createTask(projectId, loadedTask)
  );

  const taskEl = newTask.addElementHTML(
    elementHTML,
    loadedTask ? loadedTask : undefined
  );
  const taskNameEl = editTask.selectTaskName(taskEl);
  if (loadedTask && loadedTask.done === true) {
    stateTask.toggleTaskCheckbox(taskEl.querySelector(".checkbox"));
  }
  controlEditTaskName(taskNameEl);
  model.saveProjects();
};

const controlEditTaskName = function (taskNameEl) {
  editTask.editInput(taskNameEl);
  model.saveProjects();
};

const controlStoreTaskData = function (taskNameEl) {
  const data = editTask.getTaskData(taskNameEl);
  model.editTask(data.id, data);
  model.saveProjects();
};

const controlTaskMark = function (task) {
  const data = editTask.getTaskData(task);
  model.editTask(data.id, data);
};

const renderProjects = function (loadedProjects) {
  loadedProjects.forEach((project) => {
    controlNewProject(project);
    renderTasks(project, project.tasks);
  });
};

const renderTasks = function (project, loadedTasks) {
  console.log(project.id, loadedTasks);
  loadedTasks.forEach((task) => controlNewTask(project.id, task));
};

// ============= Initialization function ============= //

const init = function () {
  newProject.addHandler(controlNewProject);
  editProject.addUpdateHandler(controlStoreProjectName);
  editTask.addUpdateHandler(controlStoreTaskData);
  stateTask.checkboxListener();
  stateTask.addUpdateHandler(controlStoreTaskData);
  // NewProject.selectElement(".projects-container", ".project-name");
  renderProjects(model.loadProjects());
};
init();

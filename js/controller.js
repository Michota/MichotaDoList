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
  // const taskData = editTask.getTaskData(task);
  // const elementHTML = detailsTask.generateMarkup(taskData);
  const taskId = editTask.getTaskId(task);

  const taskData = model.findTask(taskId);
  const elementHTML = detailsTask.generateMarkup(taskData);
  // console.log(taskData);
  const taskDetailsEl = detailsTask.addElementHTML(elementHTML, taskPanelEl);
  const elements = detailsTask.selectAllElements();
  detailsTask.editInput(elements.text);
  detailsTask.editDesc(elements.desc);
};

const controlSecondPanel = function (whatToDo) {
  manageContent.elementVisibility(manageContent.secondaryPanel, whatToDo);
};

const controlStoreTaskData = function (taskNameEl) {
  let data;
  if (taskNameEl.classList.contains("task-desc")) {
    data = detailsTask.getTaskData(taskNameEl);
  } else {
    data = editTask.getTaskData(taskNameEl, model.findTask);
  }
  updateVisibleTaskData(data);
  model.editTask(data.id, data);
  model.saveProjects();
};

const updateVisibleTaskData = function (data) {
  if (typeof data === Number)
    data = {
      id: data,
    };
  const bothTaskEl = document.querySelectorAll(`[data-id="${data.id}"]`);
  bothTaskEl.forEach(
    (taskEl) => (taskEl.querySelector(".task_text").textContent = data.taskName)
  );
};

// Loading & Rendering

const renderProjects = function (loadedProjects) {
  loadedProjects.forEach((project) => {
    controlNewProject(project);
    renderTasks(project, project.tasks);
  });
};

const renderTasks = function (project, loadedTasks) {
  loadedTasks.forEach((task) => controlNewTask(project.id, task));
};

// ============= Initialization function ============= //

const init = function () {
  newProject.addHandler(controlNewProject);
  editProject.addUpdateHandler(controlStoreProjectName);
  editTask.addUpdateHandler(controlStoreTaskData);
  detailsTask.addUpdateHandler(controlStoreTaskData);
  stateTask.checkboxListener();
  stateTask.addUpdateHandler(controlStoreTaskData);
  // Listen to task clicking, so the event can be used later.
  editTask.listenToClass(["task-text", "task"], ".projects-container");
  editTask.addListenerHandler(controlTaskPanel);
  renderProjects(model.loadProjects());
};
init();

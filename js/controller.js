import * as model from "./model.js";
import newProject from "./views/newProject.js";
import editProject from "./views/editProject.js";
import newTask from "./views/newTask.js";
import { create } from "lodash";

const controlNewProject = function () {
  // Generate HTML Markup for element and add it to model projects list.
  const elementHTML = newProject.generateMarkup(model.createProject());

  // Make Add new project element to HTML structure
  const createdProjectEl = newProject.addElementHTML(elementHTML);
  const projectNameField = createdProjectEl.querySelector(".project-name");
  // Focus name input field of created project, so it can be edited
  editProject.focusElement(projectNameField);
  controlNewTaskBtn(createdProjectEl);
  controlProjectName(projectNameField);
};

const controlNewTask = function (projectId) {
  const elementHTML = newTask.generateMarkup(model.createTask(projectId));
  const createdTaskEl = newTask.addElementHTML(elementHTML);
  const taskNameField = createdTaskEl.querySelector(".task-name");
};

const controlProjectName = function (nameInput) {
  editProject.editInput(nameInput);
};

const controlNewTaskBtn = function (project) {
  // console.log(project);
  // const newTaskBtn = project.querySelector(".button_add_new_task");
  newTask.addHandler(controlNewTask, project);
};

const controlUpdateProjectName = function (data) {
  // console.log(data);
  model.updateProjectName(data);
};

// Initialization function
const init = function () {
  newProject.addHandler(controlNewProject);
  editProject.addUpdateHandler(controlUpdateProjectName);
  // NewProject.selectElement(".projects-container", ".project-name");
};
init();

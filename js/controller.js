import * as model from "./model.js";
import newProject from "./views/newProject.js";

const controlNewProject = function () {
  const elementHTML = newProject.generateMarkup(model.createProject());
  newProject.focusElement(
    newProject.addElementHTML(elementHTML)
    // ".project-name"
  );

  // Select newlycreated project
  const newlyCreatedProject = document.querySelector(
    `[data-id="${elementHTML.data.id}"]`
  );
  // Make focused project-name listened, so after clicking "ENTER" data will be saved
  newProject.editInput(newlyCreatedProject);
  console.log(newlyCreatedProject);
};

const controlUpdateProjectName = function (data) {
  // console.log(data);
  model.updateProjectName(data);
};

const controlUpdateTaskName = function (data) {
  // console.log(data);
  model.updateTaskName(data);
};

const init = function () {
  newProject.createNewElement(controlNewProject);
  newProject.addUpdateHandler(controlUpdateProjectName);
  // NewProject.selectElement(".projects-container", ".project-name");
};

document.querySelector(".logout-btn").addEventListener("click", model.devFun());

init();

// NewProject.editInput(".project-name");
// NewProject.makeItEditable();

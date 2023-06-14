import * as model from "./model.js";
// import newProject from "./views/newProject.js";
// import * as view from "./views/view.js";
import newProject from "./views/newProject.js";

const controlNewProject = function () {
  const elementHTML = newProject.generateMarkup(model.createProject());
  newProject.focusElement(
    newProject.addElementHTML(elementHTML),
    ".project-name"
  );
  // .addEventListener(
  //   "focus",
  //   function (e) {
  //     console.log(e.target);
  //     newProject.editInput(this);
  //   },
  //   { once: true }
  // );
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

const init = function () {
  newProject.startNewProject(controlNewProject);
  newProject.addUpdateHandler(controlUpdateProjectName);
  // NewProject.selectElement(".projects-container", ".project-name");
};

document.querySelector(".logout-btn").addEventListener("click", model.devFun());

init();

// NewProject.editInput(".project-name");
// NewProject.makeItEditable();

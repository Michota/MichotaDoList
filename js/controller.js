import * as model from "./model.js";
// import * as view from "./views/view.js";
import newProject from "./views/newProject.js";

const controlNewProject = function () {
  const markup = newProject.generateMarkup(model.createProject("test2023"));
  newProject.addElementHTML(markup);
};

const init = function () {
  newProject.addHandler(controlNewProject);
};

init();

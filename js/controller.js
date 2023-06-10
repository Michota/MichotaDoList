import * as model from "./model.js";
// import * as view from "./views/view.js";
import newProject from "./views/newProject.js";

const controlNewProject = async function () {
  try {
    const projectName = prompt("Name new project");
    console.log(projectName);
    const markup = newProject.createHTML(projectName);
    newProject.renderHTML(markup);
  } catch (error) {
    console.error(error);
  }
};

console.log("test");

const init = function () {
  controlNewProject();
};

init();

import * as model from "./model.js";
// import * as view from "./views/view.js";
import NewProject from "./views/newProject.js";

const controlNewProject = function () {
  const markup = NewProject.generateMarkup(model.createProject("test2023"));
  NewProject.addElementHTML(markup);
};

// const controlEditProject = function () {
//   document
//     .querySelector(".projects-container")
//     .addEventListener("click", function (ev) {
//       if (ev.target.classList.contains("project-name")) {
//         console.log(ev.target.closest(".project"));
//       }
//     });
// };

const init = function () {
  NewProject.addHandler(controlNewProject);
  NewProject.selectElement(".projects-container", ".project-name");
};

init();

NewProject.editInput(".project-name");
NewProject.makeItEditable();

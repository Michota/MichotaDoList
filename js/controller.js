import * as model from "./model.js";
// import * as view from "./views/view.js";
import NewProject from "./views/newProject.js";

const controlNewProject = function () {
  const elementHTML = NewProject.generateMarkup(model.createProject());
  NewProject.addElementHTML(elementHTML);
  console.log(elementHTML);
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

document.querySelector(".logout-btn").addEventListener("click", model.devFun);

init();

// NewProject.editInput(".project-name");
// NewProject.makeItEditable();

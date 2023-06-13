import * as model from "./model.js";
// import * as view from "./views/view.js";
import NewProject from "./views/newProject.js";

const controlNewProject = function () {
  const elementHTML = NewProject.generateMarkup(model.createProject());
  NewProject.focusElement(
    NewProject.addElementHTML(elementHTML),
    ".project-name"
  );
};

const controlUpdateProject = async function () {
  try {
    const test = NewProject.selectElement(
      ".projects-container",
      ".project-name"
    );

    model.updateProject();
  } catch {}
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
};

document.querySelector(".logout-btn").addEventListener("click", model.devFun);

init();

// NewProject.editInput(".project-name");
// NewProject.makeItEditable();

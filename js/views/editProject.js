import View from "./view.js";

class editProject extends View {
  _data;
  _parentElement = document.querySelector(".projects-container");
  _projectsArr = [];

  clickToEdit() {
    const titleEl = document.querySelector(".project-name");
  }
}

export default new editProject();

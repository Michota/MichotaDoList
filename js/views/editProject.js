import View from "./view.js";

class EditProject extends View {
  _data;
  _parentElement = ".project-name";

  selectProjectName(projectEl) {
    const projectNameEl = projectEl.querySelector(this._parentElement);
    return projectNameEl;
  }

  getProjectId(project) {
    const projectEl = project.closest(".project");
    return Number(projectEl.dataset.id);
  }
}

export default new EditProject();

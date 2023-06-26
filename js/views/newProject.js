import View from "./view.js";

class NewProject extends View {
  _data;
  _parentElement = document.querySelector(".projects-container");
  _buttons = ".option-buttons";
  _buttonStartNewProject = ".button_start_new_project";

  addHandler(handler, button = this._buttonStartNewProject) {
    const buttons = document.querySelector(this._buttons);
    buttons.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(button);
      if (!btn) return;
      handler();
    });
  }

  generateMarkup(recivedData) {
    this._data = recivedData;
    return {
      data: this._data,
      markup: `
<div class="project" data-id="${recivedData.id}" data-color="${recivedData.color}">
              <h2 class="project-header">
                <div class="icon project-icon material-symbols-outlined"
                  >${recivedData.icon}</div
                >
                <div contenteditable="true" class="project-name"
                  >${recivedData.projectName}</div
                >
                <button class="project-menu icon material-symbols-outlined"
                  >menu</button
                >
              </h2>

              <ul class="project-tasks">
                <button
                  class="btn full-button btn-add-new-task button_add_new_task"
                >
                  <div class="icon material-symbols-outlined">add</div>Add new
                  Task</button
                >
              </ul>

              <div class="project-tasks-completed show-content hidden">
                <button class="full-button btn-completed-task">
                  <div class="icon material-symbols-outlined">expand_more</div
                  >Completed Tasks</button
                >
                <ul class="project-tasks-completed-list">
                  
                </ul>
              </div>
            </div>
      `,
    };
  }
}

export default new NewProject();

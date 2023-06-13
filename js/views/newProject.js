import View from "./view.js";

class NewProject extends View {
  _data;
  _parentElement = document.querySelector(".projects-container");

  addHandler(handler) {
    // TODO: Make this in VIEW
    const buttons = document.querySelector(".option-buttons");

    buttons.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".button_start_new_project");
      if (!btn) return;
      handler();
    });
  }

  generateMarkup(recivedData) {
    console.log(recivedData);
    this._data = recivedData;
    return {
      data: this._data,
      markup: `
      <div class="project" data-id="${recivedData.id}">
              <h2 class="project-header">
                <div class="icon project-icon material-symbols-outlined">
                  ${recivedData.icon}
                </div>
                <div contenteditable="true" class="project-name"
                  >${recivedData.projectName}</div
                >
                <button class="project-menu icon material-symbols-outlined">
                  menu
                </button>
              </h2>

              <ul class="project-tasks">
                <button
                  class="btn full-button btn-add-new-task button_add_new_task"
                >
                  <div class="icon material-symbols-outlined">add</div>
                  Add new Task
                </button>
                <li class="task">
                  <button class="checkbox material-symbols-outlined">
                    circle
                  </button>
                  <div class="task-text" contenteditable="true">
                    Task ABC XYZ
                  </div>
                  <button
                    class="task-delete btn icon material-symbols-outlined"
                  >
                    delete
                  </button>
                </li>
              </ul>

              <div class="project-tasks-completed show-content">
                <button class="full-button btn-completed-task">
                  <div class="icon material-symbols-outlined">expand_more</div>
                  Completed Tasks
                </button>
                <ul class="project-tasks-completed-list">
                  <li class="task completed">
                    <button class="checkbox marked material-symbols-outlined">
                      circle
                    </button>
                    <div class="task-text">Task ABC XYZ</div>
                    <button
                      class="task-delete btn icon material-symbols-outlined"
                    >
                      delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
      `,
    };
  }

  // makeItEditable() {
  //   const projects = [...document.querySelectorAll(".project")];
  //   // console.log(projects);
  // }
}

export default new NewProject();

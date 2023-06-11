import View from "./view.js";

class newProject extends View {
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

  generateMarkup(data) {
    // this.data =
    this._data = data;
    return `
    <div class="project">
    <h2 class="project-header">
      <div class="icon project-icon material-symbols-outlined">
      ${this._data.icon}
      </div>
      <div class="project-name">${this._data.projectName}</div>
      <button class="project-menu icon material-symbols-outlined">
        menu
      </button>
    </h2>

    <!-- Tasks list -->
    <ul class="project-tasks">
      <p>No tasks have been added yet.</p>
      <!-- Task -->

      <!-- /// Task -->
    </ul>
    <!-- /// Tasks list -->

    <!-- Completed Tasks List -->
    <div class="project-tasks-completed hidden">
      <button class="full-button btn-completed-task">
        <div class="icon material-symbols-outlined">expand_more</div>
        Completed Tasks
      </button>
      <!-- Completed Tasks List -->
      <ul class="project-tasks-completed-list"></ul>
      <!-- /// Completed Tasks List -->
    </div>
    <!-- /// Completed Tasks Container -->
  </div>
    `;
  }
}

export default new newProject();

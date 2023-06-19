import { conforms } from "lodash";
import View from "./view.js";

class stateTask extends View {
  _data;

  _parentElement = ".project-tasks";
  _parentElementCompleted = ".project-tasks-completed-list";
  _taskEl = "task";
  _taskNameEl = "task_text";
  _checkbox = "checkbox";
  _markedCheckbox = "marked";
  _handler;

  checkboxListener() {
    const container = document.querySelector(".projects-container");
    container.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.contains(`${this._checkbox}`)) {
          e.preventDefault();
          this.toggleTask(e.target);
        } else return;
      }.bind(this)
    );
  }

  toggleTask(checkboxEl) {
    const tasksListEl = checkboxEl.closest(this._parentElement);
    console.log(tasksListEl);
    const tasksListCompletedEl = tasksListEl.parentElement.querySelector(
      this._parentElementCompleted
    );
    console.log(tasksListCompletedEl);

    const taskEl = checkboxEl.closest(`.${this._taskEl}`);
    checkboxEl.classList.toggle(`${this._markedCheckbox}`);
    this._handler(taskEl);
    if (taskEl.parentElement === tasksListEl) {
      tasksListCompletedEl.insertAdjacentHTML("afterbegin", taskEl.outerHTML);
      taskEl.outerHTML = "";
    }
  }
}

export default new stateTask();

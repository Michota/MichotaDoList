import { conforms } from "lodash";
import View from "./view.js";

class stateTask extends View {
  _data;

  _listEl = "project-tasks";
  _listCompletedEl = "project-tasks-completed-list";
  _taskEl = "task";
  _taskNameEl = "task_text";
  _checkbox = "checkbox";
  _markedCheckbox = "marked";
  _project = "project";
  _addNewTaskBtn = "button_add_new_task";
  _handler;

  checkboxListener() {
    const container = document.querySelector(".projects-container");
    container.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.contains(`${this._checkbox}`)) {
          e.preventDefault();
          this.toggleTaskCheckbox(e.target);
        } else return;
      }.bind(this)
    );
  }

  // FIXME:
  toggleTaskCheckbox(checkboxElement) {
    // Marking/Unmarking Checkbox as done
    checkboxElement.classList.toggle("marked");
    // Selecting elements inside project
    const projectElement = checkboxElement.closest(`.${this._project}`);
    const taskElement = checkboxElement.closest(`.${this._taskEl}`);
    const listElement = projectElement.querySelector(`.${this._listEl}`);
    const completedList = projectElement.querySelector(
      `.${this._listCompletedEl}`
    );
    const addNewTask = projectElement.querySelector(`.${this._addNewTaskBtn}`);

    if (checkboxElement.classList.contains(this._markedCheckbox)) {
      completedList.insertAdjacentHTML("afterbegin", taskElement.outerHTML);
    } else {
      console.log("y");
      addNewTask.insertAdjacentHTML("afterend", taskElement.outerHTML);
    }
    taskElement.outerHTML = "";
  }
}

export default new stateTask();

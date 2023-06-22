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
    const container = document.querySelector(".app");
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

  // FIXME: SPAGHETTI CODE (EVERYTHING IS VERY COMPLICATED, but it works)
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
    let newTask;

    if (checkboxElement.classList.contains(this._markedCheckbox)) {
      completedList.insertAdjacentHTML("afterbegin", taskElement.outerHTML);
      newTask = completedList.querySelector(
        `[data-id='${taskElement.dataset.id}']`
      );
      this.editInput(newTask.querySelector(`.${this._taskNameEl}`));
    } else {
      addNewTask.insertAdjacentHTML("afterend", taskElement.outerHTML);
      newTask = listElement.querySelector(
        `[data-id='${taskElement.dataset.id}']`
      );
      this.editInput(newTask.querySelector(`.${this._taskNameEl}`));
    }
    taskElement.outerHTML = "";
    this._handler(newTask);
  }
}

export default new stateTask();

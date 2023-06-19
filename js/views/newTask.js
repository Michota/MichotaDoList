import { bind } from "lodash";
import View from "./view.js";

class NewTask extends View {
  _data;
  _handler;
  _parentElement;
  _tasksList = ".project-tasks";
  _buttonToFocus = ".button_add_new_task";
  _button = ".button_add_new_task";

  // Add Handler to Add New Task button and return the project where this button is located
  addHandler(handler, element) {
    const listOfTasks = element.querySelector(this._tasksList);
    this._parentElement = element;
    this._handler = handler;
    const button = this._parentElement.querySelector(this._button);
    button.addEventListener(
      "click",
      function (e) {
        this._parentElement = listOfTasks;
        handler(Number(element.dataset.id));
      }.bind(this)
    );
  }

  generateMarkup(recivedData) {
    this._data = recivedData;
    return {
      data: this._data,
      markup: `
<li class="task" data-id="${recivedData.id}">
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
      `,
    };
  }
}

export default new NewTask();

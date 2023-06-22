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

  addElementHTML(element, isLoaded = undefined) {
    console.log(isLoaded);
    this._data = element;
    // Insert Element Markup into chosen _parentElement
    if (isLoaded) {
      this._parentElement
        .querySelector(this._tasksList)
        .insertAdjacentHTML("beforeend", element.markup);
    } else {
      this._parentElement.insertAdjacentHTML("beforeend", element.markup);
    }
    const newElement = document.querySelector(`[data-id="${element.data.id}"]`);
    // return newly created element
    return newElement;
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
                  <div class="task-text task_text" contenteditable="true">${recivedData.taskName}</div>
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

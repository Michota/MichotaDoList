import { conforms } from "lodash";
import View from "./view.js";

class detailsTask extends View {
  _data;
  _handler;
  _visibilityHandler;
  _parentElement;

  // #TODO: add project color to taks-panel

  generateMarkup(recivedData) {
    this._data = recivedData;

    return {
      data: this._data,
      markup: `
          <div class="task" data-id="${recivedData.id}">
            <button class="checkbox material-symbols-outlined"> circle </button>
            <div class="task-text task_text" contenteditable="true">${
              recivedData.taskName
            }</div>
            <button class="task-delete btn icon material-symbols-outlined">
              delete
            </button>
          </div>
          <div class="task-desc" contenteditable="true">${
            recivedData.description === undefined ? "" : recivedData.description
          }</div>
      `,
    };
  }

  editDesc(inputField) {
    this._data = inputField;
    const wasEnterPressed = function (ev) {
      if (ev.type === "focusout") {
        ev.preventDefault(); // Disable line-break
        ev.target.blur(); // Lose focus
      }
      const output = ev.target;
      this._handler(output);
    };

    ["keydown", "focusout"].forEach((ev) =>
      inputField.addEventListener(ev, wasEnterPressed.bind(this))
    );
  }

  addElementHTML(element, pElement) {
    this._data = element;
    // Insert Element Markup into chosen _parentElement
    this._parentElement.insertAdjacentHTML("beforeend", element.markup);
    const newElement = pElement.querySelector(`[data-id="${element.data.id}"]`);
    // return newly created element
    return newElement;
  }

  selectAllElements(parentElement = this._parentElement) {
    return {
      taskPanel: parentElement.querySelector("task-panel"),
      task: parentElement.querySelector(".task"),
      checkbox: parentElement.querySelector(".checkbox"),
      text: parentElement.querySelector(".task_text"),
      desc: parentElement.querySelector(".task-desc"),
      deleteBtn: parentElement.querySelector(".task-delete"),
    };
  }
}

export default new detailsTask();

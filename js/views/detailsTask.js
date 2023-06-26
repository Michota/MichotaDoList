import { conforms } from "lodash";
import View from "./view.js";

class detailsTask extends View {
  _data;
  _handler;
  _visibilityHandler;
  _parentElement;
  _elements;

  // #TODO: add project color to taks-panel

  generateMarkup(recivedData) {
    this._data = recivedData;

    return {
      data: this._data,
      markup: `
          <div class="task" data-id="${recivedData.id}">
            <button style="visibility: hidden"class="checkbox material-symbols-outlined  ${
              recivedData.done ? "" : ""
            }" style="visibility: hidden"> circle </button>
            <div class="task-text task_text" contenteditable="true">${
              recivedData.taskName
            }</div>
            <button style="visibility: hidden" class="task-delete btn icon material-symbols-outlined">
              delete
            </button>
          </div>
          <div class="task-desc" contenteditable="true">${
            recivedData.description === undefined ? "" : recivedData.description
          }</div>
      `,
    };
  }

  getTaskData = function (taskTextEl) {
    const panel = taskTextEl.closest(".task-panel");
    const taskEl = panel.querySelector(".task");
    const taskNameEl = panel.querySelector(".task-text");
    const checkbox = panel.querySelector(".checkbox");
    const description = panel.querySelector(".task-desc");

    const taskData = {
      checkbox: checkbox,
      id: this.getTaskId(taskEl),
      taskName: taskNameEl.textContent,
      description: description.textContent,
      done: checkbox.classList.contains("marked") ? true : false,
    };

    return taskData;
  };

  getTaskId(element) {
    const taskEl = element.closest(".task");
    return Number(taskEl.dataset.id);
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
    this._elements = {
      taskPanel: parentElement.closest(".task-panel"),
      task: parentElement.querySelector(".task"),
      checkbox: parentElement.querySelector(".checkbox"),
      text: parentElement.querySelector(".task_text"),
      desc: parentElement.querySelector(".task-desc"),
      deleteBtn: parentElement.querySelector(".task-delete"),
    };
    return this._elements;
  }

  changeBorderColor(tPanel, color) {
    this.taskPanel = tPanel;
    tPanel.style.border = `5px solid rgba(${color},0.5)`;
  }
}

export default new detailsTask();

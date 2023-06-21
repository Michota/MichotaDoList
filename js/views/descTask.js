import { conforms } from "lodash";
import View from "./view.js";

class descTask extends View {
  _data;
  _handler;
  _visibilityHandler;

  // #TODO: add project color to taks-panel

  generateMarkup(recivedData) {
    this._data = recivedData;
    return {
      data: this._data,
      markup: `
          <div class="task" data-id="">
            <button class="checkbox material-symbols-outlined"> circle </button>
            <div class="task-text task_text" contenteditable="true"></div>
            <button class="task-delete btn icon material-symbols-outlined">
              delete
            </button>
          </div>
          <div class="task-desc" contenteditable="true"></div>
      `,
    };
  }
}

export default new descTask();

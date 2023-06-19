import View from "./view.js";

class EditTask extends View {
  _data;
  _focusedElement = ".project-name";
  // FIXME: probably wrong parentelement selected
  _parentElement = this._data;

  test() {
    console.log(this._data);
  }
}

export default new EditTask();

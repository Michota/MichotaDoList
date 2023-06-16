import View from "./view.js";

class EditProject extends View {
  _data;
  _focusedElement = ".project-name";
  // FIXME: probably wrong parentelement selected
  _parentElement = this._data;

  test() {
    console.log(this._data);
  }
}

export default new EditProject();

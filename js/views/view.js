export default class View {
  _data;

  clearParent() {
    this._parentElement.innerHTML = "";
  }

  renderHTML(data) {
    this._data = data;
    this._parentElement.innerHTML = data;
  }

  addElementHTML(data) {
    this.data = data;
    this._parentElement.insertAdjacentHTML("beforeend", data);
  }

  renderError(error) {
    console.error(error);
  }
}

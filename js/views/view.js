export default class View {
  _data;

  clearParent() {
    this._parentElement.innerHTML = "";
  }

  renderHTML(data) {
    this._data = data;
    this.clearParent();
    this._parentElement.innerHTML = data;
  }

  renderError(error) {
    console.error(error);
  }
}

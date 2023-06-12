export default class View {
  _data;
  _editableElement;

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

  editInput(el) {
    // console.log(el);
    document.querySelector(el).addEventListener("keydown", function (ev) {
      if (ev.code === "Enter") {
        ev.preventDefault(); // Disable line-break
        ev.target.blur();
        console.log(ev.target.textContent);
      }
      console.log(ev.target);
    });
  }

  // Return element (el) if its in container ()
  selectElement = function (elContainer, el) {
    console.log(this);
    document
      .querySelector(elContainer)
      .addEventListener("click", function (ev) {
        // slice(1) is to remove dot from class name
        if (ev.target.classList.contains(el.slice(1))) {
          // console.log(editInput);
          console.log(_me);
        }
      });
  };
}

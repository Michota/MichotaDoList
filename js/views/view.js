export default class View {
  _data;
  _handler;
  _focusedElement;
  _buttons;
  _buttonToFocus;

  addUpdateHandler(h) {
    this._handler = h;
  }

  clearParent() {
    this._parentElement.innerHTML = "";
  }

  renderHTML(data) {
    this._data = data;
    this._parentElement.innerHTML = data;
  }

  addElementHTML(element) {
    this.data = element;
    // Insert Element Markup into chosen _parentElement
    this._parentElement.insertAdjacentHTML("beforeend", element.markup);
    // return newly created element
    return document.querySelector(`[data-id="${element.data.id}"]`);
  }

  createNewElement(handler, button = this._buttonToFocus) {
    const buttons = document.querySelector(this._buttons);

    buttons.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(button);
      if (!btn) return;
      handler();
    });
  }

  focusElement(element, specified = this._focusedElement) {
    console.log(this);
    element = element.querySelector(specified);
    if (element) {
      element.focus();
      const text = element.textContent;
      element.textContent = "";
      element.textContent = text;
    } else {
      element.focus();
    }
    return element;
  }

  renderError(error) {
    console.error(error);
  }

  // #TODO: Save on lostfocus/clicking on other things on page...
  editInput(inputField) {
    const wasEnterPressed = function (ev) {
      if (ev.code === "Enter" || ev.type === "focusout") {
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
}

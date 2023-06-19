export default class View {
  _data;
  _handler;
  _focusedElement;
  // _buttons;
  // _buttonToFocus;
  _buttonsGroup;
  _button;
  _parentElement;

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

  // addElementHTML(element) {
  //   this._data = element;
  //   // Insert Element Markup into chosen _parentElement
  //   this._parentElement.insertAdjacentHTML("beforeend", element.markup);
  //   // return newly created element
  //   return document.querySelector(`[data-id="${element.data.id}"]`);
  // }

  addElementHTML(element) {
    this._data = element;
    // Insert Element Markup into chosen _parentElement
    this._parentElement.insertAdjacentHTML("beforeend", element.markup);
    const newElement = document.querySelector(`[data-id="${element.data.id}"]`);
    // return newly created element
    return newElement;
  }

  focusElement(element) {
    // Focus element
    element.focus();
    // Make pointer at the begining of the text
    const text = element.textContent;
    element.textContent = "";
    element.textContent = text;
    return element;
  }

  renderError(error) {
    console.error(error);
  }

  editInput(inputField) {
    this._data = inputField;
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

export default class View {
  _data;
  _editableElement;
  _handler;

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

  focusElement(element, specified) {
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
        // console.log(ev, ev.target);
        ev.preventDefault(); // Disable line-break
        ev.target.blur(); // Lose focus
      }
      const output = ev.target;
      this._handler(output);
    };
    // ["keydown", "focus", "click"].forEach((ev) => {
    //   console.log("chuj");
    //   inputField.addEventListener(ev, wasEnterPressed.bind(this), );
    // });
    ["keydown", "focusout"].forEach((ev) =>
      inputField.addEventListener(ev, wasEnterPressed.bind(this))
    );
    // inputField.addEventListener("keydown", wasEnterPressed.bind(this), {});
    // inputField.addEventListener("focusout", wasEnterPressed.bind(this), {});
  }

  // Return element (el) if its in container ()
  // selectElement = function (elContainer, el) {
  // FIXME: it adds a new eventlistener with every click...
  // const returnClicked = function (ev) {
  //   // slice(1) is to remove dot from class name
  //   if (ev.target.classList.contains(el.slice(1))) {
  //     this.editInput(ev.target);
  //   }
  // };
  // // If element is clicked, then return it
  // document
  //   .querySelector(elContainer)
  //   // .addEventListener("click", returnClicked.bind(this));
  //   .addEventListener("click", returnClicked.bind(this));
  // };
}

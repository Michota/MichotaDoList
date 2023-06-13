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

  addElementHTML(element) {
    this.data = element;
    // Insert Element Markup into chosen _parentElement
    this._parentElement.insertAdjacentHTML("beforeend", element.markup);
    // return newly created element
    return document.querySelector(`[data-id="${element.data.id}"]`);
  }

  focusElement(element, specified) {
    const partOfElement = element.querySelector(specified);
    if (partOfElement) {
      partOfElement.focus();
      const text = partOfElement.textContent;
      partOfElement.textContent = "";
      partOfElement.textContent = text;
    } else {
      element.focus();
    }
  }

  renderError(error) {
    console.error(error);
  }

  editInput(inputField) {
    inputField.addEventListener("keydown", async function (ev) {
      if (ev.code === "Enter") {
        ev.preventDefault(); // Disable line-break
        ev.target.blur(); // Lose focus
        const output = await ev.target;
        // TODO: send output to model.js so it can update and save project info
        console.log(output);
        return output;
      }
    });
  }

  // Return element (el) if its in container ()
  selectElement = function (elContainer, el) {
    const returnClicked = function (ev) {
      // slice(1) is to remove dot from class name
      if (ev.target.classList.contains(el.slice(1))) {
        this.editInput(ev.target);
      }
    };

    // If element is clicked, then return it
    document
      .querySelector(elContainer)
      // .addEventListener("click", returnClicked.bind(this));
      .addEventListener("click", returnClicked.bind(this));
  };
}

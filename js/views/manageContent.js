import View from "./view.js";

class manageContent {
  mainPanel = document.querySelector(".main-panel");
  secondaryPanel = document.querySelector(".secondary-panel");

  elementVisibility(element, whatToDo = "toggle") {
    this.element = element;
    console.log(this);
    switch (whatToDo) {
      case "hide":
        element.classList.add("hidden");
        break;
      case "show":
        element.classList.remove("hidden");
        break;
      case "toggle":
        element.classList.toggle("hidden");
        break;
      default:
        element.classList.toggle("hidden");
    }
  }

  chooseSubPanel(calledPanel) {
    if (calledPanel === "task-panel" || calledPanel === "task")
      return `
    <div class="task-panel"></div>
    `;
  }

  changePanel(whichPanel = "secondary", innerPanelHTML) {
    console.log(whichPanel, innerPanelHTML);
    // Which panel to change?
    const chosenPanel =
      whichPanel === "secondary" ? this.secondaryPanel : this.mainPanel;
    // HTML of panel content that will be removed
    const previousContent = chosenPanel.innerHTML;
    chosenPanel.innerHTML = "";
    chosenPanel.insertAdjacentHTML("afterbegin", innerPanelHTML);
    // Return old content, so it can be stored by function that calls it.
    return previousContent;
  }
}

export default new manageContent();

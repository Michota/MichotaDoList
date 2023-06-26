import View from "./view.js";

class styleProject extends View {
  _data;
  pIcon = "project-icon";
  pMenu = "project-menu";

  changeColor(target, newColor) {
    let projectEl;

    if (target.classList.contains("project")) {
      projectEl = target;
    } else {
      projectEl = target.closest(".project");
    }
    projectEl.dataset.color = newColor;
    projectEl.style.backgroundColor = `rgba(${newColor},0.5)`;
    return projectEl;
  }

  changeIcon(target, newIcon) {
    let iconEl;
    if (target.classList.contains("project-icon")) {
      iconEl = target;
    } else {
      iconEl = target.closest(".project-icon");
    }
    iconEl.textContent = newIcon;
    return iconEl;
  }
}

export default new styleProject();

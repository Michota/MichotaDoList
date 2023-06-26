import View from "./view.js";

class styleProject extends View {
  _data;
  pIcon = "project-icon";
  pMenu = "project-menu";

  changeColor(target, newColor) {
    // if (ev.target.classList.contains('project')) ev.target
    let projectEl;

    if (target.classList.contains("project")) {
      projectEl = target;
    } else {
      projectEl = target.closest(".project");
    }
    projectEl.dataset.color = newColor;
    projectEl.style.backgroundColor = `rgba(${newColor},0.5)`;
    // Colored border version
    // projectEl.style.borderRight = `6px solid rgba(${newColor},1)`;
    // projectEl.style.borderBottom = `6px solid rgba(${newColor},1)`;
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

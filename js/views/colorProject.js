import View from "./view.js";

class colorProject extends View {
  _data;

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
}

export default new colorProject();

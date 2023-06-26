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
    return projectEl;
  }
}

export default new colorProject();

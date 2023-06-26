import { once } from "lodash";
import View from "./view.js";

class styleProject extends View {
  _data;
  pIcon = "project-icon";
  pMenu = "project-menu";

  openMenu(target, colorHandler, deleteHandler) {
    const markup = `
                <div class="menu-popup">
                  <div class="btn change_color"><span class="icon material-symbols-outlined">palette</span>Change Color</div>
                  <div class="btn delete_project"><span class="icon material-symbols-outlined">delete</span>Delete Project</div>
                  <div class="btn close_menu"><span class="icon material-symbols-outlined">close</span>Close Menu</div>
                </div>
    `;

    const projectEl = target.closest(".project");

    target.insertAdjacentHTML("afterend", markup);

    const menuEl = target.parentElement.querySelector(".menu-popup");
    const closeMenu = function (menu) {
      menu.outerHTML = "";
    };
    menuEl.addEventListener(
      "click",
      function (e) {
        const clicked = e.target;
        if (
          !clicked.classList.contains("btn") ||
          clicked.classList.contains("close_menu")
        )
          closeMenu(menuEl);
        if (clicked.classList.contains("change_color")) {
          colorHandler(e);
          closeMenu(menuEl);
        }
        if (clicked.classList.contains("delete_project")) {
          deleteHandler(e, projectEl);
          projectEl.outerHTML = "";
          closeMenu(menuEl);
        }
      },
      { once: true }
    );
  }

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

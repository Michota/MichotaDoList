import { bind } from "lodash";
import View from "./view.js";

class DeleteTask extends View {
  _data;
  _handler;
  _parentElement;
  _tasksList = ".project-tasks";
  _button = ".button_add_new_task";

  // Add Handler to Add New Task button and return the project where this button is located
  clearTaskData(trashIconBtn) {
    console.log(trashIconBtn);
    const taskEl = trashIconBtn.closest(".task");
    const clearedData = {
      id: Number(taskEl.dataset.id),
      taskName: "",
      description: "",
      done: false,
    };
    console.log(taskEl);
    taskEl.outerHTML = "";
    return clearedData;
  }

  listenToBtns() {}
}

export default new DeleteTask();

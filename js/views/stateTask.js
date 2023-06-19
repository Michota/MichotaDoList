import View from "./view.js";

class stateTask extends View {
  _data;
  _parentElement = ".task_text";
  _taskNameEl = ".task_text";

  selectTaskName(taskEl) {
    const taskName = taskEl.querySelector(this._taskNameEl);
    return taskName;
  }

  getTaskId(element) {
    const taskEl = element.closest(".task");
    return Number(taskEl.dataset.id);
  }

  changeStatus = function (element) {
    const data = {};
    return data;
  };
}

export default new stateTask();

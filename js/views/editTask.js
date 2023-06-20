import View from "./view.js";

class EditTask extends View {
  _data;
  _parentElement = ".project-tasks";
  _taskNameEl = ".task_text";
  _taskEl = "task";
  _checkbox = "checkbox";
  _markedCheckbox = "marked";

  selectTaskName(taskEl) {
    const taskName = taskEl.querySelector(this._taskNameEl);
    return taskName;
  }

  getTaskId(element) {
    const taskEl = element.closest(`.${this._taskEl}`);
    return Number(taskEl.dataset.id);
  }

  getTaskData = function (element) {
    console.log(element.textContent);
    const checkbox = element
      .closest(`.${this._taskEl}`)
      .querySelector(`.${this._checkbox}`);

    const data = {
      id: this.getTaskId(element),
      taskName: (
        element.closest(this._taskNameEl) ??
        element.querySelector(this._taskNameEl)
      ).textContent,
      done: checkbox.classList.contains(`${this._markedCheckbox}`)
        ? true
        : false,
    };
    return data;
  };

  // working
  // getTaskData = function (element) {
  //   const checkbox = element
  //     .closest(`.${this._taskEl}`)
  //     .querySelector(`.${this._checkbox}`);

  //   const data = {
  //     id: this.getTaskId(element),
  //     taskName: element.closest(this._taskNameEl).textContent,
  //     done: checkbox.classList.contains(`${this._markedCheckbox}`)
  //       ? true
  //       : false,
  //   };
  //   return data;
  // };
}

export default new EditTask();

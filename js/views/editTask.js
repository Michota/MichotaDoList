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

  getTaskData = function (taskTextEl, desc) {
    const taskEl = taskTextEl.closest(".task");
    console.log(taskEl);
    const checkbox = taskTextEl.closest(".task").querySelector(".checkbox");

    const taskData = {
      checkbox: taskEl.closest(".checkbox"),
      id: this.getTaskId(taskEl),
      taskName: taskEl.querySelector(".task_text").textContent,
      done: checkbox.classList.contains("marked") ? true : false,
      description: desc(this.getTaskId(taskEl)).description,
    };

    return taskData;
  };

  getTaskId(element) {
    const taskEl = element.closest(".task");
    return Number(taskEl.dataset.id);
  }

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

import _, { find } from "lodash";

export const state = {
  project: {
    id: 0,
    projectName: "",
    icon: "",
    tasks: [],
  },
  task: {
    id: 0,
    taskName: "",
    description: "",
  },
  projectsArr: [],
};

// Create project object
export const createProject = function (loadedData) {
  let project = {};
  // console.log(loadedData);
  if (!loadedData) {
    project.id = createId();
    // TODO: change 'terminal' to icon selected by user
    project.icon = "terminal";
    project.projectName = "";
    project.tasks = [];
    state.projectsArr.push(project);
  } else {
    project.id = loadedData.id;
    // TODO: change 'terminal' to icon selected by user
    project.icon = loadedData.icon;
    project.projectName = loadedData.projectName;
    project.tasks = loadedData.tasks;
  }
  // Save project to array
  // checkState();
  return project;
};

// Create task object
export const createTask = function (projectId, loadTask) {
  let task;
  if (!loadTask) {
    console.log("new");
    const project = findProject(projectId, "object");
    if (typeof project !== "object") return;
    task = {
      id: createId(),
      taskName: "",
      description: "",
      done: false,
    };
    project.tasks.push(task);
  } else {
    const project = findProject(projectId, "object");
    if (typeof project !== "object") return;
    task = {
      id: loadTask.id,
      taskName: loadTask.taskName,
      description: loadTask.description,
      done: loadTask.done,
    };
  }
  return task;
};

export const removeTaskFromProject = function (taskId) {
  const project = findProjectOfTask(taskId);
  project.tasks = project.tasks.filter((pTask) => pTask.id !== taskId);
  // state.projectsArr[findProject(project.id)].tasks.findIndex(el => el.id === taskId)
};

// Edit task name and description, then return THE SAME task object
export const editTask = function (taskId, data) {
  const task = findTask(taskId);

  task.taskName = data.taskName;
  task.description = data.description;
  task.done = data.done;

  return task;
};

// Find project (by deafult it retruns project index inside projectArr)
const findProject = function (projectId, searchType = "index") {
  let projectToFind;
  if (searchType === "index") {
    projectToFind = state.projectsArr.findIndex((el) => el.id === projectId);
  } else if (searchType === "object") {
    projectToFind = state.projectsArr.find((el) => el.id === projectId);
  }
  if (projectToFind === -1) return "Nothing was found";
  else return projectToFind;
};

// Find the project by task.id that it is assigned to
const findProjectOfTask = function (taskId) {
  const project = state.projectsArr.find((project) =>
    project.tasks.find((task) => task.id === taskId)
  );
  return project;
};

// Find task (if both taskId and projectId were entered, it returns object with {task,project})
export const findTask = function (taskId, projectId) {
  const project = findProjectOfTask(taskId);
  if (projectId && project.id !== projectId)
    return "This project does not contain this task!";

  const task = project.tasks.find((task) => task.id === taskId);

  // if projectId is empty, then do not return project that contains this tasks.
  if (task === -1) return "Nothing was found"; // if no task was found
  if (projectId) return { task, project };
  // return both task and project objects if projectId was entered
  else return task;
};

// Create new ID
const createId = function (arrToCheck = state.projectsArr) {
  // generate 4 digits number, that does not starts with "0"
  const generateNumber = function () {
    let generatedNumber;
    for (let i = 0; i < 1; i = i) {
      let num = Math.random().toString().slice(-4);
      if (num[0] !== "0" && num.length === 4) {
        i++;
        generatedNumber = Number(num);
      } else {
        i = 0;
      }
    }
    return generatedNumber;
  };
  const newId = generateNumber();

  // Check if ID is not already used by another object
  if (checkIdUnique(arrToCheck, newId)) {
    return newId;
  } else {
    return createId();
  }
};

const checkIdUnique = function (arr, id) {
  // take IDs out of array
  const iDs = arr.map((el) => el.id);
  return iDs.find((el) => el === id) ? false : true;
  // if ID is unique, then return TRUE
};

export const updateProjectName = function (projectNameEl, projectId) {
  const project = findProject(projectId, "object");
  project.projectName = projectNameEl.textContent;
};

// Save in Local Storage

export const saveProjects = function (projects = state.projectsArr) {
  localStorage.setItem("projects", JSON.stringify(projects));
};

export const loadProjects = function () {
  const projects = JSON.parse(localStorage.getItem("projects"));
  state.projectsArr = projects === null ? [] : projects;
  return state.projectsArr;
};

export const clearProjects = function () {
  state.projectsArr = [];
  localStorage.clear();
};

// Load from LocalStorage

// TEST REASONS ONLY

const checkState = function () {
  console.log(state);
};

// --------------------- REMOVE LATER
const devBtn = document.querySelector(".logout-btn");
devBtn.addEventListener("click", function () {
  console.log("dev button clicked");
});
export const devFun = function () {
  checkState();
};
// --------------------- end of REMOVE LATER

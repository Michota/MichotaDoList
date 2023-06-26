import _, { find } from "lodash";
import iconNames from "../iconNames.json";

export const state = {
  project: {
    id: 0,
    projectName: "",
    icon: "",
    color: "",
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
  if (!loadedData) {
    project.id = createId();
    // TODO: change 'terminal' to icon selected by user
    project.icon = "add_reaction";
    project.projectName = "";
    project.tasks = [];
    project.color = randomColor();
    state.projectsArr.push(project);
  } else {
    project.id = loadedData.id;
    project.icon = loadedData.icon;
    project.projectName = loadedData.projectName;
    project.tasks = loadedData.tasks;
    project.color = loadedData.color;
  }
  // Save project to array
  return project;
};

export const changeProjectColor = function (
  projectId,
  newColor = randomColor()
) {
  const project = findProject(projectId, "object");
  project.color = newColor;
  return newColor;
};

export const changeProjectIcon = function (projectId, newIcon = randomIcon()) {
  console.log(projectId, newIcon.iconName);
  const project = findProject(projectId, "object");
  project.icon = newIcon.iconName;
  return newIcon;
};

const randomColor = function () {
  let colorarr = [];
  for (let i = 0; i < 3; i++) {
    let color = Math.floor(Math.random() * (170 - 90 + 1) + 90);

    colorarr[i] = color;
  }
  return colorarr.join(", ");
};

// Create task object
export const createTask = function (projectId, loadTask) {
  let task;
  if (!loadTask) {
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
};

export const removeProject = function (projectId) {
  const projectIndex = findProject(projectId);
  state.projectsArr = state.projectsArr
    .slice(0, projectIndex)
    .concat(state.projectsArr.slice(projectIndex + 1));
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
  projectId = Number(projectId);
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
export const findProjectOfTask = function (taskId) {
  taskId = Number(taskId);
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
  console.log("Local Storage (and so the projects) Cleared!");
  state.projectsArr = [];
  localStorage.clear();
};

export const randomIcon = function () {
  const iconIndex = Math.floor(Math.random() * (iconNames.length - 1 + 1) + 1);
  return {
    iconName: iconNames[iconIndex],
    iconIndex: iconIndex,
  };
};

// TEST REASONS ONLY

const checkState = function () {
  console.log(state);
};

// --------------------- REMOVE LATER
const devBtn = document.querySelector(".logout-btn");
devBtn.addEventListener("click", function () {
  devFun();
});
export const devFun = function () {
  clearProjects();
  location.reload();
};
// --------------------- end of REMOVE LATER

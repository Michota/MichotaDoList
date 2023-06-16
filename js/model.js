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
  projectsArr: [
    {
      id: 2137,
      projectName: "papiez",
      icon: "terminal",
      tasks: [
        {
          id: 6666,
          taskName: "demon",
          description: "demoniczny papiez",
        },
      ],
    },
    { id: 1000, projectName: "test", icon: "terminal", tasks: [] },
  ],
};

// Create project object
export const createProject = function (nameInput = "", iconInput = "terminal") {
  const project = {
    id: createId(),
    // TODO: change 'terminal' to icon selected by user
    icon: iconInput,
    projectName: nameInput,
    tasks: [],
  };
  // Save project to array
  state.projectsArr.push(project);
  // checkState();
  return project;
};

// Create task object
export const createTask = function (nameInput = "") {
  const task = {
    id: createId(),
    taskName: nameInput,
    description: "",
  };
  // Save project to array
  state.projectsArr.push(task);
  // checkState();
  if (-1) return "Nothing was found";
  else return project;
};

const editTask = function (taskId) {
  const task = findTask(taskId);
};

// Find project (by deafult it retruns project index)
const findProject = function (projectId, searchType = "index") {
  let projectToFind;
  if (searchType === "index") {
    projectToFind = state.projectsArr.findIndex((el) => el.id === projectId);
  }
  if (projectToFind === -1) return "Nothing was found";
  else return projectToFind;
};

// Find task (if both taskId and projectId were entered, it returns array of objects [task,project])
const findTask = function (taskId, projectId) {
  // const tasks = state.projectsArr.map((project) => project.tasks);
  const project = state.projectsArr.find((project) =>
    project.tasks.find((task) => task.id === taskId)
  );
  console.log(project.id, projectId);
  if (projectId && project.id !== projectId)
    return "This project does not contain this task!";

  const task = project.tasks.find((task) => task.id === taskId);

  // if projectId is empty, then do not return project that contains this tasks.
  if (task === -1) return "Nothing was found"; // if no task was found
  if (projectId) return [task, project];
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

const elementToObject = function (element, type) {
  if (type === "project") {
    const el = element.closest(".project");

    const projectObj = {
      id: Number(el.dataset.id),
      projectName: el.querySelector(".project-name").textContent,
      icon: el.querySelector(".project-icon").textContent,
    };

    state.project = _.cloneDeep(projectObj);

    // console.log(state.project);
  } else {
    // task
  }
};

// Update Project data

export const updateProjectName = function (project) {
  elementToObject(project, "project");
  const projectToEdit = state.projectsArr.findIndex(
    (el) => el.id === state.project.id
  );
  state.projectsArr[projectToEdit] = state.project;
  checkState();
};

// TEST REASONS ONLY

const checkState = function () {
  console.log(state);
};

// --------------------- REMOVE LATER
const devBtn = document.querySelector(".logout-btn");
console.log(devBtn);
devBtn.addEventListener("click", function () {
  console.log("working");
});
// console.log(findTask(6666));
export const devFun = function () {
  checkState();
};
// --------------------- end of REMOVE LATER

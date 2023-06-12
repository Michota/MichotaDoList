export const state = {
  project: {
    id: 0,
    projectName: "",
    icon: "",
    tasks: [],
  },
  projectsArr: [],
};

export const test = function () {};

// Create project object
export const createProject = function (nameInput, iconInput = "terminal") {
  const project = {
    id: createId(),
    // TODO: change 'terminal' to icon selected by user
    icon: iconInput,
    projectName: nameInput,
    tasks: [],
  };
  // Save project to array
  state.projectsArr.push(project);
  return project;
};

// Add Project to projectsArr

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

// changes

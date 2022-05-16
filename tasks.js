const dataBase = [
  {
    taskName: "Clean shower",
    lastDate: "12/04/2022",
    interval: "monthly",
    reminder: "Off",
    category: "Cleaning",
  },
  {
    taskName: "Change the sheets",
    lastDate: "29/04/2022",
    interval: "biweekly",
    reminder: "On",
    category: "Cleaning",
  },
  {
    taskName: "Change AC filter",
    lastDate: "01/11/2021",
    interval: "yearly",
    reminder: "On",
    category: "Misc",
  },
  {
    taskName: "Clean living room",
    lastDate: "05/03/2022",
    interval: "monthly",
    reminder: "Off",
    category: "Cleaning",
  },
  {
    taskName: "Mow lawn",
    lastDate: "07/05/2022",
    interval: "none",
    reminder: "Off",
    category: "Garden",
  },
];

/* Make example table from array data*/

const tasksSection = document.getElementById("tasks-container");

function makeTable(tableBody) {
  tableBody = document.querySelector("#taskData");
  let tr, td;
  const result = dataBase.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.taskName === thing.taskName)
  );
  console.log(result);
  tableBody.innerHTML = "";
  for (let i = 0; i < result.length; i++) {
    tr = tableBody.insertRow(tableBody.rows.length);
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `${result[i].taskName}`;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = result[i].lastDate;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = result[i].interval;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = result[i].reminder;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `<button class='didItBtn'>I did it!</button>`;
  }
  //make inputrow
  const inputRow = tableBody.insertRow();
  inputRow.insertCell().innerHTML = `<input type="text" id="taskInput" placeholder="add new task here">`;
  inputRow.insertCell().innerHTML = ``;
  inputRow.insertCell().innerHTML = `<select name="intervalSelect" id="intervalSelect">
      <option value="" disabled selected hidden>Choose interval</option>
      <option value="none">Choose interval</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="biweekly">Every other week</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>`;
  inputRow.insertCell().innerHTML = `<label for="reminderCheck">Remind you?</label>
      <input type="checkbox" id="reminderCheck" />`;
  inputRow.insertCell().innerHTML = `<button id='addTaskBtn'>Add task</button>`;

  //set id to all rows
  let rows = document.querySelectorAll("tr");
  let counter = 0;
  for (let j = 0; j < rows.length; j++) {
    counter++;
    rows[j].setAttribute("id", counter);
  }
  addTask();
  doneBtnFunc();

  /* dataBase.filter((obj, index) => {
    let uniqueEntry = dataBase.indexOf(obj) === index;
    for (let k = 0; k < dataBase.length; k++) {
      const entry = dataBase[k];
      if(entry)
      delete entry;
    }
  }); */
}

makeTable();

//set new date in "last-done-cell" when clicking "I did it!"
function doneBtnFunc() {
  const tableBody = document.querySelector("#taskData");
  const buttons = tableBody.querySelectorAll(".didItBtn");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", (e) => {
      const clickedTask = e.target.parentElement.parentElement;
      const clickedTaskID = clickedTask.id;
      const objNum = parseInt(clickedTaskID - 2);
      const currentDate = new Date().toLocaleDateString("en-GB");
      dataBase[objNum].lastDate = currentDate;
      clickedTask.childNodes[1].innerHTML = dataBase[objNum].lastDate;
    });
  }
}

//handle ADD TASK

const newTaskObj = {};
function addTask() {
  const addTaskButton = document.querySelector("#addTaskBtn");
  addTaskButton.addEventListener("click", (e) => {
    const target = e.target;
    const targetRow = target.parentElement.parentElement;
    for (let i = 0; i < targetRow.childNodes.length; i++) {
      const cell = targetRow.childNodes[i];
      for (let j = 0; j < cell.childNodes.length; j++) {
        const cellInner = cell.childNodes[j];
        switch (cellInner.id) {
          case "taskInput":
            let newValue = cellInner.value;
            newTaskObj.taskName = newValue;
            break;
          case "intervalSelect":
            const selectedOption =
              cellInner.options[cellInner.selectedIndex].value;
            newTaskObj.interval = selectedOption;
            break;
          case "reminderCheck":
            newTaskObj.reminder = cellInner.value;
            break;
          case "addTaskBtn":
            console.log(cellInner.value);
            break;

          default:
            newTaskObj.lastDate = "Not done yet";
            break;
        }
      }
      console.log(newTaskObj);
      console.log(dataBase);
    }
    dataBase.push(newTaskObj);

    makeTable();
  });
}

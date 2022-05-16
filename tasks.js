const dataBase = [
  {
    taskName: "Clean shower",
    lastDate: "12/04/2022",
    interval: "monthly",
    reminder: "No",
    category: "Cleaning",
  },
  {
    taskName: "Change the sheets",
    lastDate: "29/04/2022",
    interval: "biweekly",
    reminder: "Yes",
    category: "Cleaning",
  },
  {
    taskName: "Change AC filter",
    lastDate: "01/11/2021",
    interval: "yearly",
    reminder: "Yes",
    category: "Misc",
  },
  {
    taskName: "Clean living room",
    lastDate: "05/03/2022",
    interval: "monthly",
    reminder: "No",
    category: "Cleaning",
  },
  {
    taskName: "Mow lawn",
    lastDate: "07/05/2022",
    interval: "none",
    reminder: "No",
    category: "Garden",
  },
];

/* Make example table from array data*/

const tasksSection = document.getElementById("tasks-container");

function makeTable(tableBody) {
  tableBody = document.querySelector("#taskData");
  let tr, td;

  for (let i = 0; i < dataBase.length; i++) {
    tr = tableBody.insertRow(tableBody.rows.length);
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `${dataBase[i].taskName}`;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = dataBase[i].lastDate;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = dataBase[i].interval;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = dataBase[i].reminder;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `<button class='didItBtn'>I did it!</button>`;
  }
  //make inputrow
  const inputRow = tableBody.insertRow();
  const taskNameInput =
    (inputRow.insertCell().innerHTML = `<input type="text" id="taskInput" placeholder="add new task here">`);
  const taskDateDone = (inputRow.insertCell().innerHTML = ``);
  const taskIntInput =
    (inputRow.insertCell().innerHTML = `<select name="intervalSelect" id="intervalSelect">
  <option value="" disabled selected hidden>Choose interval</option>
  <option value="none">Choose interval</option>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="biweekly">Every other week</option>
  <option value="monthly">Monthly</option>
  <option value="yearly">Yearly</option>
</select>`);
  const taskRemind =
    (inputRow.insertCell().innerHTML = `<label for="reminderCheck">Remind you?</label>
  <input type="checkbox" id="reminderCheck" />`);
  const taskInputBtn =
    (inputRow.insertCell().innerHTML = `<button id='addTaskBtn'>Add task</button>`);
  //set id to all rows
  let rows = document.querySelectorAll("tr");
  let counter = 0;
  for (let j = 0; j < rows.length; j++) {
    counter++;
    rows[j].setAttribute("id", counter);
  }
  addTask();
}
makeTable(dataBase);

//set new date in "last-done-cell" when clicking done
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
    console.log(clickedTask);
    clickedTask.childNodes[1].innerHTML = dataBase[objNum].lastDate;
  });
}
//handle add task

function addTask() {
  const addTaskButton = document.querySelector("#addTaskBtn");
  addTaskButton.addEventListener("click", (e) => {
    const target = e.target;
    const targetRow = target.parentElement.parentElement;
    /*     console.log(targetRow.childNodes);
     */ for (let i = 0; i < targetRow.childNodes.length; i++) {
      const cell = targetRow.childNodes[i];
      /*       console.log(cell);
      console.log(cell.childNodes);
      
 */ const newTaskObj = {};
      for (let j = 0; j < cell.childNodes.length; j++) {
        const cellInner = cell.childNodes[j];
        console.log(cellInner.id);
        switch (cellInner.id) {
          case "taskInput":
            let newValue = cellInner.value;
            console.log(cellInner.value);
            newTaskObj.taskName = newValue;
            console.log(newTaskObj);
            break;
          case "intervalSelect":
            console.log("this is interval");
            console.log(cellInner.value);
            break;
          case "reminderCheck":
            console.log("this is reminder");
            console.log(cellInner.value);
            break;
          case "addTaskBtn":
            console.log("this is the button");
            console.log(cellInner.value);
            break;

          default:
            console.log("i have noe value");
            break;
        }
        /* if (cell.firstChild == "taskInput") {
            console.log("Task");
          } */
      }
    }
  });
}

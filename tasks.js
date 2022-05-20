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
//store the dataBase array in localStorage
localStorage.setItem = dataBase;

/* Make example table from array data*/

function makeTable(tableBody) {
  tableBody = document.querySelector("#taskData");
  let tr, td;
  //filter out duplicate tasks //!Remove or move? No need after new task is own function
  const result = localStorage.setItem.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.taskName === thing.taskName)
  );
  /*   tableBody.innerHTML = "";
   */ for (let i = 0; i < result.length; i++) {
    tr = tableBody.insertRow(tableBody.rows.length);
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `${result[i].taskName}`;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `${result[i].lastDate}`;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = result[i].interval;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = result[i].reminder;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `<button class='didItBtn'>I did it!</button>`;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = `<button class='delBtn'></button>`;
  }
  makeInputRow();
  setIdToRows();
  addTask();
  doneBtnFunc();
  delBtn();
}

makeTable();

const currentDate = new Date().toLocaleDateString("en-GB");
//set new date in "last-done-cell" when clicking "I did it!"
function doneBtnFunc() {
  const tableBody = document.querySelector("#taskData");
  const buttons = tableBody.querySelectorAll(".didItBtn");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", (e) => {
      setIdToRows();
      const clickedTask = e.target.parentElement.parentElement;
      const clickedTaskID = clickedTask.id;
      const objNum = parseInt(clickedTaskID - 2);
      console.log(localStorage.setItem[objNum]);
      localStorage.setItem[objNum].lastDate = currentDate;
      clickedTask.childNodes[1].innerHTML = dataBase[objNum].lastDate;
      clickedTask.childNodes[1].style.backgroundColor = "var(--light-green)";
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
            if (cellInner.checked) {
              newTaskObj.reminder = "On";
            } else {
              newTaskObj.reminder = "Off";
            }
            break;
          case "addTaskBtn":
            break;
          default:
            newTaskObj.lastDate = "Not done yet";
            break;
        }
      }
    }
    const root = document.querySelector(":root");
    if (newTaskObj.taskName.length > 0) {
      dataBase.push(newTaskObj);
      localStorage.setItem.push(newTaskObj);
      root.style.setProperty("--placeholder-color", "grey");
      const tableBody = document.querySelector("#taskData");
      tr = tableBody.insertRow();
      td = tr.insertCell();
      td.innerHTML = `${newTaskObj.taskName}`;
      td = tr.insertCell();
      td.innerHTML = `${newTaskObj.lastDate}`;
      td = tr.insertCell();
      td.innerHTML = newTaskObj.interval;
      td = tr.insertCell();
      td.innerHTML = newTaskObj.reminder;
      td = tr.insertCell();
      td.innerHTML = `<button class='didItBtn'>I did it!</button>`;
      td = tr.insertCell(tr.cells.length);
      td.innerHTML = `<button class='delBtn'></button>`;

      removeOldInput();
      makeInputRow();
      addTask();
      doneBtnFunc();
      delBtn();
    } else {
      const taskInput = document.querySelector("#taskInput");
      taskInput.setAttribute("placeholder", "Please add a task name");
      root.style.setProperty("--placeholder-color", "red");
    }
  });
  console.log(localStorage.setItem.length);
}

//visually display overdue tasks
function overdueTask() {
  const taskList = document.querySelector("#taskData");
  const rows = taskList.querySelectorAll("tr");

  //loops through all rows displayed minus input row
  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i];
    const intervalCell = row.cells[2].innerText;
    const taskLastDone = row.cells[1].innerText;
    console.log(intervalCell);
    console.log(taskLastDone);

    const daily = 1;
    const weekly = 7;
    const biweekly = 14;
    const monthly = 30;
    const yearly = 365;
    const today = currentDate;
    const todayDay = today.substr(0, 2);
    const todayMonth = today.substr(3, 2);
    const todayYear = today.substr(8, 2);
    const lastDoneDay = taskLastDone.substr(0, 2);
    const lastDoneMonth = taskLastDone.substr(3, 2);
    const lastDoneYear = taskLastDone.substr(8, 2);

    let yearsSince = 0;
    let monthsSince = 0;
    let daysSince = 0;
    yearsSince = (parseInt(todayYear) - parseInt(lastDoneYear)) * 365;
    monthsSince = (parseInt(todayMonth) - parseInt(lastDoneMonth)) * 30;
    daysSince = parseInt(todayDay) - parseInt(lastDoneDay);

    const timePassed = yearsSince + monthsSince + daysSince;
    let daysSinceDueDate = 0;
    switch (intervalCell) {
      case "daily":
        daysSinceDueDate = timePassed - daily;
        break;
      case "weekly":
        daysSinceDueDate = timePassed - weekly;
        break;
      case "biweekly":
        daysSinceDueDate = timePassed - biweekly;
        break;
      case "monthly":
        daysSinceDueDate = timePassed - monthly;
        break;
      case "yearly":
        daysSinceDueDate = timePassed - yearly;
        break;

      default:
        break;
    }
    console.log(daysSinceDueDate);
    if (daysSinceDueDate > 0) {
      row.cells[1].style.backgroundColor = "pink";
    } else {
      row.cells[1].style.backgroundColor = "var(--light-green)";
    }
  }
}
overdueTask();

function setIdToRows() {
  let rows = document.querySelectorAll("tr");
  let counter = 0;
  for (let j = 0; j < rows.length; j++) {
    counter++;
    rows[j].setAttribute("id", counter);
  }
}
function makeInputRow() {
  const tableBody = document.querySelector("#taskData");

  const inputRow = tableBody.insertRow();
  inputRow.setAttribute("class", "inputrow");
  inputRow.insertCell().innerHTML = `<input type="text" id="taskInput" placeholder="add new task here" >`;
  inputRow.insertCell().innerHTML = ``;
  inputRow.insertCell().innerHTML = `<select name="intervalSelect" id="intervalSelect">
      <option value="" disabled selected hidden>Choose interval</option>
      <option value="none" disabled class="disabled-select">Choose interval</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="biweekly">Every other week</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>`;
  inputRow.insertCell().innerHTML = `<label for="reminderCheck" hidden>Remind you?</label>
      <input type="checkbox" id="reminderCheck" />`;
  inputRow.insertCell().innerHTML = `<button id='addTaskBtn'>Add task</button>`;
}
//*should solve this without removing and adding new row
function removeOldInput() {
  const oldInputRow = document.querySelector(".inputrow");
  console.log(oldInputRow);
  oldInputRow.remove();
}
//adds listeners and function to delete-task buttons
function delBtn() {
  const delBtns = document.querySelectorAll(".delBtn");
  for (let i = 0; i < delBtns.length; i++) {
    const btn = delBtns[i];
    btn.addEventListener("click", (e) => {
      const clickedTask = e.target.parentElement.parentElement;
      clickedTask.remove();
    });
  }
}

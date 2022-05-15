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
    td.innerHTML = `<button>I did it!</button>`;
  }
  //make inputrow
  const inputRow = tableBody.insertRow();
  console.log(inputRow);
  const taskNameInput = (inputRow.insertCell().innerHTML = `YO!`);

  //set id to all rows
  let rows = document.querySelectorAll("tr");
  let counter = 0;
  for (let j = 0; j < rows.length; j++) {
    counter++;
    rows[j].setAttribute("id", counter);
  }
}
makeTable(dataBase);

//set new date in "last-done-cell" when clicking done
const tableBody = document.querySelector("#taskData");
const buttons = tableBody.querySelectorAll("button");
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

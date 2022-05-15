const dataBase = [
  {
    taskName: "Clean shower",
    lastDate: "12.04.2022",
    interval: "monthly",
    reminder: false,
    category: "Cleaning",
  },
  {
    taskName: "Change the sheets",
    lastDate: "29.04.2022",
    interval: "biweekly",
    reminder: true,
    category: "Cleaning",
  },
  {
    taskName: "Change AC filter",
    lastDate: "01.11.2021",
    interval: "yearly",
    reminder: true,
    category: "Misc",
  },
  {
    taskName: "Clean living room",
    lastDate: "05.03.2022",
    interval: "monthly",
    reminder: false,
    category: "Cleaning",
  },
  {
    taskName: "Mow lawn",
    lastDate: "07.05.2022",
    interval: "none",
    reminder: false,
    category: "Garden",
  },
];

/* Make example table */
//th= table head
//td= table data
//tr= table row

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
    td.innerHTML = `<button>Done!</button>`;
  }
  //set id to all rows
  let rows = document.querySelectorAll("tr");
  let counter = 0;
  for (let j = 0; j < rows.length; j++) {
    counter++;
    rows[j].setAttribute("id", counter);
    /*     dataBase[counter].id = counter;
     */
  }
}
makeTable(dataBase);
//set new date in "last-done-cell" when clicking done

const buttons = tasksSection.querySelectorAll("button");
for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  console.log(button.parentElement.parentElement.id);
  button.addEventListener("click", (e) => {
    const clickedTask = e.target.parentElement.parentElement;
    const clickedTaskID = clickedTask.id;
    const objNum = parseInt(clickedTaskID - 2);
    console.log(dataBase[objNum]);
    const currentDate = new Date().toLocaleDateString("en-GB");
    console.log(currentDate);
    dataBase[objNum].lastDate = currentDate;
    console.log(clickedTask);
    clickedTask.childNodes[1].innerHTML = dataBase[objNum].lastDate;
  });
}

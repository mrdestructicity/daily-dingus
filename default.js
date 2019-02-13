function temporalizer() {
  // GET A NEW DATE
  theDate = new Date();
  x = theDate.getDay();
  y = theDate.getHours();
  z = (60 - theDate.getMinutes());

  // UPDATE DATE DISPLAY
  document.querySelector("p#date").innerHTML = `
    <span id="month">${theDate.toLocaleString("en-us",{ month: "short" })}</span>
    <span id="day">${theDate.toLocaleString("en-us",{ day: "2-digit" })}</span>
  `;

  // REMOVE ALL SET ITEMS
  document.querySelectorAll(".shown").forEach(function(elem) {
    elem.classList.remove("shown");
  });

  // TOGGLE CONTENT BY DAY OF WEEK

  document.querySelectorAll(".d" + x).forEach(function(elem) {
    elem.classList.add("shown");
  });

  // TOGGLE CONTENT BY HOUR
  switch (true) {
    case (y == 0):
      yy = "00";
      document.querySelectorAll(".visited").forEach(function(elem) {
        elem.classList.remove("visited");
      });
      document.querySelectorAll("input").forEach(function(elem) {
        elem.checked = false;
      });
      break;
    case (y < 9):
      yy = "00";
      break; 
    case ((y >= 9) && (y < 17)):
      yy = "09";
      break; 
    case (y >= 17):
      yy = "17";
      break; 
  }
  document.querySelectorAll(".t" + yy).forEach(function(elem) {
    elem.classList.add("shown");
  });

  // DO THIS ALL AGAIN AT THE TOP OF THE NEXT HOUR
  // alert("Next refresh in " + z + " minutes");
  setTimeout(temporalizer,(z * 60 * 1000));
};
temporalizer();

// BLUR OUT CONTENT ON LINK OR CHECKBOX CLICKS

document.querySelectorAll("a[href], input[type='checkbox']").forEach(function(elem) {
  elem.addEventListener("click",function(event) {
    this.parentNode.classList.add("visited");
  });
});

// TEMPORARY TASKS

var tasks = new Array();

function delist(task) {
  tasks =  tasks.filter(item => item !== task)
  redrawTasks(tasks);
}

function redrawTasks(tasks) {
  let newList = "";
  if(tasks.length > 0) {
    tasks.forEach(function(element) {
      newList += `<li><input type="checkbox" value="${element}">${element}</li>`;
    });
  }
  document.querySelector("ul.temporary").innerHTML = newList;
  document.querySelectorAll("ul.temporary input[type='checkbox']").forEach(function(elem) {
    elem.addEventListener("click",function(event) {
      delist(this.value);
    });
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

// Check for Items
if (localStorage.length > 0) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  redrawTasks(tasks);
} 

// BUTTON CLICK EVENTS
document.querySelector("button#add").addEventListener("click",function(event) {
  event.preventDefault();
  newTask = document.getElementById("task");
  if (newTask.value != "") {
    tasks.push(newTask.value);
    newTask.value = "";
  }
  redrawTasks(tasks);
  return false;
});

document.querySelector("button#clear").addEventListener("click",function(event) {
  event.preventDefault();
  tasks.length = 0;
  localStorage.clear();
  redrawTasks(tasks);
  return false;
});

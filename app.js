const workouts = {
w1:{name:"Full Body A",ex:[
["Leg Press","4x8-12"],
["Chest Press","4x8-12"],
["Lat Pulldown","4x8-12"]
]},
w2:{name:"Fat Loss",ex:[
["Incline Walk","25 min"],
["Squats","4x12"]
]},
w3:{name:"Upper Body",ex:[
["Dumbbell Press","3x10"],
["Rows","4x10"]
]},
w4:{name:"Recovery",ex:[
["Steps","8000"]
]},
w5:{name:"Full Body B",ex:[
["Squat","4x10"],
["Bench Press","4x8"]
]},
w6:{name:"HIIT",ex:[
["Burpees","5x10"],
["Pushups","5x10"]
]}
};

let stack = ["home"];
let logs = JSON.parse(localStorage.getItem("logs")) || [];

/* NAV STACK */
function go(page){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(page).classList.add("active");

stack.push(page);

document.getElementById("backBtn").style.display =
stack.length > 1 ? "block" : "none";
}

/* BACK */
function back(){
if(stack.length <= 1) return;

stack.pop();
let page = stack[stack.length - 1];

document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(page).classList.add("active");

document.getElementById("backBtn").style.display =
stack.length > 1 ? "block" : "none";
}

/* LOAD DROPDOWN */
window.onload = () => {
let sel = document.getElementById("todayWorkout");

Object.keys(workouts).forEach(k=>{
let opt = document.createElement("option");
opt.value = k;
opt.innerText = workouts[k].name;
sel.appendChild(opt);
});
};

/* OPEN WORKOUT FROM SELECT */
function openWorkoutFromSelect(){
let id = document.getElementById("todayWorkout").value;
let w = workouts[id];

go("workoutDetail");

document.getElementById("wtitle").innerText = w.name;

let box = document.getElementById("exercises");
box.innerHTML = "";

w.ex.forEach(e=>{
let div = document.createElement("div");
div.className="card";
div.innerHTML = `<b>${e[0]}</b><br>${e[1]}`;
box.appendChild(div);
});
}
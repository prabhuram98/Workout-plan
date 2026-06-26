document.addEventListener("DOMContentLoaded", () => {

/* ================= STATE ================= */
const state = {
logs: JSON.parse(localStorage.getItem("logs")) || [],
currentWorkout: null,
timer: null
};

/* ================= WORKOUT DATA ================= */
const workouts = {
w1:{name:"Workout 1",ex:[["Leg Press","4x8"],["Chest Press","4x8"]]},
w2:{name:"Workout 2",ex:[["Incline Walk","25 min"],["Squats","4x12"]]},
w3:{name:"Workout 3",ex:[["Dumbbell Press","3x10"],["Rows","4x10"]]},
w4:{name:"Workout 4",ex:[["Steps","8000"]]},
w5:{name:"Workout 5",ex:[["Squat","4x10"],["Bench Press","4x8"]]},
w6:{name:"Workout 6",ex:[["Burpees","5x10"],["Pushups","5x10"]]}
};

/* ================= NAV ================= */
function show(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");

if(id==="progress") render();
}

/* attach nav */
window.show = show;

/* home navigation */
document.querySelectorAll("[data-go]").forEach(el=>{
el.addEventListener("click",()=>show(el.dataset.go));
});

/* ================= LOAD WORKOUTS ================= */
const list = document.getElementById("workoutList");

Object.keys(workouts).forEach(k=>{
const div = document.createElement("div");
div.className="card";
div.innerText = workouts[k].name;

div.onclick = () => openWorkout(k);

list.appendChild(div);
});

/* ================= OPEN WORKOUT ================= */
function openWorkout(id){
state.currentWorkout = id;
show("detail");

const w = workouts[id];
document.getElementById("title").innerText = w.name;

const box = document.getElementById("exercises");
box.innerHTML = "";

w.ex.forEach(e=>{
const el = document.createElement("div");
el.className="card";

el.innerHTML = `
<b>${e[0]}</b><br>${e[1]}<br>
<button>Log</button>
`;

el.querySelector("button").onclick = () => log(e[0]);

box.appendChild(el);
});
}

window.openWorkout = openWorkout;

/* ================= LOG ================= */
function log(ex){
state.logs.push(ex);
localStorage.setItem("logs",JSON.stringify(state.logs));
alert("Saved ✔");
}
window.log = log;

/* ================= TIMER ================= */
const canvas = document.getElementById("timerCanvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("timerBtn");

let timeLeft = 0;

function draw(t){
ctx.clearRect(0,0,140,140);

ctx.beginPath();
ctx.arc(70,70,50,0,Math.PI*2);
ctx.strokeStyle="#333";
ctx.lineWidth=10;
ctx.stroke();

ctx.beginPath();
ctx.arc(70,70,50,-Math.PI/2,(Math.PI*2*(t/60))-Math.PI/2);
ctx.strokeStyle="#22c55e";
ctx.stroke();

ctx.fillStyle="white";
ctx.font="16px Arial";
ctx.fillText(t,60,75);
}

btn.onclick = () => {
timeLeft = 60;

if(state.timer) clearInterval(state.timer);

state.timer = setInterval(()=>{
if(timeLeft<=0){
clearInterval(state.timer);
return;
}
timeLeft--;
draw(timeLeft);
},1000);
};

/* ================= PROGRESS ================= */
function render(){
document.getElementById("stats").innerHTML =
`Total Logs: ${state.logs.length}`;

document.getElementById("history").innerHTML =
state.logs.slice(-10).map(x=>`<div>🏋️ ${x}</div>`).join("");
}

});

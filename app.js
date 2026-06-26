const workouts = {
w1:{name:"Workout 1",ex:[["Leg Press","4x8-12"],["Chest Press","4x8-12"],["Lat Pulldown","4x8-12"]]},
w2:{name:"Workout 2",ex:[["Incline Walk","25-35 min"],["Squats","4x12"]]},
w3:{name:"Workout 3",ex:[["Dumbbell Press","3x8-12"],["Rows","4x8-12"]]},
w4:{name:"Workout 4",ex:[["Steps","8000-12000"]]},
w5:{name:"Workout 5",ex:[["Squat","4x8-12"],["Bench Press","4x8-10"]]},
w6:{name:"Workout 6",ex:[["Burpees","5x10"],["Pushups","5x10"]]}
};

let logs = JSON.parse(localStorage.getItem("logs")) || [];

/* NAVIGATION */
function go(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");

if(id==="progress"){
document.getElementById("stats").innerHTML =
"Total workouts logged: " + logs.length;
}
}

/* HOME NAV */
document.querySelectorAll("[data-go]").forEach(el=>{
el.addEventListener("click",()=>go(el.dataset.go));
});

/* LOAD WORKOUTS */
const list = document.getElementById("workoutList");

Object.keys(workouts).forEach(k=>{
const div = document.createElement("div");
div.className="card";
div.innerText = workouts[k].name;

div.onclick = ()=>openWorkout(k);

list.appendChild(div);
});

/* OPEN WORKOUT */
function openWorkout(id){
go("detail");

const w = workouts[id];
document.getElementById("workoutTitle").innerText = w.name;

const box = document.getElementById("exerciseList");
box.innerHTML = "";

w.ex.forEach(e=>{
const el = document.createElement("div");
el.className="card";

el.innerHTML = `
<b>${e[0]}</b><br>${e[1]}<br>
<button onclick="logExercise('${e[0]}')">Log</button>
`;

box.appendChild(el);
});
}

/* LOG */
function logExercise(name){
logs.push(name);
localStorage.setItem("logs",JSON.stringify(logs));
alert("Saved ✔");
}
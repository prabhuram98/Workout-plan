const workouts = {
"Workout 1": [
{ name:"Leg Press", sets:4, reps:"8-12", type:"rep" },
{ name:"Chest Press", sets:4, reps:"8-12", type:"rep" },
{ name:"Lat Pulldown", sets:4, reps:"8-12", type:"rep" }
],
"Workout 2": [
{ name:"Incline Walk", sets:1, reps:"25-35 min", type:"time" },
{ name:"Squats", sets:3, reps:"12", type:"rep" },
{ name:"Push-ups", sets:3, reps:"10", type:"rep" },
{ name:"Plank", sets:3, reps:"60 sec", type:"time" }
]
};

let currentWorkout = null;
let history = JSON.parse(localStorage.getItem("history")) || [];

/* NAV */
function show(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function goHome(){ show("home"); }

function openWorkoutHub(){
show("workoutHub");
renderWorkouts();
}

function openProgress(){
show("progress");
renderProgress();
}

/* HUB */
function renderWorkouts(){
const list = document.getElementById("workoutList");
list.innerHTML="";

Object.keys(workouts).forEach(w=>{
let div=document.createElement("div");
div.className="workout-card";
div.innerText=w;
div.onclick=()=>openWorkout(w);
list.appendChild(div);
});
}

/* WORKOUT */
function openWorkout(name){
currentWorkout=name;
show("workoutDetail");

document.getElementById("workoutTitle").innerText=name;

renderExercises();
}

function renderExercises(){
const list=document.getElementById("exerciseList");
list.innerHTML="";

workouts[currentWorkout].forEach((ex,i)=>{
let div=document.createElement("div");
div.className="exercise";

let inputs="";

for(let s=0;s<ex.sets;s++){
inputs+=`
<div>
Set ${s+1}: <input id="${ex.name}-${s}" placeholder="0">
</div>`;
}

div.innerHTML=`
<h3>${ex.name}</h3>
<p>Planned: ${ex.sets} × ${ex.reps}</p>
${inputs}
`;

list.appendChild(div);
});
}

/* SAVE WORKOUT */
function saveWorkout(){

let session={
workout:currentWorkout,
date:new Date().toLocaleDateString(),
exercises:[]
};

workouts[currentWorkout].forEach(ex=>{
let sets=[];

for(let s=0;s<ex.sets;s++){
let val=document.getElementById(`${ex.name}-${s}`).value || 0;
sets.push(Number(val));
}

session.exercises.push({
name:ex.name,
planned:ex.reps,
actual:sets
});
});

history.push(session);
localStorage.setItem("history",JSON.stringify(history));

alert("Workout saved!");

goHome();
}

/* PROGRESS */
function renderProgress(){
const box=document.getElementById("progressData");
box.innerHTML="";

history.forEach(h=>{
let div=document.createElement("div");
div.className="workout-card";

div.innerHTML=`
<b>${h.workout}</b><br>
${h.date}<br>
`;

h.exercises.forEach(e=>{
let avg=e.actual.reduce((a,b)=>a+b,0)/e.actual.length;
div.innerHTML+=`
<p>${e.name} → Avg: ${avg.toFixed(1)}</p>
`;
});

box.appendChild(div);
});
}
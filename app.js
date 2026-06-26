// ---------------- DATA ----------------

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
],

"Workout 3": [
{ name:"Dumbbell Press", sets:3, reps:"10", type:"rep" },
{ name:"Rows", sets:3, reps:"10", type:"rep" }
]
};

let current = null;
let history = JSON.parse(localStorage.getItem("history")) || [];
let streak = JSON.parse(localStorage.getItem("streak")) || {count:0,last:null};

// ---------------- NAV ----------------

function go(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");

if(id==="workout") renderWorkouts();
if(id==="progress") renderProgress();
if(id==="home") updateStreakUI();
}

// ---------------- HOME ----------------

function updateStreakUI(){
document.getElementById("streak").innerText = streak.count || 0;
}

updateStreakUI();

// ---------------- WORKOUT LIST ----------------

function renderWorkouts(){
let box = document.getElementById("workoutList");
box.innerHTML="";

Object.keys(workouts).forEach(w=>{
let div=document.createElement("div");
div.className="card";
div.innerText=w;
div.onclick=()=>openWorkout(w);
box.appendChild(div);
});
}

// ---------------- WORKOUT DETAIL ----------------

function openWorkout(name){
current=name;
go("detail");

document.getElementById("wtitle").innerText=name;

let box=document.getElementById("exercises");
box.innerHTML="";

workouts[name].forEach(ex=>{
let html=`
<div class="exercise">
<b>${ex.name}</b><br>
Planned: ${ex.sets} × ${ex.reps}<br><br>
`;

for(let i=0;i<ex.sets;i++){
html+=`Set ${i+1}: <input id="${ex.name}-${i}" placeholder="0"><br>`;
}

html+=`</div>`;
box.innerHTML+=html;
});
}

// ---------------- SAVE WORKOUT ----------------

function saveWorkout(){

let session={
workout:current,
date:new Date().toDateString(),
exercises:[]
};

// update streak
let today=new Date().toDateString();

if(streak.last!==today){
let diff = Math.floor((new Date(today)-new Date(streak.last||today))/(1000*60*60*24));

if(diff===1) streak.count++;
else streak.count=1;

streak.last=today;
}

localStorage.setItem("streak",JSON.stringify(streak));

workouts[current].forEach(ex=>{
let sets=[];

for(let i=0;i<ex.sets;i++){
let val=document.getElementById(`${ex.name}-${i}`).value || 0;
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

alert("Workout saved ✔");

go("home");
}

// ---------------- PROGRESS ----------------

function renderProgress(){

let box=document.getElementById("progressBox");
box.innerHTML="";

box.innerHTML+=`
<div class="card">
🔥 Streak: ${streak.count}
</div>
`;

history.slice().reverse().forEach(h=>{
let div=document.createElement("div");
div.className="card";

div.innerHTML=`<b>${h.workout}</b><br>${h.date}<br><br>`;

h.exercises.forEach(e=>{
let avg = e.actual.reduce((a,b)=>a+b,0)/e.actual.length;

div.innerHTML+=`
${e.name}: Avg ${avg.toFixed(1)}<br>
`;
});

box.appendChild(div);
});
}
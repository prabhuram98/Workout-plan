const workouts = {
"Workout 1": {
title:"Full Body A (Strength)",
exercises:[
{name:"Leg Press", sets:4, rep:"8–12"},
{name:"Chest Press", sets:4, rep:"8–12"},
{name:"Lat Pulldown", sets:4, rep:"8–12"},
{name:"Shoulder Press", sets:3, rep:"8–10"},
{name:"Plank", sets:3, rep:"60 sec"},
{name:"Cable Crunch", sets:3, rep:"12–15"},
{name:"Incline Walk", sets:1, rep:"10 min"}
]
},

"Workout 2": {
title:"Fat Loss + Conditioning",
exercises:[
{name:"Incline Walk", sets:1, rep:"25–35 min"},
{name:"Squats", sets:4, rep:"12"},
{name:"Push-ups", sets:4, rep:"10"},
{name:"Mountain Climbers", sets:4, rep:"20"},
{name:"Plank", sets:4, rep:"30 sec"}
]
},

"Workout 3": {
title:"Upper Body",
exercises:[
{name:"Incline Dumbbell Press", sets:3, rep:"8–12"},
{name:"Seated Row", sets:4, rep:"8–12"},
{name:"Lateral Raises", sets:3, rep:"12–15"},
{name:"Lat Pulldown", sets:3, rep:"8–12"},
{name:"Biceps Curls", sets:3, rep:"10–12"},
{name:"Triceps Pushdown", sets:3, rep:"10–12"},
{name:"Incline Walk", sets:1, rep:"10 min"}
]
},

"Workout 4": {
title:"Active Recovery",
exercises:[
{name:"Steps", sets:1, rep:"8000–12000"},
{name:"Stretching", sets:1, rep:"light"},
{name:"Easy Walk", sets:1, rep:"20–30 min"}
]
},

"Workout 5": {
title:"Full Body B",
exercises:[
{name:"Squat / Leg Press", sets:4, rep:"8–12"},
{name:"Bench Press", sets:4, rep:"8–10"},
{name:"Lat Pulldown", sets:3, rep:"8–12"},
{name:"Shoulder Press", sets:3, rep:"8–10"},
{name:"Hanging Knee Raises", sets:3, rep:"10–15"},
{name:"Incline Walk", sets:1, rep:"10–15 min"}
]
},

"Workout 6": {
title:"HIIT Fat Loss",
exercises:[
{name:"Incline Walk", sets:1, rep:"20–25 min"},
{name:"Burpees", sets:5, rep:"10"},
{name:"Squats", sets:5, rep:"15"},
{name:"Push-ups", sets:5, rep:"10"},
{name:"Plank", sets:5, rep:"30–40 sec"}
]
}
};

let current=null;
let history=JSON.parse(localStorage.getItem("history"))||[];
let streak=JSON.parse(localStorage.getItem("streak"))||{count:0,last:null};

function go(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");

if(id==="workout") renderWorkouts();
if(id==="progress") renderProgress();
if(id==="home") updateStreakUI();
}

function updateStreakUI(){
document.getElementById("streak").innerText=streak.count;
}
updateStreakUI();

function renderWorkouts(){
let box=document.getElementById("workoutList");
box.innerHTML="";

Object.keys(workouts).forEach(w=>{
let div=document.createElement("div");
div.className="card";
div.innerText=w;
div.onclick=()=>openWorkout(w);
box.appendChild(div);
});
}

function openWorkout(name){
current=name;
go("detail");

document.getElementById("wtitle").innerText=workouts[name].title;

let box=document.getElementById("exercises");
box.innerHTML="";

workouts[name].exercises.forEach(ex=>{
let html=`<div class="exercise"><h3>${ex.name}</h3>`;

for(let i=1;i<=ex.sets;i++){
html+=`
<div class="set-row">
<span>Set ${i}</span>
<span class="rec">Rec: ${ex.rep}</span>
<input id="${ex.name}-${i}" placeholder="0">
</div>`;
}

html+=`</div>`;
box.innerHTML+=html;
});
}

function saveWorkout(){

let session={
workout:current,
date:new Date().toDateString(),
exercises:[]
};

let today=new Date().toDateString();

if(streak.last!==today){
let diff=Math.floor((new Date(today)-new Date(streak.last||today))/(1000*60*60*24));

if(diff===1) streak.count++;
else streak.count=1;

streak.last=today;

localStorage.setItem("streak",JSON.stringify(streak));
}

workouts[current].exercises.forEach(ex=>{
let sets=[];

for(let i=1;i<=ex.sets;i++){
let val=document.getElementById(`${ex.name}-${i}`).value||0;
sets.push(Number(val));
}

session.exercises.push({
name:ex.name,
planned:ex.rep,
actual:sets
});
});

history.push(session);
localStorage.setItem("history",JSON.stringify(history));

alert("Workout Saved ✔");

go("home");
}

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
let avg=e.actual.reduce((a,b)=>a+b,0)/e.actual.length;
div.innerHTML+=`${e.name} → Avg ${avg.toFixed(1)}<br>`;
});

box.appendChild(div);
});
}
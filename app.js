const workouts = {
w1:"Full Body A",
w2:"Fat Loss",
w3:"Upper Body",
w4:"Recovery",
w5:"Full Body B",
w6:"HIIT"
};

const exercises = {
w1:["Leg Press 4x8","Chest Press 4x8"],
w2:["Walk 25 min","Squats 4x12"],
w3:["Dumbbell Press 3x10","Rows 4x10"],
w4:["Steps 8000"],
w5:["Squat 4x10","Bench Press 4x8"],
w6:["Burpees 5x10","Pushups 5x10"]
};

function show(id){
document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
document.getElementById(id).classList.remove('hidden');

if(id==="workouts") loadWorkouts();
if(id==="progress") loadProgress();
}

function loadWorkouts(){
const box = document.getElementById("workouts");
box.innerHTML = "";

Object.keys(workouts).forEach(k=>{
let btn = document.createElement("button");
btn.innerText = workouts[k];
btn.onclick = ()=>openWorkout(k);
box.appendChild(btn);
});
}

function openWorkout(id){
show("detail");

document.getElementById("title").innerText = workouts[id];

const box = document.getElementById("ex");
box.innerHTML = "";

exercises[id].forEach(e=>{
let d = document.createElement("div");
d.innerText = e;
box.appendChild(d);
});
}

function loadProgress(){
document.getElementById("stats").innerText =
"App is working. Basic version stable.";
}

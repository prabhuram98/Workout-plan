document.addEventListener("DOMContentLoaded", function () {

const workouts = {
w1:["Workout 1"],
w2:["Workout 2"],
w3:["Workout 3"],
w4:["Workout 4"],
w5:["Workout 5"],
w6:["Workout 6"]
};

const exercises = {
w1:["Leg Press 4x8","Chest Press 4x8"],
w2:["Walk 25 min","Squats 4x12"],
w3:["Dumbbell Press 3x10"],
w4:["Steps 8000"],
w5:["Squat 4x10"],
w6:["Burpees 5x10"]
};

window.go = function(id){

document.querySelectorAll(".page").forEach(p=>{
p.classList.add("hidden");
});

document.getElementById(id).classList.remove("hidden");

if(id === "workouts") loadWorkouts();
if(id === "progress") loadProgress();
};

function loadWorkouts(){
const box = document.getElementById("workouts");
box.innerHTML = "";

for(let key in workouts){
let btn = document.createElement("button");
btn.innerText = workouts[key][0];

btn.onclick = function(){
openWorkout(key);
};

box.appendChild(btn);
}
}

function openWorkout(id){
go("detail");

document.getElementById("title").innerText = workouts[id][0];

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
"Working version stable ✔";
}

/* INIT */
loadWorkouts();

});
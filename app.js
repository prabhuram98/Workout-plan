const workouts = [
{
title: "workout 1 – FULL BODY A (STRENGTH BASE)",
ex: [
"Leg press — 4×8–12",
"Chest press (machine or dumbbell) — 4×8–12",
"Lat pulldown — 4×8–12",
"Shoulder press — 3×8–10",
"Plank — 3×60 sec",
"Cable crunch — 3×12–15",
"10 min incline walk"
]
},
{
title: "workout 2 – FAT LOSS + CONDITIONING",
ex: [
"Incline walk — 25–35 min (steady pace)",
"12 squats",
"10 push-ups",
"20 mountain climbers",
"30 sec plank"
]
},
{
title: "workout 3 – UPPER BODY (MUSCLE BUILD)",
ex: [
"Incline dumbbell press — 3×8–12",
"Seated row — 4×8–12",
"Lateral raises — 3×12–15",
"Lat pulldown — 3×8–12",
"Biceps curls — 3×10–12",
"Triceps pushdown — 3×10–12",
"10 min walk"
]
},
{
title: "workout 4 – ACTIVE RECOVERY",
ex: [
"8,000–12,000 steps",
"Light stretching",
"Optional 20–30 min easy walk"
]
},
{
title: "workout 5 – FULL BODY B (PROGRESSION DAY)",
ex: [
"Squat or leg press — 4×8–12",
"Bench press — 4×8–10",
"Lat pulldown — 3×8–12",
"Shoulder press — 3×8–10",
"Hanging knee raises — 3×10–15",
"10–15 min incline walk"
]
},
{
title: "workout 6 – FAT LOSS INTERVAL DAY",
ex: [
"20–25 min brisk incline walk",
"10 burpees",
"15 squats",
"10 push-ups",
"30–40 sec plank"
]
}
];

let current = null;
let done = [];

function openPicker(){
document.getElementById("picker").classList.remove("hidden");

let list = document.getElementById("workoutList");
list.innerHTML = "";

workouts.forEach((w,i)=>{
let div = document.createElement("div");
div.className = "sheet-item";
div.innerText = w.title;
div.onclick = () => openWorkout(i);
list.appendChild(div);
});
}

function closePicker(){
document.getElementById("picker").classList.add("hidden");
}

function openWorkout(i){
current = i;
done = [];

document.getElementById("home").classList.add("hidden");
document.getElementById("picker").classList.add("hidden");
document.getElementById("workout").classList.remove("hidden");

document.getElementById("wtitle").innerText = workouts[i].title;

render();
}

function back(){
document.getElementById("workout").classList.add("hidden");
document.getElementById("home").classList.remove("hidden");
}

function render(){
let list = document.getElementById("exList");
list.innerHTML = "";

workouts[current].ex.forEach((e,i)=>{
let div = document.createElement("div");
div.className = "ex";

div.innerHTML = `
<span>${e}</span>
<div class="circle ${done[i] ? 'done' : ''}" onclick="toggle(${i})">
${done[i] ? '✓' : ''}
</div>
`;

list.appendChild(div);
});

updateProgress();
}

function toggle(i){
done[i] = !done[i];
render();
}

function updateProgress(){
let total = workouts[current].ex.length;
let count = done.filter(Boolean).length;

let percent = (count/total)*100;

document.getElementById("progressBar").innerHTML =
`<div style="width:${percent}%"></div>`;

document.getElementById("progressText").innerText =
`${count} / ${total} exercises completed`;

document.getElementById("completeBtn").disabled = count !== total;
document.getElementById("completeBtn").style.opacity =
count === total ? "1" : "0.5";
}

function completeWorkout(){
alert("Workout Completed ✔");
back();
}
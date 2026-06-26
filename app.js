let current="home";

let progress = JSON.parse(localStorage.getItem("progress"))||{streak:0,completed:[]};
let history = JSON.parse(localStorage.getItem("history"))||[];
let bodyData = JSON.parse(localStorage.getItem("body"))||{};
let exerciseLog = JSON.parse(localStorage.getItem("ex"))||{};

const workouts={
w1:["Workout 1 – Full Body A",[
["Leg Press","4x8-12"],
["Chest Press","4x8-12"],
["Lat Pulldown","4x8-12"],
["Shoulder Press","3x8-10"],
["Plank","3x60s"]
]],

w2:["Workout 2 – Fat Loss",[
["Incline Walk","25-35 min"],
["Squats","4x12"],
["Push-ups","4x10"],
["Mountain Climbers","4x20"]
]],

w3:["Workout 3 – Upper Body",[
["Dumbbell Press","3x8-12"],
["Row","4x8-12"],
["Lateral Raise","3x12"],
["Biceps Curl","3x10"]
]],

w4:["Workout 4 – Recovery",[
["Steps","8000-12000"],
["Stretching","Light"]
]],

w5:["Workout 5 – Full Body B",[
["Squat","4x8-12"],
["Bench Press","4x8-10"],
["Lat Pulldown","3x8-12"]
]],

w6:["Workout 6 – HIIT",[
["Burpees","5x10"],
["Squats","5x15"],
["Push-ups","5x10"]
]]
};

function switchTab(s,e){
document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
document.getElementById(s).classList.add("active");

document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));
if(e) e.currentTarget.classList.add("active");

if(s==="progress") renderProgress();
}

function openWorkout(id){
switchTab("detail");
let w=workouts[id];
document.getElementById("wtitle").innerText=w[0];

let box=document.getElementById("exList");
box.innerHTML="";

w[1].forEach(ex=>{
box.innerHTML+=`
<div class="exercise">
<b>${ex[0]}</b><br>${ex[1]}
<div>
<button class="btn learn" onclick="learn('${ex[0]}')">Learn</button>
<button class="btn demo" onclick="demo('${ex[0]}')">Demo</button>
<button class="btn done" onclick="logEx('${id}','${ex[0]}')">Log</button>
</div>
</div>`;
});
}

function logEx(w,e){
let k=w+"_"+e;
if(!exerciseLog[k]) exerciseLog[k]=[];
let v=prompt("reps x weight");
if(v){
exerciseLog[k].push(v);
localStorage.setItem("ex",JSON.stringify(exerciseLog));
}
}

function learn(x){
document.getElementById("modalText").innerText=x+" explained (basic form guide)";
document.getElementById("modal").classList.remove("hidden");
}

function demo(x){
window.open("https://youtube.com/results?search_query="+x,"_blank");
}

function closeModal(){
document.getElementById("modal").classList.add("hidden");
}

function renderProgress(){

document.getElementById("streakCount").innerText=progress.streak;
document.getElementById("workoutCount").innerText=progress.completed.length;

let list=document.getElementById("historyList");
list.innerHTML=history.slice(-5).map(h=>`<div class="card">${h}</div>`).join("");
}

function saveBody(){
let v=document.getElementById("bodyWeight").value;
bodyData[new Date().toDateString()]=v;
localStorage.setItem("body",JSON.stringify(bodyData));
}

Object.keys(workouts).forEach(k=>{
document.getElementById("workoutList").innerHTML+=
`<div class="card" onclick="openWorkout('${k}')">${workouts[k][0]}</div>`;
});
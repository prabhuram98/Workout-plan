let progress = JSON.parse(localStorage.getItem("p")) || {streak:0,done:0};
let history = JSON.parse(localStorage.getItem("h")) || [];
let log = JSON.parse(localStorage.getItem("l")) || {};

const workouts = {
w1:{
name:"Workout 1",
ex:[
["Leg Press","4x8-12"],
["Chest Press","4x8-12"],
["Lat Pulldown","4x8-12"]
]
},
w2:{
name:"Workout 2",
ex:[
["Incline Walk","25-35 min"],
["Squats","4x12"]
]
},
w3:{
name:"Workout 3",
ex:[
["Dumbbell Press","3x8-12"],
["Rows","4x8-12"]
]
},
w4:{
name:"Workout 4",
ex:[
["Steps","8000-12000"]
]
},
w5:{
name:"Workout 5",
ex:[
["Squat","4x8-12"],
["Bench Press","4x8-10"]
]
},
w6:{
name:"Workout 6",
ex:[
["Burpees","5x10"],
["Pushups","5x10"]
]
}
};

function switchTab(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");

if(id==="progress") renderProgress();
}

Object.keys(workouts).forEach(k=>{
let w=workouts[k];
document.getElementById("workoutList").innerHTML+=`
<div class="card" onclick="openWorkout('${k}')">
${w.name}
</div>`;
});

function openWorkout(id){
switchTab("detail");

let w=workouts[id];
document.getElementById("wtitle").innerText=w.name;

let box=document.getElementById("exList");
box.innerHTML="";

w.ex.forEach(e=>{
box.innerHTML+=`
<div class="card">
<b>${e[0]}</b><br>${e[1]}
<br><br>
<button onclick="logEx('${id}','${e[0]}')">Log</button>
<button onclick="learn('${e[0]}')">Learn</button>
<button onclick="demo('${e[0]}')">Demo</button>
<button onclick="chart('${e[0]}')">Chart</button>
</div>`;
});
}

function logEx(w,e){
let key=w+"_"+e;
let v=prompt("reps x weight");
if(!log[key]) log[key]=[];
log[key].push(v);

progress.done++;
history.push(e);

localStorage.setItem("l",JSON.stringify(log));
localStorage.setItem("p",JSON.stringify(progress));
localStorage.setItem("h",JSON.stringify(history));
}

function learn(x){
alert(x+" explanation guide");
}

function demo(x){
window.open("https://youtube.com/results?search_query="+x);
}

/* REST TIMER */
let t;
function startRest(s){
let c=document.getElementById("timerCanvas");
let ctx=c.getContext("2d");
let time=s;

function draw(){
ctx.clearRect(0,0,120,120);
ctx.beginPath();
ctx.arc(60,60,40,0,Math.PI*2);
ctx.strokeStyle="#eee";
ctx.stroke();

ctx.beginPath();
ctx.arc(60,60,40,-Math.PI/2,(Math.PI*2*(time/s))-Math.PI/2);
ctx.strokeStyle="#2563eb";
ctx.stroke();

ctx.fillText(time,55,65);
}

t=setInterval(()=>{
if(time<=0){clearInterval(t);return;}
time--;
draw();
},1000);
}

/* PROGRESS */
function renderProgress(){

document.getElementById("streak").innerText=progress.streak;
document.getElementById("done").innerText=progress.done;

new Chart(document.getElementById("chart"),{
type:"bar",
data:{
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[{data:[1,2,1,3,2,1,0],backgroundColor:"#2563eb"}]
}
});

/* FAT LOSS */
let loss = progress.done * 0.05;
document.getElementById("fat").innerHTML=
`Weekly: ${loss.toFixed(2)} kg<br>Monthly: ${(loss*4).toFixed(2)} kg`;

/* HISTORY */
document.getElementById("history").innerHTML =
history.slice(-5).map(h=>`<div>${h}</div>`).join("");
}
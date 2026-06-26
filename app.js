let logs = JSON.parse(localStorage.getItem("logs")) || [];
let streak = 0;

const workouts = {
w1:{name:"Workout 1",ex:[
["Leg Press","4x8-12"],
["Chest Press","4x8-12"],
["Lat Pulldown","4x8-12"]
]},
w2:{name:"Workout 2",ex:[
["Incline Walk","25 min"],
["Squats","4x12"]
]},
w3:{name:"Workout 3",ex:[
["Dumbbell Press","3x10"],
["Rows","4x10"]
]},
w4:{name:"Workout 4",ex:[
["Steps","8000"]
]},
w5:{name:"Workout 5",ex:[
["Squat","4x10"],
["Bench Press","4x8"]
]},
w6:{name:"Workout 6",ex:[
["Burpees","5x10"],
["Pushups","5x10"]
]}
};

/* NAV */
function go(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");

if(id==="progress") render();
}

/* LOAD WORKOUTS */
Object.keys(workouts).forEach(k=>{
document.getElementById("workoutList").innerHTML +=
`<div class="glass-card" onclick="openW('${k}')">${workouts[k].name}</div>`;
});

/* OPEN WORKOUT */
function openW(id){
go("detail");

let w = workouts[id];
document.getElementById("wtitle").innerText = w.name;

let box = document.getElementById("exList");
box.innerHTML = "";

w.ex.forEach(e=>{
box.innerHTML += `
<div class="glass-card">
<b>${e[0]}</b><br>${e[1]}
<br>
<button onclick="log('${e[0]}')">Log</button>
</div>`;
});
}

/* LOG */
function log(ex){
logs.push(ex);
localStorage.setItem("logs",JSON.stringify(logs));
alert("Saved ✔");
}

/* TIMER (CIRCLE) */
let t;
function startTimer(s){
let c=document.getElementById("circle");
let ctx=c.getContext("2d");
let time=s;

clearInterval(t);

function draw(){
ctx.clearRect(0,0,120,120);

ctx.beginPath();
ctx.arc(60,60,40,0,Math.PI*2);
ctx.strokeStyle="#e5e7eb";
ctx.lineWidth=10;
ctx.stroke();

ctx.beginPath();
ctx.arc(60,60,40,-Math.PI/2,(Math.PI*2*(time/s))-Math.PI/2);
ctx.strokeStyle="#2563eb";
ctx.lineWidth=10;
ctx.stroke();

ctx.font="16px Arial";
ctx.fillText(time,50,65);
}

t=setInterval(()=>{
if(time<=0){
clearInterval(t);
return;
}
time--;
draw();
},1000);
}

/* PROGRESS */
function render(){

document.getElementById("count").innerText = logs.length;

/* streak (simple) */
streak = Math.min(logs.length, 30);
document.getElementById("streak").innerText = streak;

/* history */
document.getElementById("history").innerHTML =
logs.slice(-8).map(l=>`<div>${l}</div>`).join("");

/* simple bar chart */
document.getElementById("barChart").innerHTML =
`<div class="glass-card">
Progress Score: ${logs.length * 10}
</div>`;
}
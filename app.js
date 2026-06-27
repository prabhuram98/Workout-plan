const workouts = [
{
title:"Workout 1 – FULL BODY A",
ex:[
"Leg press — 4×8–12",
"Chest press — 4×8–12",
"Lat pulldown — 4×8–12",
"Shoulder press — 3×8–10",
"Plank — 3×60 sec",
"Cable crunch — 3×12–15",
"10 min incline walk"
]
},
{
title:"Workout 2 – FAT LOSS",
ex:[
"Incline walk — 25–35 min",
"Squats",
"Push-ups",
"Mountain climbers",
"Plank"
]
},
{
title:"Workout 3 – UPPER BODY",
ex:[
"Dumbbell press",
"Seated row",
"Lateral raises",
"Lat pulldown",
"Biceps curls",
"Triceps pushdown"
]
},
{
title:"Workout 4 – ACTIVE RECOVERY",
ex:["Walking","Stretching"]
},
{
title:"Workout 5 – FULL BODY B",
ex:[
"Squat or leg press",
"Bench press",
"Lat pulldown",
"Shoulder press",
"Hanging knee raises"
]
},
{
title:"Workout 6 – FAT LOSS INTERVAL",
ex:[
"Brisk walk",
"Burpees",
"Squats",
"Push-ups",
"Plank"
]
}
];

let current=null;
let done=[];
let history=JSON.parse(localStorage.getItem("history"))||[];
let streak=JSON.parse(localStorage.getItem("streak"))||{count:0,last:null};
let stats=JSON.parse(localStorage.getItem("stats"))||{};

function openPicker(){
document.getElementById("picker").classList.remove("hidden");

let list=document.getElementById("workoutList");
list.innerHTML="";

workouts.forEach((w,i)=>{
let d=document.createElement("div");
d.className="sheet-item";
d.innerText=w.title;
d.onclick=()=>openWorkout(i);
list.appendChild(d);
});
}

function closePicker(){
document.getElementById("picker").classList.add("hidden");
}

function openWorkout(i){
current=i;
done=[];
document.getElementById("home").classList.add("hidden");
document.getElementById("workout").classList.remove("hidden");
document.getElementById("wtitle").innerText=workouts[i].title;
render();
}

function backHome(){
document.getElementById("workout").classList.add("hidden");
document.getElementById("progress").classList.add("hidden");
document.getElementById("home").classList.remove("hidden");
}

function render(){
let list=document.getElementById("exList");
list.innerHTML="";

workouts[current].ex.forEach((e,i)=>{
let div=document.createElement("div");
div.className="ex";

div.innerHTML=`
<span>${e}</span>
<div class="circle ${done[i]?'done':''}" onclick="toggle(${i})">
${done[i]?'✓':''}
</div>
`;

list.appendChild(div);
});

updateProgress();
}

function toggle(i){
done[i]=!done[i];

let name=workouts[current].ex[i];
if(done[i]){
stats[name]=(stats[name]||0)+1;
localStorage.setItem("stats",JSON.stringify(stats));
}

render();
}

function updateProgress(){
let total=workouts[current].ex.length;
let count=done.filter(Boolean).length;

document.getElementById("progressText").innerText=
`${count}/${total} completed`;

document.querySelector("#progressBar div").style.width=
(count/total)*100+"%";

document.getElementById("completeBtn").disabled = count!==total;
document.getElementById("completeBtn").style.opacity = count===total?1:0.5;
}

function completeWorkout(){

let today=new Date().toDateString();
history.push({workout:workouts[current].title,date:today});
localStorage.setItem("history",JSON.stringify(history));

updateStreak(today);

alert("Workout Complete ✔");
backHome();
updateSuggestion();
}

function updateStreak(today){
if(streak.last===today)return;

let last=streak.last?new Date(streak.last):null;
let now=new Date(today);

if(last && (now-last)/(1000*60*60*24)===1){
streak.count++;
}else{
streak.count=1;
}

streak.last=today;
localStorage.setItem("streak",JSON.stringify(streak));
}

function openProgress(){
document.getElementById("home").classList.add("hidden");
document.getElementById("progress").classList.remove("hidden");

let statsBox=document.getElementById("stats");
statsBox.innerHTML=`
<div class="card">🔥 Streak: ${streak.count}</div>
<div class="card">🏋️ Workouts: ${history.length}</div>
<div class="card">⚡ Score: ${Math.min(100,history.length*10)}</div>
`;

let hist=document.getElementById("history");
hist.innerHTML="";

history.slice().reverse().forEach(h=>{
let d=document.createElement("div");
d.className="card";
d.innerText=`${h.workout} - ${h.date}`;
hist.appendChild(d);
});
}

function updateSuggestion(){
let msg="Start today strong 💪";

if(streak.count>=3) msg="🔥 You are consistent — go harder";
if(history.length<2) msg="Build habit first";
if(streak.count===1) msg="Light recovery recommended";

document.getElementById("suggestion").innerText=msg;
}

updateSuggestion();
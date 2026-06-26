function go(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* ALL 6 WORKOUTS */
const workouts = {
w1:{
title:"Workout 1 – Full Body A",
ex:[
["Leg Press","4 x 8–12","Leg Press Machine"],
["Chest Press","4 x 8–12","Machine/Dumbbell"],
["Lat Pulldown","4 x 8–12","Cable Machine"],
["Shoulder Press","3 x 8–10","Machine"],
["Plank","3 x 60 sec","Bodyweight"]
]
},

w2:{
title:"Workout 2 – Fat Loss",
ex:[
["Incline Walk","25–35 min","Treadmill"],
["Squats","4 x 12","Bodyweight"],
["Push-ups","4 x 10","Bodyweight"],
["Mountain Climbers","4 x 20","Bodyweight"]
]
},

w3:{
title:"Workout 3 – Upper Body",
ex:[
["Incline Dumbbell Press","3 x 8–12","Dumbbells"],
["Seated Row","4 x 8–12","Machine"],
["Lateral Raises","3 x 12–15","Dumbbells"],
["Lat Pulldown","3 x 8–12","Cable"],
["Biceps Curl","3 x 10–12","Dumbbells"]
]
},

w4:{
title:"Workout 4 – Recovery",
ex:[
["Steps","8000–12000","Walking"],
["Stretching","Light","Body"],
["Easy Walk","20–30 min","Walking"]
]
},

w5:{
title:"Workout 5 – Full Body B",
ex:[
["Squat","4 x 8–12","Barbell"],
["Bench Press","4 x 8–10","Barbell"],
["Lat Pulldown","3 x 8–12","Cable"],
["Shoulder Press","3 x 8–10","Machine"]
]
},

w6:{
title:"Workout 6 – HIIT",
ex:[
["Burpees","5 x 10","Bodyweight"],
["Squats","5 x 15","Bodyweight"],
["Push-ups","5 x 10","Bodyweight"],
["Plank","5 x 30–40 sec","Bodyweight"]
]
}
};

/* OPEN WORKOUT */
function openWorkout(id){
go("detail");

document.getElementById("wtitle").innerText = workouts[id].title;

let box = document.getElementById("exList");
box.innerHTML = "";

workouts[id].ex.forEach(e=>{
box.innerHTML += `
<div class="exercise">
<b>${e[0]}</b><br>
${e[1]}<br>
<small>${e[2]}</small>

<div class="btns">
<button class="btn learn" onclick="learn('${e[0]}')">🤖 Learn</button>
<button class="btn demo" onclick="demo('${e[0]}')">▶ Demo</button>
</div>
</div>
`;
});
}

/* OFFLINE AI LEARN */
function learn(name){

const data = {
"Leg Press":"Works quads, glutes, hamstrings. Keep feet shoulder width. Do not lock knees. Push through heels.",
"Chest Press":"Works chest, triceps, shoulders. Keep shoulders back. Lower slowly.",
"Lat Pulldown":"Targets back muscles. Pull bar to upper chest. Avoid swinging.",
"Squats":"Full leg exercise. Keep chest up. Go to parallel depth.",
"Push-ups":"Chest and triceps. Keep body straight.",
"Plank":"Core stability exercise. Keep body straight."
};

document.getElementById("modalText").innerHTML = `
<h3>${name}</h3>
<p>${data[name] || "No guide available yet."}</p>
`;

document.getElementById("modal").classList.remove("hidden");
}

/* DEMO */
function demo(name){
window.open("https://www.youtube.com/results?search_query=" + name + " exercise technique","_blank");
}

function closeModal(){
document.getElementById("modal").classList.add("hidden");
}
function go(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

const workouts = {

w1:{
title:"Workout 1 – Full Body A",
data:[
["Leg Press","4 x 8–12"],
["Chest Press","4 x 8–12"],
["Lat Pulldown","4 x 8–12"],
["Shoulder Press","3 x 8–10"],
["Plank","3 x 60 sec"],
["Cable Crunch","3 x 12–15"],
["Incline Walk","10 min"]
]
},

w2:{
title:"Workout 2 – Fat Loss",
data:[
["Incline Walk","25–35 min"],
["Squats","4 x 12"],
["Push-ups","4 x 10"],
["Mountain Climbers","4 x 20"],
["Plank","4 x 30 sec"]
]
},

w3:{
title:"Workout 3 – Upper Body",
data:[
["Incline Dumbbell Press","3 x 8–12"],
["Seated Row","4 x 8–12"],
["Lateral Raises","3 x 12–15"],
["Lat Pulldown","3 x 8–12"],
["Biceps Curl","3 x 10–12"],
["Triceps Pushdown","3 x 10–12"]
]
},

w4:{
title:"Workout 4 – Recovery",
data:[
["Steps","8000–12000"],
["Stretching","Light"],
["Easy Walk","20–30 min"]
]
},

w5:{
title:"Workout 5 – Full Body B",
data:[
["Squat / Leg Press","4 x 8–12"],
["Bench Press","4 x 8–10"],
["Lat Pulldown","3 x 8–12"],
["Shoulder Press","3 x 8–10"],
["Hanging Knee Raises","3 x 10–15"]
]
},

w6:{
title:"Workout 6 – HIIT",
data:[
["Burpees","5 x 10"],
["Squats","5 x 15"],
["Push-ups","5 x 10"],
["Plank","5 x 30–40 sec"]
]
}
};

function openWorkout(id){
go("detail");

document.getElementById("wtitle").innerText = workouts[id].title;

let box = document.getElementById("details");
box.innerHTML = "";

workouts[id].data.forEach(item=>{
box.innerHTML += `
<div class="exercise">
<div class="set">
<b>${item[0]}</b>
<span>${item[1]}</span>
</div>
</div>
`;
});
}
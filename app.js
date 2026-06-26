let currentWorkout = "";
let startTime = null;
let timer;

const workouts = {
"Workout 1": [
{ name:"Leg Press", sets:"4", reps:"8–12", note:"Push through heels, slow return" },
{ name:"Chest Press", sets:"4", reps:"8–12", note:"Control weight, don’t lock elbows" },
{ name:"Lat Pulldown", sets:"4", reps:"8–12", note:"Pull to upper chest" },
{ name:"Shoulder Press", sets:"3", reps:"8–10", note:"Core tight" },
{ name:"Plank", sets:"3", reps:"60 sec", note:"Straight line body" }
],

"Workout 2": [
{ name:"Incline Walk", sets:"1", reps:"25–35 min", note:"Steady fat burn pace" },
{ name:"Squats", sets:"3–4", reps:"12", note:"Go low, keep chest up" },
{ name:"Push-ups", sets:"3–4", reps:"10", note:"Full range motion" },
{ name:"Mountain Climbers", sets:"3–4", reps:"20", note:"Fast controlled movement" }
]
};

/* INIT */
window.onload = () => {
    const select = document.getElementById("workoutSelect");
    Object.keys(workouts).forEach(w=>{
        let opt = document.createElement("option");
        opt.textContent = w;
        select.appendChild(opt);
    });
};

/* NAV */
function goSelect(){
    show("select");
}

function goHome(){
    show("home");
}

function show(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* START */
function startWorkout(){
    currentWorkout = document.getElementById("workoutSelect").value;
    document.getElementById("workoutTitle").innerText = currentWorkout;

    renderWorkout();
    show("workout");
    startTimer();
}

/* RENDER */
function renderWorkout(){
    const list = document.getElementById("list");
    list.innerHTML = "";

    workouts[currentWorkout].forEach((ex,i)=>{
        const div = document.createElement("div");
        div.className = "exercise";

        div.innerHTML = `
            <div class="exercise-title">${ex.name}</div>
            <div class="exercise-meta">Sets: ${ex.sets} | Reps/Time: ${ex.reps}</div>
            <div class="exercise-meta">${ex.note}</div>

            <button onclick="learn('${ex.name}')">📘 Learn</button>
        `;

        list.appendChild(div);
    });
}

/* LEARN (ChatGPT-style explanation) */
function learn(name){

    const explanations = {
        "Leg Press":"Sit with feet shoulder-width, push platform through heels, avoid locking knees at top.",
        "Chest Press":"Keep shoulders stable, push forward slowly, control return.",
        "Lat Pulldown":"Pull bar to upper chest, squeeze back muscles, don’t swing.",
        "Shoulder Press":"Press overhead while keeping core tight and back straight.",
        "Plank":"Hold body straight, engage abs and glutes, don’t drop hips.",
        "Incline Walk":"Walk at incline to increase calorie burn while keeping steady heart rate.",
        "Squats":"Keep chest up, push hips back, knees aligned with toes.",
        "Push-ups":"Keep body straight, lower chest to floor, push back up controlled.",
        "Mountain Climbers":"Drive knees fast while maintaining plank position."
    };

    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalText").innerText =
        explanations[name] || "Focus on controlled movement, correct posture, and slow execution.";

    document.getElementById("modal").classList.remove("hidden");
}

function closeModal(){
    document.getElementById("modal").classList.add("hidden");
}

/* TIMER */
function startTimer(){
    startTime = Date.now();

    timer = setInterval(()=>{
        let t = Date.now() - startTime;
        let m = Math.floor(t/60000);
        let s = Math.floor((t%60000)/1000);

        document.getElementById("timer").innerText =
        `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    },1000);
}

/* FINISH */
function finishWorkout(){
    clearInterval(timer);
    goHome();
}
let currentWorkout = "";
let startTime = null;
let timer;

const workouts = {
"Workout 1": [
"Leg press — 4×8–12",
"Chest press — 4×8–12",
"Lat pulldown — 4×8–12",
"Shoulder press — 3×8–10",
"Plank — 3×60 sec",
"Cable crunch — 3×12–15",
"10 min incline walk"
],

"Workout 2": [
"Incline walk — 25–35 min",
"12 squats",
"10 push-ups",
"20 mountain climbers",
"30 sec plank"
],

"Workout 3": [
"Incline dumbbell press — 3×8–12",
"Seated row — 4×8–12",
"Lateral raises — 3×12–15",
"Lat pulldown — 3×8–12",
"Biceps curls — 3×10–12",
"Triceps pushdown — 3×10–12"
],

"Workout 4": [
"8,000–12,000 steps",
"Light stretching",
"20–30 min walk"
],

"Workout 5": [
"Squat or leg press — 4×8–12",
"Bench press — 4×8–10",
"Lat pulldown — 3×8–12",
"Shoulder press — 3×8–10",
"Hanging knee raises — 3×10–15"
],

"Workout 6": [
"20–25 min incline walk",
"10 burpees",
"15 squats",
"10 push-ups",
"30–40 sec plank"
]
};

/* INIT DROPDOWN */
window.onload = () => {
    const sel = document.getElementById("workoutSelect");

    Object.keys(workouts).forEach(w=>{
        let o = document.createElement("option");
        o.textContent = w;
        sel.appendChild(o);
    });

    loadSaved();
};

/* NAV */
function goSelect(){
    switchScreen("select");
}

function goHome(){
    switchScreen("home");
}

function switchScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* START */
function startWorkout(){
    currentWorkout = document.getElementById("workoutSelect").value;

    document.getElementById("workoutTitle").innerText = currentWorkout;

    renderWorkout();
    switchScreen("workout");
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
            <div class="row">
                <input type="checkbox" onchange="saveState()">
                <div>${ex}</div>
                <button onclick="learn('${ex.replace(/'/g,"")}')">Learn</button>
            </div>
        `;

        list.appendChild(div);
    });
}

/* LEARN */
function learn(text){

    document.getElementById("modalTitle").innerText = "How to do it";

    document.getElementById("modalText").innerText =
    "Focus on controlled movement, proper posture, slow reps, and breathing. " +
    "Avoid momentum and keep tension on muscles.";

    document.getElementById("modal").classList.remove("hidden");
}

function closeModal(){
    document.getElementById("modal").classList.add("hidden");
}

/* TIMER */
function startTimer(){
    startTime = Date.now();

    clearInterval(timer);

    timer = setInterval(()=>{
        let t = Date.now() - startTime;
        let m = Math.floor(t/60000);
        let s = Math.floor((t%60000)/1000);

        document.getElementById("timer").innerText =
        `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    },1000);
}

/* SAVE CHECKBOX STATE */
function saveState(){
    const checks = document.querySelectorAll("#list input[type=checkbox]");
    let arr = [];

    checks.forEach((c,i)=>{
        arr.push(c.checked);
    });

    localStorage.setItem(currentWorkout, JSON.stringify(arr));
}

/* LOAD STATE */
function loadSaved(){
    const checks = document.querySelectorAll("#list input[type=checkbox]");
    const saved = JSON.parse(localStorage.getItem(currentWorkout) || "[]");

    checks.forEach((c,i)=>{
        c.checked = saved[i] || false;
    });
}

/* FINISH */
function finishWorkout(){
    clearInterval(timer);
    goHome();
}
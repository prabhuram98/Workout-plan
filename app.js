let currentWorkout = "";
let startTime = null;
let timer;

/* FULL 6 WORKOUT PLAN (COMPLETE) */
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
"30 sec plank (3–4 rounds)"
],

"Workout 3": [
"Incline dumbbell press — 3×8–12",
"Seated row — 4×8–12",
"Lateral raises — 3×12–15",
"Lat pulldown — 3×8–12",
"Biceps curls — 3×10–12",
"Triceps pushdown — 3×10–12",
"10 min walk"
],

"Workout 4": [
"8,000–12,000 steps",
"Light stretching",
"20–30 min easy walk"
],

"Workout 5": [
"Squat or leg press — 4×8–12",
"Bench press — 4×8–10",
"Lat pulldown — 3×8–12",
"Shoulder press — 3×8–10",
"Hanging knee raises — 3×10–15",
"10–15 min incline walk"
],

"Workout 6": [
"Brisk incline walk — 20–25 min",
"10 burpees",
"15 squats",
"10 push-ups",
"30–40 sec plank (4–5 rounds)"
]

};

/* INIT DROPDOWN */
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
    document.getElementById("home").classList.remove("active");
    document.getElementById("select").classList.add("active");
}

function goHome(){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById("home").classList.add("active");
}

/* START */
function startWorkout(){
    currentWorkout = document.getElementById("workoutSelect").value;

    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById("workout").classList.add("active");

    document.getElementById("workoutTitle").innerText = currentWorkout;

    renderWorkout();
    startTimer();
}

/* RENDER WORKOUT (FIXED ✔ CHECKBOX WORKING) */
function renderWorkout(){
    const list = document.getElementById("list");
    list.innerHTML = "";

    workouts[currentWorkout].forEach((item,i)=>{

        const div = document.createElement("div");
        div.className = "exercise";

        div.innerHTML = `
            <div class="exercise-header">
                <div class="exercise-left">
                    <input type="checkbox">
                    <div>${item}</div>
                </div>

                <button onclick="learn('${item}')">Learn</button>
            </div>
        `;

        list.appendChild(div);
    });
}

/* LEARN BUTTON */
function learn(text){

    const tips = {
        "Leg press":"Push through heels, avoid locking knees.",
        "Chest press":"Control movement, do not rush reps.",
        "Lat pulldown":"Pull bar to upper chest, squeeze back.",
        "Shoulder press":"Keep core tight, avoid arching back.",
        "Plank":"Keep body straight, engage abs.",
        "Squat":"Chest up, knees aligned with toes.",
        "Push-ups":"Full range motion, controlled tempo"
    };

    document.getElementById("modalTitle").innerText = "How to do it";
    document.getElementById("modalText").innerText =
        tips[text] || "Focus on form, slow controlled movement, and breathing.";

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
        `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    },1000);
}

/* FINISH */
function finishWorkout(){
    clearInterval(timer);
    goHome();
}
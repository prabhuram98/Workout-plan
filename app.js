/* =========================
   GLOBAL STATE
========================= */

let currentWorkout = null;
let currentIndex = 0;
let completed = [];

let history = JSON.parse(localStorage.getItem("history")) || [];
let streak = JSON.parse(localStorage.getItem("streak")) || { count: 0, last: null };

/* =========================
   DOM ELEMENTS
========================= */

const homeScreen = document.getElementById("homeScreen");
const workoutScreen = document.getElementById("workoutScreen");
const progressScreen = document.getElementById("progressScreen");
const dietScreen = document.getElementById("dietScreen");

const exerciseContainer = document.getElementById("exerciseContainer");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

/* =========================
   NAVIGATION
========================= */

document.getElementById("workoutBtn").onclick = openPicker;
document.getElementById("progressBtn").onclick = openProgress;
document.getElementById("dietBtn").onclick = openDiet;

document.getElementById("backWorkout").onclick = goHome;
document.getElementById("backProgress").onclick = goHome;
document.getElementById("backDiet").onclick = goHome;

/* =========================
   SCREEN SWITCH
========================= */

function showScreen(screen){

homeScreen.classList.remove("active");
workoutScreen.classList.remove("active");
progressScreen.classList.remove("active");
dietScreen.classList.remove("active");

screen.classList.add("active");

}

/* =========================
   WORKOUT PICKER
========================= */

function openPicker(){

const overlay = document.getElementById("pickerOverlay");
const list = document.getElementById("workoutList");

overlay.style.display = "flex";
list.innerHTML = "";

WORKOUTS.forEach((w, i) => {

const div = document.createElement("div");
div.className = "workoutItem";
div.innerText = w.title;

div.onclick = () => {
startWorkout(i);
closePicker();
};

list.appendChild(div);

});

}

function closePicker(){
document.getElementById("pickerOverlay").style.display = "none";
}

/* =========================
   START WORKOUT
========================= */

function startWorkout(index){

currentWorkout = WORKOUTS[index];
currentIndex = index;
completed = [];

homeScreen.classList.remove("active");
workoutScreen.classList.add("active");

document.getElementById("workoutTitle").innerText =
currentWorkout.title;

renderWorkout();

}

/* =========================
   RENDER WORKOUT
========================= */

function renderWorkout(){

exerciseContainer.innerHTML = "";

let total = currentWorkout.exercises.length;
let doneCount = completed.length;

progressText.innerText = `${doneCount} / ${total} Completed`;

progressFill.style.width = `${(doneCount / total) * 100}%`;

currentWorkout.exercises.forEach((ex, i) => {

const card = document.createElement("div");
card.className = "exerciseCard";

const info = document.createElement("div");
info.className = "exerciseInfo";

const name = document.createElement("div");
name.className = "exerciseName";
name.innerText = ex.name;

const meta = document.createElement("div");
meta.className = "exerciseMeta";
meta.innerText = ex.sets;

info.appendChild(name);
info.appendChild(meta);

/* CIRCLE BUTTON */

const circle = document.createElement("div");
circle.className = "circleBtn";

if(completed[i]) circle.classList.add("done");

circle.innerText = completed[i] ? "✓" : "";

circle.onclick = () => toggleExercise(i, ex.name);

/* CLICK CARD = LEARN */

card.onclick = (e) => {

if(e.target === circle) return;

openLearn(ex.name);

};

card.appendChild(info);
card.appendChild(circle);

exerciseContainer.appendChild(card);

});

}

/* =========================
   TOGGLE EXERCISE
========================= */

function toggleExercise(i, name){

completed[i] = !completed[i];

if(completed[i]){

// save stats
let stats = JSON.parse(localStorage.getItem("stats")) || {};
stats[name] = (stats[name] || 0) + 1;
localStorage.setItem("stats", JSON.stringify(stats));

}

renderWorkout();

}

/* =========================
   LEARN POPUP
========================= */

function openLearn(name){

const data = LEARN[name];

if(!data) return;

alert(
`${name}

Muscles: ${data.muscles}

Tips: ${data.tips}

Mistakes: ${data.mistakes}

Note: ${data.note}
`
);

}

/* =========================
   PROGRESS SCREEN
========================= */

function openProgress(){

homeScreen.classList.remove("active");
progressScreen.classList.add("active");

const container = document.getElementById("progressCards");
container.innerHTML = "";

let total = history.length;

container.innerHTML = `
<div class="homeCard">
Workouts Completed: ${total}
</div>

<div class="homeCard">
Streak: ${streak.count}
</div>
`;

}

/* =========================
   DIET SCREEN
========================= */

function openDiet(){

homeScreen.classList.remove("active");
dietScreen.classList.add("active");

document.getElementById("dietCards").innerHTML = `
<div class="homeCard">
High Protein Diet Coming Soon
</div>
`;

}

/* =========================
   COMPLETE WORKOUT
========================= */

document.getElementById("finishWorkout").onclick = () => {

if(!currentWorkout) return;

history.push({
title: currentWorkout.title,
date: new Date().toDateString()
});

localStorage.setItem("history", JSON.stringify(history));

updateStreak();

alert("Workout Completed ✔");

goHome();

};

/* =========================
   STREAK SYSTEM
========================= */

function updateStreak(){

let today = new Date().toDateString();

if(streak.last === today) return;

let last = new Date(streak.last);
let now = new Date(today);

if(streak.last && (now - last) / (1000*60*60*24) === 1){
streak.count++;
} else {
streak.count = 1;
}

streak.last = today;

localStorage.setItem("streak", JSON.stringify(streak));

}

/* =========================
   GO HOME
========================= */

function goHome(){

homeScreen.classList.add("active");
workoutScreen.classList.remove("active");
progressScreen.classList.remove("active");
dietScreen.classList.remove("active");

updateHomeCoach();

}

/* =========================
   COACH MESSAGE
========================= */

function updateHomeCoach(){

let msg = "Stay consistent 💪";

if(streak.count >= 3){
msg = "🔥 You're on fire — push harder";
}

if(history.length < 2){
msg = "Build your habit first";
}

document.getElementById("coachSuggestion").innerText = msg;

}

/* =========================
   INIT
========================= */

updateHomeCoach();

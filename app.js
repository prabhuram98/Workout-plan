// Full Object Data containing your requested routine parameters
const routines = {
    day1: {
        title: "🔴 DAY 1 – Full Body A (Strength Base)",
        exercises: [
            "Leg press — 4 × 8–12",
            "Chest press (machine or dumbbell) — 4 × 8–12",
            "Lat pulldown — 4 × 8–12",
            "Shoulder press — 3 × 8–10",
            "Plank — 3 × 60 sec",
            "Cable crunch — 3 × 12–15",
            "🚶 Incline walk — 10 min"
        ]
    },
    day2: {
        title: "🔵 DAY 2 – Fat Loss + Conditioning",
        exercises: [
            "🚶 Steady Incline walk — 25–35 min",
            "🔄 Circuit (3–4 Rounds):",
            "• 12 Squats",
            "• 10 Push-ups",
            "• 20 Mountain climbers",
            "• 30 sec Plank"
        ]
    },
    day3: {
        title: "🟢 DAY 3 – Upper Body (Muscle Build)",
        exercises: [
            "Incline dumbbell press — 3 × 8–12",
            "Seated row — 4 × 8–12",
            "Lateral raises — 3 × 12–15",
            "Lat pulldown — 3 × 8–12",
            "Biceps curls — 3 × 10–12",
            "Triceps pushdown — 3 × 10–12",
            "🚶 Walk — 10 min"
        ]
    },
    day4: {
        title: "🟡 DAY 4 – Active Recovery",
        exercises: [
            "🚶 8,000–12,000 baseline steps",
            "🧘 Light mobility stretching",
            "🌳 Optional 20–30 min easy outdoor stroll"
        ]
    },
    day5: {
        title: "🔴 DAY 5 – Full Body B (Progression Day)",
        exercises: [
            "Squat or leg press — 4 × 8–12",
            "Bench press — 4 × 8–10",
            "Lat pulldown — 3 × 8–12",
            "Shoulder press — 3 × 8–10",
            "Hanging knee raises — 3 × 10–15",
            "🚶 Incline walk — 10–15 min"
        ]
    },
    day6: {
        title: "🔥 DAY 6 – Fat Loss Interval Day",
        exercises: [
            "🚶 Brisk incline walk — 20–25 min",
            "🔄 HIIT Circuit (4–5 Rounds):",
            "• 10 Burpees",
            "• 15 Squats",
            "• 10 Push-ups",
            "• 30–40 sec Plank"
        ]
    }
};

// View Management Switcher
function switchView(targetId) {
    document.getElementById('workout-screen').classList.add('hidden');
    document.getElementById('stats-screen').classList.add('hidden');
    document.getElementById(targetId).classList.remove('hidden');
}

// Render dynamic elements into exercise checklist module
function renderWorkoutDetails() {
    const selectedKey = document.getElementById('workout-selector').value;
    const container = document.getElementById('exercise-list-container');
    const titleElement = document.getElementById('selected-workout-title');
    const ulElement = document.getElementById('exercises-ul');

    if (!selectedKey) {
        container.classList.add('hidden');
        return;
    }

    const currentData = routines[selectedKey];
    titleElement.innerText = currentData.title;
    ulElement.innerHTML = ""; 

    currentData.exercises.forEach(exercise => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-semibold text-gray-700 cursor-pointer transition-all";
        li.innerHTML = `
            <div class="mt-0.5 w-4 h-4 rounded-xs border border-gray-300 flex items-center justify-center bg-white shrink-0 transition-colors"></div>
            <span>${exercise}</span>
        `;
        
        li.onclick = () => {
            const box = li.querySelector('div');
            box.classList.toggle('custom-checkbox-active');
            li.classList.toggle('exercise-item-checked');
        };
        ulElement.appendChild(li);
    });

    container.classList.remove('hidden');
}

// Log execution to persistent local memory
function saveFinishedWorkout() {
    const selectEl = document.getElementById('workout-selector');
    const selectedKey = selectEl.value;
    
    if(!selectedKey) return;

    const workoutName = routines[selectedKey].title;
    
    localStorage.setItem('prabhu_last_workout', workoutName);
    
    loadStatsData();
    
    alert(`Successfully logged: "${workoutName}"!`);
    
    selectEl.value = "";
    document.getElementById('exercise-list-container').classList.add('hidden');
    switchView('stats-screen');
}

// Fetch database memory updates
function loadStatsData() {
    const storedWorkout = localStorage.getItem('prabhu_last_workout');
    const displayEl = document.getElementById('last-workout-display');
    if (storedWorkout) {
        displayEl.innerHTML = `<span class="text-emerald-600 font-extrabold flex items-center gap-1.5"><i data-lucide="check-circle-2" class="w-4 h-4"></i> ${storedWorkout}</span>`;
    } else {
        displayEl.innerText = "No workouts logged yet. Go to Workout section to complete a track.";
    }
    lucide.createIcons();
}

// Initialize on execution
window.onload = () => {
    lucide.createIcons();
    loadStatsData();
};

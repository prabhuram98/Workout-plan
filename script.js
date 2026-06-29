// Initialize App Namespace
const app = {
    currentExercises: [],

    navTo(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    addExercise() {
        const name = document.getElementById('ex-name').value;
        const sets = document.getElementById('ex-sets').value;
        const reps = document.getElementById('ex-reps').value;
        const kgs = document.getElementById('ex-kgs').value;

        if(!name) return;

        this.currentExercises.push({ name, sets, reps, kgs });
        document.getElementById('exercise-list').innerHTML += `
            <div class="ex-item" style="padding:10px; background:#e1bee7; margin-top:5px; border-radius:8px;">
                ${name}: ${sets}x${reps} @ ${kgs}kg
            </div>
        `;
        document.getElementById('ex-name').value = '';
    },

    saveWorkout() {
        const workoutName = document.getElementById('workout-name').value;
        const finalWorkout = { 
            name: workoutName, 
            exercises: this.currentExercises,
            timestamp: new Date().toISOString()
        };
        
        console.log("Saving to Cloud:", finalWorkout);
        alert("Workout saved locally. Ready to connect Firebase!");
    }
};

window.app = app;

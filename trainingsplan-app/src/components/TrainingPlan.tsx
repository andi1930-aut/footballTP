import React, { useState } from 'react';

const TrainingPlan: React.FC = () => {
    const [exercises, setExercises] = useState<{ name: string; sets: number; reps: number; duration: number }[]>([]);
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleAddExercise = () => {
        if (exerciseName && sets > 0 && reps > 0 && duration > 0) {
            setExercises([...exercises, { name: exerciseName, sets, reps, duration }]);
            setExerciseName('');
            setSets(0);
            setReps(0);
            setDuration(0);
        }
    };

    return (
        <div>
            <h1>Training Plan</h1>
            <div>
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Sets"
                    value={sets}
                    onChange={(e) => setSets(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange={(e) => setReps(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                />
                <button onClick={handleAddExercise}>Add Exercise</button>
            </div>
            <h2>Exercises</h2>
            <ul>
                {exercises.map((exercise, index) => (
                    <li key={index}>
                        {exercise.name}: {exercise.sets} sets, {exercise.reps} reps, {exercise.duration} min
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainingPlan;
import React from 'react';

const Evaluations: React.FC = () => {
    // Sample data for evaluation
    const trainingData = [
        { date: '2023-10-01', exercise: 'Squat', sets: 4, reps: 8, weight: 200 },
        { date: '2023-10-03', exercise: 'Bench Press', sets: 4, reps: 6, weight: 180 },
        { date: '2023-10-05', exercise: 'Deadlift', sets: 4, reps: 5, weight: 220 },
    ];

    const analyzePerformance = () => {
        // Logic to analyze performance based on training data
        const totalWeightLifted = trainingData.reduce((total, session) => total + (session.sets * session.reps * session.weight), 0);
        const averageWeight = totalWeightLifted / trainingData.length;

        return {
            totalWeightLifted,
            averageWeight,
        };
    };

    const { totalWeightLifted, averageWeight } = analyzePerformance();

    return (
        <div>
            <h2>Training Evaluations</h2>
            <p>Total Weight Lifted: {totalWeightLifted} lbs</p>
            <p>Average Weight per Session: {averageWeight.toFixed(2)} lbs</p>
            <h3>Training Data</h3>
            <ul>
                {trainingData.map((session, index) => (
                    <li key={index}>
                        {session.date}: {session.exercise} - {session.sets} sets of {session.reps} reps at {session.weight} lbs
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Evaluations;
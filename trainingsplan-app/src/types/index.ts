// filepath: trainingsplan-app/src/types/index.ts

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    duration: number; // in seconds
}

export interface TrainingSession {
    id: string;
    date: string; // ISO format date
    exercises: Exercise[];
    totalDuration: number; // in seconds
}

export interface User {
    id: string;
    name: string;
    email: string;
    trainingSessions: TrainingSession[];
}

export interface Progress {
    date: string; // ISO format date
    strength: number; // e.g., max lift weight
    speed: number; // e.g., sprint time
}

export interface Evaluation {
    userId: string;
    date: string; // ISO format date
    insights: string[];
    recommendations: string[];
}
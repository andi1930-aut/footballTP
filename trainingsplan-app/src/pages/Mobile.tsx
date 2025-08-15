import React from 'react';
import { TrainingPlan } from '../components/TrainingPlan';
import { TrackingSystem } from '../components/TrackingSystem';
import { Diagrams } from '../components/Diagrams';
import { Evaluations } from '../components/Evaluations';
import './Mobile.css';

const Mobile: React.FC = () => {
    return (
        <div className="mobile-container">
            <h1>Training Plan</h1>
            <TrainingPlan />
            <h2>Tracking System</h2>
            <TrackingSystem />
            <h2>Diagrams</h2>
            <Diagrams />
            <h2>Evaluations</h2>
            <Evaluations />
        </div>
    );
};

export default Mobile;
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Training Plan App</h1>
            <p>Your personalized training plan and tracking system for American Football players.</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/training-plan">Training Plan</Link>
                    </li>
                    <li>
                        <Link to="/tracking-system">Tracking System</Link>
                    </li>
                    <li>
                        <Link to="/diagrams">Diagrams</Link>
                    </li>
                    <li>
                        <Link to="/evaluations">Evaluations</Link>
                    </li>
                    <li>
                        <Link to="/mobile">Mobile View</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
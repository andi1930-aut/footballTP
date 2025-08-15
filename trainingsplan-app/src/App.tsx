import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Mobile from './pages/Mobile';
import TrainingPlan from './components/TrainingPlan';
import TrackingSystem from './components/TrackingSystem';
import Diagrams from './components/Diagrams';
import Evaluations from './components/Evaluations';
import './assets/styles.css';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/mobile" component={Mobile} />
                <Route path="/training-plan" component={TrainingPlan} />
                <Route path="/tracking-system" component={TrackingSystem} />
                <Route path="/diagrams" component={Diagrams} />
                <Route path="/evaluations" component={Evaluations} />
            </Switch>
        </Router>
    );
};

export default App;
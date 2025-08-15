import React, { useState, ChangeEvent, FormEvent } from 'react';
import './TrackingSystem.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Workout = {
    exercise: string;
    sets?: number;
    reps?: number;
    weight?: number;
    duration?: number;
    date: string;
    notes: string;
};

const TrackingSystem: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exercise, setExercise] = useState<string>('');
    const [sets, setSets] = useState<string>('');
    const [reps, setReps] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    // Erweiterung: Zeit-Feld für Planks/Core/Mobility/Farmer's Walk/Sprints
    const [duration, setDuration] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [tab, setTab] = useState<'entry' | 'stats' | 'infos'>('entry');

    // Dropdown-Übungen
    const exerciseOptions = [
        'Kniebeugen', 'Bankdrücken', 'Rudern', 'Schulterdrücken', 'Kreuzheben', 'Ausfallschritte', 'Klimmzüge', 'Push-Ups', 'Trizepsdrücken', 'Sprungübungen', 'Power Cleans', "Farmer's Walk", 'Planks', 'Core', 'Mobility', 'Sprints', 'Agility Ladder', 'Medizinballwürfe', 'Box Jumps'
    ];
    const timeExercises = ['Planks', 'Core', 'Mobility', "Farmer's Walk", 'Sprints'];
    function isTimeExercise(ex: string) {
        return timeExercises.includes(ex);
    }

    const handleAddWorkout = () => {
        const newWorkout: Workout = {
            exercise,
            date: new Date().toLocaleDateString(),
            notes,
        };
        if (isTimeExercise(exercise)) {
            newWorkout.duration = parseInt(duration);
            newWorkout.weight = weight ? parseFloat(weight) : 0;
        } else {
            newWorkout.sets = parseInt(sets);
            newWorkout.reps = parseInt(reps);
            newWorkout.weight = parseFloat(weight);
        }
        setWorkouts([...workouts, newWorkout]);
        resetForm();
    };

    const resetForm = () => {
        setExercise('');
        setSets('');
        setReps('');
        setWeight('');
        setDuration('');
        setNotes('');
    };

    // CSV Export
    const exportCSV = () => {
        const header = 'Datum,Übung,Gewicht,Sätze,Wdh.,Notizen\n';
        const csv =
            header +
            workouts
                .map(
                    (w) => `${w.date},${w.exercise},${w.weight},${w.sets},${w.reps},${w.notes}`
                )
                .join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'trainingsdaten.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Workout löschen
    const handleDeleteWorkout = (index: number) => {
        setWorkouts(workouts.filter((_, i) => i !== index));
    };

    return (
    <div className="tracking-main">
            <div className="tab-bar">
                <button onClick={() => setTab('entry')} className={tab==='entry' ? 'tab-btn active' : 'tab-btn'}>Trainingseintrag</button>
                <button onClick={() => setTab('stats')} className={tab==='stats' ? 'tab-btn active' : 'tab-btn'}>Auswertung</button>
                <button onClick={() => setTab('infos')} className={tab==='infos' ? 'tab-btn active' : 'tab-btn'}>Infos</button>
            </div>
            {tab === 'entry' && (
                <>
                    <h2 className="heading-entries center">Workout Tracking</h2>
                    <div className="tracking-container">
                        <h3 className="heading-exercise">Trainingsplan für 18 Wochen – Right Guard (American Football)</h3>
                        <p><strong>3x pro Woche, jeweils ca. 2 Stunden</strong></p>
                        <ol className="plan-list">
                            <li><strong>Woche 1-4: Grundlagen & Technik</strong>
                                <ul>
                                    <li>Tag 1 (Kraft): Kniebeugen 4x6, Bankdrücken 4x6, Rudern 4x8, Planks 3x1min</li>
                                    <li>Tag 2 (Explosivkraft): Kettlebell Swings 4x12, Box Jumps 4x8, Medizinballwürfe 4x10, Mobility 15min</li>
                                    <li>Tag 3 (Oberkörper & Speed): Schulterdrücken 4x8, Klimmzüge (Assist) 4xmax, Push-Ups 4xmax, Sprints (10-20m) 6x</li>
                                </ul>
                            </li>
                            <li><strong>Woche 5-8: Kraftsteigerung & Explosivität</strong>
                                <ul>
                                    <li>Tag 1 (Beine & Core): Kniebeugen 5x5, Kreuzheben 4x6, Ausfallschritte 4x10, Farmer's Walk 4x30m</li>
                                    <li>Tag 2 (Oberkörper): Bankdrücken 5x5, Schulterdrücken 4x8, Rudern 4x8, Trizepsdrücken 4x12</li>
                                    <li>Tag 3 (Speed & Plyos): Sprungübungen 4x8, Medizinballwürfe 4x10, Agility Ladder 10min, Core 3x20</li>
                                </ul>
                            </li>
                            <li><strong>Woche 9-12: Maximalkraft & Schnellkraft</strong>
                                <ul>
                                    <li>Tag 1 (Kraft & Explosivität): Kniebeugen 5x4, Power Cleans 5x4, Planks 3x1min, Mobility 10min</li>
                                    <li>Tag 2 (Oberkörper): Bankdrücken 5x4, Klimmzüge 4xmax, Push-Ups 4xmax, Trizepsdrücken 4x10</li>
                                    <li>Tag 3 (Speed & Agility): Explosivität 4x8, Sprints (20-30m) 8x, Agility Ladder & Richtungswechsel 15min, Core 3x20</li>
                                </ul>
                            </li>
                            <li><strong>Woche 13-16: Intensivierung & Peak</strong>
                                <ul>
                                    <li>Tag 1 (Kraft): Kniebeugen 5x3, Kreuzheben 4x4, Farmer's Walk 4x40m, Planks 3x1min</li>
                                    <li>Tag 2 (Oberkörper): Bankdrücken 5x3, Schulterdrücken 4x6, Rudern 4x8, Mobility 10min</li>
                                    <li>Tag 3 (Speed & Plyos): Speed & Plyos 20min, Explosivität 4x8, Core 3x20</li>
                                </ul>
                            </li>
                            <li><strong>Woche 17-18: Saisonvorbereitung & Regeneration</strong>
                                <ul>
                                    <li>Tag 1: Kniebeugen 3x5, Power Cleans 3x5, Planks 3x1min</li>
                                    <li>Tag 2: Bankdrücken 3x5, Klimmzüge 3xmax, Push-Ups 3xmax</li>
                                    <li>Tag 3: Explosivität 3x8, Mobility & Stretching 20min</li>
                                </ul>
                            </li>
                        </ol>
                        <p className="plan-note">
                            <strong>Hinweise:</strong> Steigere die Gewichte jede Woche moderat, achte auf saubere Technik.<br />
                            Explosivkraft-Übungen immer mit maximaler Geschwindigkeit ausführen.<br />
                            Sprints und Agility-Drills mit voller Intensität, aber ausreichend Pausen.<br />
                            Mobility und Core sind in jeder Einheit wichtig für Verletzungsprophylaxe und Stabilität.
                        </p>
                    </div>
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            handleAddWorkout();
                        }}
                        className="form-grid"
                    >
                        <div className="form-group">
                            <label htmlFor="exercise">Übung</label>
                            <select
                                id="exercise"
                                value={exercise}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setExercise(e.target.value)}
                                required
                                className="input-field"
                            >
                                <option value="">Bitte wählen...</option>
                                {exerciseOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        {/* Dynamische Felder je nach Übungstyp */}
                        {!isTimeExercise(exercise) && exercise && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="weight">Gewicht (kg)</label>
                                    <input
                                        id="weight"
                                        type="number"
                                        placeholder="Gewicht"
                                        value={weight}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sets">Sätze</label>
                                    <input
                                        id="sets"
                                        type="number"
                                        placeholder="Sets"
                                        value={sets}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSets(e.target.value)}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reps">Wiederholungen</label>
                                    <input
                                        id="reps"
                                        type="number"
                                        placeholder="Reps"
                                        value={reps}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setReps(e.target.value)}
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </>
                        )}
                        {isTimeExercise(exercise) && exercise && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="duration">Dauer (Sekunden)</label>
                                    <input
                                        id="duration"
                                        type="number"
                                        placeholder="Zeit in Sekunden"
                                        value={duration}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="weight">Zusatzgewicht (kg)</label>
                                    <input
                                        id="weight"
                                        type="number"
                                        placeholder="Zusatzgewicht (kg)"
                                        value={weight}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <label htmlFor="notes">Notizen</label>
                            <input
                                id="notes"
                                type="text"
                                placeholder="Notizen"
                                value={notes}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="tab-btn active">Workout hinzufügen</button>
                    </form>
                    <h3 className="heading-entries">Deine Einträge</h3>
                    <ul className="entries-list">
                        {workouts.map((workout, index) => (
                            <li key={index} className="entry-item light">
                                <span>
                                    <strong>{workout.date}</strong>: {workout.exercise} – {workout.weight} kg, {workout.sets} Sätze x {workout.reps} Wdh. {workout.notes && <>| <em>{workout.notes}</em></>}
                                </span>
                                <button onClick={() => handleDeleteWorkout(index)} className="delete-btn" aria-label="Eintrag löschen">Löschen</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={exportCSV} className="export-btn">Export als CSV</button>
                </>
            )}
            {tab === 'stats' && (
                <>
                    <h2 className="heading-entries center">Auswertung</h2>
                    <div className="tracking-container">
                        <p><strong>Trainingsanzahl:</strong> {workouts.length}</p>
                        <p><strong>Gesamtgewicht bewegt:</strong> {
                            workouts
                                .filter(w => w.weight !== undefined && w.sets !== undefined && w.reps !== undefined)
                                .reduce((sum, w) => sum + ((w.weight ?? 0) * (w.sets ?? 0) * (w.reps ?? 0)), 0)
                        } kg</p>
                        <p><strong>Durchschnittliches Gewicht pro Satz:</strong> {
                            (() => {
                                const kraftWorkouts = workouts.filter(w => w.weight !== undefined);
                                return kraftWorkouts.length > 0
                                    ? (kraftWorkouts.reduce((sum, w) => sum + (w.weight ?? 0), 0) / kraftWorkouts.length).toFixed(2)
                                    : 0;
                            })()
                        } kg</p>
                        <p><strong>Letztes Training:</strong> {workouts.length > 0 ? workouts[workouts.length-1].date : '-'}</p>
                    </div>
                    <div className="tracking-container">
                        <h3 className="heading-main">Gewichtsentwicklung (alle Einträge)</h3>
                        <Line
                            data={{
                                labels: workouts.map(w => w.date),
                                datasets: [
                                    {
                                        label: 'Gewicht (kg)',
                                        data: workouts.map(w => w.weight),
                                        borderColor: '#43a047',
                                        backgroundColor: 'rgba(67,160,71,0.2)',
                                        tension: 0.3,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        labels: { color: '#f5f5f5' }
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: { color: '#f5f5f5' },
                                        grid: { color: '#333' }
                                    },
                                    y: {
                                        ticks: { color: '#f5f5f5' },
                                        grid: { color: '#333' }
                                    }
                                }
                            }}
                        />
                        <h3 className="heading-main heading-margin">Auswertung pro Übung</h3>
                        {Array.from(new Set(workouts.map(w => w.exercise))).map((exerciseName) => {
                            const exerciseData = workouts.filter(w => w.exercise === exerciseName);
                            return (
                                <div key={exerciseName} className="tracking-container">
                                    <h4 className="heading-exercise">{exerciseName}</h4>
                                    <Line
                                        data={{
                                            labels: exerciseData.map(w => w.date),
                                            datasets: [
                                                {
                                                    label: `${exerciseName} Gewicht (kg)`,
                                                    data: exerciseData.map(w => w.weight),
                                                    borderColor: '#1976d2',
                                                    backgroundColor: 'rgba(25,118,210,0.2)',
                                                    tension: 0.3,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    labels: { color: '#f5f5f5' }
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    ticks: { color: '#f5f5f5' },
                                                    grid: { color: '#333' }
                                                },
                                                y: {
                                                    ticks: { color: '#f5f5f5' },
                                                    grid: { color: '#333' }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <h3 className="heading-entries">Alle Einträge</h3>
                    <ul className="entries-list">
                        {workouts.map((workout, index) => (
                            <li key={index} className="entry-item">
                                <span>
                                    <strong>{workout.date}</strong>: {workout.exercise} – {workout.weight} kg, {workout.sets} Sätze x {workout.reps} Wdh. {workout.notes && <>| <em>{workout.notes}</em></>}
                                </span>
                                <button onClick={() => handleDeleteWorkout(index)} className="delete-btn" aria-label="Eintrag löschen">Löschen</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {tab === 'infos' && (
                <>
                    <h2 className="heading-entries center">Übungs- und Trainingsinfos</h2>
                    <div className="tracking-container">
                        <h3 className="heading-main">Core</h3>
                        <p>Core-Training stärkt die Rumpfmuskulatur (Bauch, Rücken, Hüfte) und verbessert Stabilität, Haltung und Kraftübertragung. Typische Übungen: Planks, Russian Twists, Dead Bugs.</p>
                        <h3 className="heading-main">Push-Ups</h3>
                        <p>Push-Ups (Liegestütze) trainieren Brust, Schultern und Trizeps. Sie fördern Kraft, Stabilität und können in vielen Varianten ausgeführt werden.</p>
                        <h3 className="heading-main">Mobility</h3>
                        <p>Mobility-Training verbessert die Beweglichkeit und Gelenkgesundheit. Es hilft Verletzungen vorzubeugen und die Leistung zu steigern. Typische Übungen: Stretching, dynamische Bewegungen.</p>
                        <h3 className="heading-main">Farmer's Walk</h3>
                        <p>Der Farmer's Walk ist eine funktionelle Übung für Griffkraft, Rumpfstabilität und Kondition. Man trägt schwere Gewichte über eine bestimmte Strecke.</p>
                        <h3 className="heading-main">Trizeps</h3>
                        <p>Trizeps-Übungen stärken den hinteren Oberarm. Wichtige Übungen: Trizeps-Dips, Trizepsdrücken, enge Liegestütze.</p>
                        <h3 className="heading-main">Sprungübungen</h3>
                        <p>Sprungübungen (Plyometrics) fördern Explosivität, Schnellkraft und Koordination. Beispiele: Box Jumps, Burpees, Tuck Jumps.</p>
                        <h3 className="heading-main">Power Cleans</h3>
                        <p>Power Cleans sind eine Gewichtheberübung für Explosivität, Ganzkörperkraft und Technik. Sie trainieren Beine, Rücken, Schultern und Core.</p>
                        <h3 className="heading-main">Agility</h3>
                        <p>Agility-Training verbessert die Beweglichkeit, Reaktionsfähigkeit und Schnelligkeit. Typische Übungen: Agility Ladder, Richtungswechsel, Hütchen-Parcours.</p>
                        <h3 className="heading-main">Speed & Plyos</h3>
                        <p>Speed & Plyos kombinieren Schnelligkeits- und Sprungkrafttraining. Ziel: Explosivität, Sprintleistung und athletische Bewegungen zu verbessern.</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default TrackingSystem;

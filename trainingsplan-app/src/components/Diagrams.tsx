import React from 'react';
import { Line } from 'react-chartjs-2';

const Diagrams = ({ trainingData }) => {
    const chartData = {
        labels: trainingData.map(data => data.date),
        datasets: [
            {
                label: 'Strength Progress',
                data: trainingData.map(data => data.strength),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Speed Progress',
                data: trainingData.map(data => data.speed),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Training Progress Diagrams</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Diagrams;
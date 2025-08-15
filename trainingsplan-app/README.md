# Training Plan App

## Overview
The Training Plan App is a web application designed for American Football players, specifically tailored for those playing as Right Guards. This app allows users to create and manage their training plans, track their workouts, visualize their progress through diagrams, and receive evaluations based on their performance.

## Features
- **Training Plan Management**: Create and manage personalized training plans with exercises, sets, reps, and durations.
- **Workout Tracking**: Log training sessions and monitor progress over time.
- **Visual Diagrams**: Generate charts and graphs to visualize training data, showcasing improvements in strength and speed.
- **Performance Evaluations**: Analyze training data and receive insights or recommendations to enhance performance.

## Project Structure
```
trainingsplan-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── TrainingPlan.tsx
│   │   ├── TrackingSystem.tsx
│   │   ├── Diagrams.tsx
│   │   └── Evaluations.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   └── Mobile.tsx
│   ├── assets
│   │   └── styles.css
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd trainingsplan-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

### Building for Production
To create a production build, run:
```
npm run build
```
The build artifacts will be stored in the `build` directory.

## Usage
- Navigate to the homepage to access different sections of the app.
- Use the Training Plan component to set up your training regimen.
- Track your workouts and visualize your progress through the Tracking System and Diagrams components.
- Review evaluations to gain insights into your training performance.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [currentStage, setCurrentStage] = useState(0); // 0: Intro, 1: Roots, 2: Kingdoms, 3: Dawn, 4: Victory
    const [score, setScore] = useState(0);
    const [isPanicMode, setPanicMode] = useState(false);
    const [unlockedStages, setUnlockedStages] = useState([1]); // Stage 1 unlocked by default after intro

    // Audio refs (placeholders for now)
    const playSound = (type) => {
        console.log(`Playing sound: ${type}`);
        // implementation later
    };

    const advanceStage = () => {
        const next = currentStage + 1;
        if (next <= 4) {
            setCurrentStage(next);
            if (!unlockedStages.includes(next)) {
                setUnlockedStages(prev => [...prev, next]);
            }
            playSound('door_open');
        }
    };

    const addScore = (points) => {
        setScore(prev => prev + points);
    };

    const toPanicMode = (state) => {
        setPanicMode(state);
    };

    return (
        <GameContext.Provider value={{
            currentStage,
            setCurrentStage,
            score,
            addScore,
            isPanicMode,
            toPanicMode,
            unlockedStages,
            advanceStage,
            playSound
        }}>
            {children}
        </GameContext.Provider>
    );
};

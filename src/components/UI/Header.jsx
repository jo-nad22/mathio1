import React from 'react';
import { useGame } from '../../context/GameContext';
import { Clock, Lock, Unlock } from 'lucide-react';

const Header = () => {
    const { currentStage, unlockedStages, score } = useGame();

    const progress = (unlockedStages.length / 4) * 100;

    return (
        <header style={{
            width: '100%',
            marginBottom: '30px',
            textAlign: 'center'
        }}>
            {/* Arabic Title */}
            <h1 style={{
                fontFamily: "'Rakkas', serif",
                fontSize: '4rem',
                color: '#FFFFFF',
                textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
                marginBottom: '10px',
                fontWeight: 'bold'
            }}>
                شفرة الأجيال: طريق النور
            </h1>

            {/* English Subtitle */}
            <p style={{
                fontFamily: "'Rakkas', serif",
                fontSize: '1.8rem',
                color: '#F4E4BC',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                marginBottom: '20px',
                letterSpacing: '2px',
                fontWeight: 'bold'
            }}>
                THE LINEAGE CODE: PATH OF LIGHT
            </p>

            {/* Top Bar with Timer and Locks */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
                padding: '0 20px'
            }}>
                {/* Timer */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(44, 24, 16, 0.95)',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    border: '2px solid #D4AF37',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}>
                    <Clock size={28} color="#D4AF37" />
                    <span style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        textShadow: '1px 1px 2px #000'
                    }}>--:--</span>
                </div>

                {/* Unlocked Seals */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '15px' }}>
                    <span style={{
                        fontFamily: "'Amiri', serif",
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        color: '#F4E4BC',
                        textShadow: '1px 1px 2px #000'
                    }}>الأختام:</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {[1, 2, 3].map(s =>
                            unlockedStages.includes(s + 1) ?
                                <Unlock key={s} size={24} color="#2e7d32" strokeWidth={2.5} /> :
                                <Lock key={s} size={24} color="#9e9e9e" strokeWidth={2} />
                        )}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '20px',
                background: 'rgba(62, 39, 35, 0.3)',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '2px solid #654321',
                position: 'relative'
            }}>
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #c5a059 0%, #d4af37 50%, #f0e68c 100%)',
                    transition: 'width 1s ease-out',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)'
                }} />
            </div>
        </header>
    );
};

export default Header;

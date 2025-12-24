import React from 'react';
import { useGame } from '../../context/GameContext';

const GameContainer = ({ children }) => {
    const { isPanicMode } = useGame();

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            background: '#2a1810',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Main Parchment Map */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1400px',
                minHeight: '90vh',
                background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d4ba 50%, #d9c4a9 100%)',
                borderRadius: '12px',
                boxShadow: `
          inset 0 0 100px rgba(101, 67, 33, 0.3),
          0 20px 60px rgba(0, 0, 0, 0.5),
          0 0 0 8px #8B7355,
          0 0 0 12px #5D4E37
        `,
                padding: '40px',
                backgroundImage: `
          url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix values='0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")
        `
            }}>

                {/* Decorative Corners */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    width: '60px',
                    height: '60px',
                    borderTop: '4px solid #654321',
                    borderLeft: '4px solid #654321',
                    opacity: 0.6
                }} />
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderTop: '4px solid #654321',
                    borderRight: '4px solid #654321',
                    opacity: 0.6
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    width: '60px',
                    height: '60px',
                    borderBottom: '4px solid #654321',
                    borderLeft: '4px solid #654321',
                    opacity: 0.6
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderBottom: '4px solid #654321',
                    borderRight: '4px solid #654321',
                    opacity: 0.6
                }} />

                {/* Olive Tree Decoration - Left Side */}
                <div style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '10%',
                    width: '300px',
                    height: '400px',
                    opacity: 0.15,
                    pointerEvents: 'none'
                }}>
                    <svg viewBox="0 0 200 300" style={{ width: '100%', height: '100%' }}>
                        <path d="M100 280 L100 100" stroke="#5a4a3a" strokeWidth="8" fill="none" />
                        <circle cx="70" cy="80" r="35" fill="#6b7c3d" opacity="0.7" />
                        <circle cx="130" cy="80" r="35" fill="#6b7c3d" opacity="0.7" />
                        <circle cx="100" cy="50" r="40" fill="#6b7c3d" opacity="0.8" />
                        <circle cx="85" cy="90" r="30" fill="#7a8c4e" opacity="0.6" />
                        <circle cx="115" cy="90" r="30" fill="#7a8c4e" opacity="0.6" />
                    </svg>
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    {children}
                </div>

                {/* Panic Mode Overlay */}
                {isPanicMode && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle, transparent 30%, rgba(139, 0, 0, 0.4) 100%)',
                        animation: 'pulse 1s infinite',
                        pointerEvents: 'none',
                        zIndex: 100
                    }} />
                )}
            </div>
        </div>
    );
};

export default GameContainer;

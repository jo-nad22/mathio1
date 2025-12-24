import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import GameContainer from './components/Layout/GameContainer';
import Header from './components/UI/Header';
import Stage1_Roots from './components/Stages/Stage1_Roots';
import Stage2_Kingdoms from './components/Stages/Stage2_Kingdoms';
import Stage3_Dawn from './components/Stages/Stage3_Dawn';

const Intro = ({ onStart }) => (
    <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{
            fontFamily: "'Amiri', serif",
            fontSize: '1.8rem',
            lineHeight: '2.4',
            color: '#FFFFFF',
            marginBottom: '50px',
            textAlign: 'justify',
            fontWeight: '800',
            textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
            background: 'rgba(44, 24, 16, 0.95)',
            padding: '30px',
            borderRadius: '12px',
            border: '3px solid #D4AF37'
        }}>
            "عزيزي الباحث، أنت على وشك أن تخطو في رحلة عبر الزمن، لتكشف أسرار أجيال حملت في طياتها خطة الخلاص العظيمة. كل اسم في هذه السلسلة هو حجر زاوية في بناء المجد. هل أنت مستعد لتتبع النور؟"
        </p>
        <button
            onClick={onStart}
            className="heritage-btn heritage-btn-gold"
            style={{ fontSize: '2rem', padding: '20px 60px' }}
        >
            ⭐ ابدأ الرحلة ⭐
        </button>
    </div>
);

const GameContent = () => {
    const { currentStage, setCurrentStage } = useGame();
    const [showTransition, setShowTransition] = React.useState(false);
    const [prevStage, setPrevStage] = React.useState(currentStage);

    React.useEffect(() => {
        if (currentStage > prevStage && currentStage > 1 && currentStage < 4) {
            setShowTransition(true);
            setTimeout(() => setShowTransition(false), 3000);
        }
        setPrevStage(currentStage);
    }, [currentStage]);

    const renderTransition = () => {
        if (!showTransition) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in">
                <div className="text-center border-4 border-[#D4AF37] p-12 rounded-xl bg-[#2c1810]">
                    <h2 className="text-6xl font-bold text-[#D4AF37] mb-4" style={{ fontFamily: "'Rakkas', serif", textShadow: '0 0 20px #D4AF37' }}>
                        اكتمل الجيل!
                    </h2>
                    <p className="text-3xl text-white" style={{ fontFamily: "'Amiri', serif" }}>
                        جاري الانتقال للحقبة التالية...
                    </p>
                </div>
            </div>
        );
    };

    const renderStage = () => {
        switch (currentStage) {
            case 0: return <Intro onStart={() => setCurrentStage(1)} />;
            case 1: return <Stage1_Roots />;
            case 2: return <Stage2_Kingdoms />;
            case 3: return <Stage3_Dawn />;
            case 4: return (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px'
                }}>
                    <h2 style={{
                        fontFamily: "'Rakkas', serif",
                        fontSize: '3rem',
                        color: '#2e7d32',
                        marginBottom: '20px',
                        textShadow: '2px 2px 0 rgba(255,255,255,0.5)'
                    }}>
                        🎉 تهانينا! 🎉
                    </h2>
                    <p style={{
                        fontFamily: "'Amiri', serif",
                        fontSize: '1.8rem',
                        color: '#2c1810',
                        lineHeight: '2'
                    }}>
                        لقد تتبعت النور عبر الأجيال ووصلت إلى مخلصنا يسوع المسيح!
                    </p>
                </div>
            );
            default: return <Intro onStart={() => setCurrentStage(1)} />;
        }
    };

    return (
        <GameContainer>
            {renderTransition()}
            <Header />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'auto' }}>
                {renderStage()}
            </div>
        </GameContainer>
    );
};

const App = () => {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
};

export default App;

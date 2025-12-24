import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Lightbulb, Smile, Flag } from 'lucide-react';

const Stage3_Dawn = () => {
    const { advanceStage, playSound, addScore, toPanicMode } = useGame();

    const [puzzle1Value, setPuzzle1Value] = useState('');
    const [puzzle2Value, setPuzzle2Value] = useState('');

    const [puzzle1Solved, setPuzzle1Solved] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Puzzle 1: Zerubbabel -> ?
    // Answer: Abiud (أبيهود)
    const handlePuzzle1Submit = (e) => {
        e.preventDefault();
        const clean = puzzle1Value.trim();
        if (['أبيهود', 'ابيهود'].includes(clean)) {
            setPuzzle1Solved(true);
            playSound('unlock');
            addScore(100);
            setPuzzle1Value(clean); // Lock it
        } else {
            playSound('fail_whisper');
            setErrorMsg('خطأ! زربابل لم يكمل الملك، لكن ابنه استمر.');
            setTimeout(() => setErrorMsg(''), 2500);
        }
    };

    // Puzzle 2: Final (Joseph)
    // Answer: Joseph (يوسف)
    const handlePuzzle2Submit = (e) => {
        e.preventDefault();
        const clean = puzzle2Value.trim();
        // Allow "يوسف", "يوسف النجار", "القديس يوسف"
        if (clean.includes('يوسف')) {
            playSound('success_chime'); // Big fanfare?
            addScore(500); // Big win
            advanceStage(); // To Victory
        } else {
            playSound('fail_whisper');
            setErrorMsg('خطأ! هو خطيب مريم.');
            setTimeout(() => setErrorMsg(''), 2500);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-4 overflow-y-auto custom-scrollbar">
            <div className="text-center mb-8">
                <div className="inline-block px-8 py-4 rounded-lg" style={{ background: 'rgba(44, 24, 16, 0.95)', border: '3px solid #D4AF37' }}>
                    <h2 style={{ fontFamily: "'Rakkas', serif", fontSize: '3rem', color: '#FFFFFF', marginBottom: '8px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>فجر الخلاص</h2>
                    <p style={{ color: '#F4E4BC', fontSize: '1.5rem', fontWeight: 'bold' }}>من سبي بابل إلى المسيح</p>
                </div>
            </div>

            {!puzzle1Solved ? (
                <div className="w-full max-w-md p-6 rounded-lg border-2 border-[#D4AF37] mb-8 bg-[#2c1810]/90 text-white shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4 flex gap-2 justify-center" style={{ fontFamily: "'Rakkas', serif", color: '#FFFFFF' }}>
                        <Lightbulb className="text-[#D4AF37]" /> الجيل التالي لزربابل؟
                    </h3>
                    <p className="mb-4 text-center" style={{ color: '#F4E4BC' }}>"شألتيئيل أنجب زربابل... وزربابل أنجب ؟؟؟"</p>
                    <form onSubmit={handlePuzzle1Submit} className="flex flex-col gap-3">
                        <input
                            value={puzzle1Value}
                            onChange={(e) => setPuzzle1Value(e.target.value)}
                            className="heritage-input"
                            placeholder="الاسم..."
                        />
                        <button type="submit" className="heritage-btn w-full mt-4">
                            تحقق
                        </button>
                    </form>
                    {errorMsg && !puzzle1Solved && <p className="text-center mt-2 font-bold" style={{ color: '#ef9a9a' }}>{errorMsg}</p>}
                </div>
            ) : (
                <div className="w-full max-w-md p-4 rounded mb-8 text-center border-2 border-[#D4AF37] animate-fade-in" style={{ background: 'rgba(46, 125, 50, 0.9)', color: '#FFFFFF' }}>
                    <p className="font-bold">أحسنت! أبيهود.</p>
                </div>
            )}

            {puzzle1Solved && (
                <div className="w-full max-w-md p-6 rounded-lg border-2 border-[#D4AF37] text-center animate-slide-up shadow-2xl bg-[#2c1810]/90">
                    <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Rakkas', serif", color: '#FFFFFF' }}>اللغز الأخير</h3>
                    <p className="text-xl mb-6 leading-relaxed" style={{ color: '#F4E4BC' }}>
                        "من هو 'خطيب العذراء مريم' الذي يختتم هذه السلسلة العظيمة؟"
                    </p>

                    <form onSubmit={handlePuzzle2Submit} className="flex flex-col gap-4">
                        <input
                            value={puzzle2Value}
                            onChange={(e) => setPuzzle2Value(e.target.value)}
                            className="heritage-input"
                            placeholder="......."
                            autoFocus
                        />
                        <button type="submit" className="heritage-btn heritage-btn-gold w-full flex items-center justify-center gap-2">
                            <Flag className="text-[#2C1810]" /> فتح الختم الأخير
                        </button>
                    </form>
                    {errorMsg && <p className="text-red-400 font-bold mt-2 text-center" style={{ textShadow: '1px 1px 2px black' }}>{errorMsg}</p>}
                </div>
            )}
        </div>
    );
};

export default Stage3_Dawn;

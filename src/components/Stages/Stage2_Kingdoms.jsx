import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { AlertTriangle, Timer, XCircle } from 'lucide-react';

const Stage2_Kingdoms = () => {
    const { advanceStage, playSound, addScore, toPanicMode } = useGame();

    // STAGE STATE
    const [timeLeft, setTimeLeft] = useState(40); // 40 seconds Panic Timer
    const [isFailed, setIsFailed] = useState(false);

    // Puzzle 1: Odd One Out
    // "يوشيا" is technically good, but User prompt says: "الاسم الدخيل (للمبرمج): أحزيا (Ahab's son). (سيتم استبدال يوشيا بالاسم الدخيل في عرض اللعبة)."
    // Wait, User Prompt says: "الأسماء المعروضة: رحبعام - أبيا - حزقيا - يوشيا - يورام - يهوشافاط."
    // THEN says: "الاسم الدخيل (للمبرمج): أحزيا... سيتم استبدال يوشيا بالاسم الدخيل في عرض اللعبة."
    // So I should DISPLAY "Ahaziah" (أحزيا) instead of "Josiah" (يوشيا) in the list?
    // AND Ahaziah is the WRONG one (Odd One Out). 
    // Wait, "Rhoboam, Abijah, Hezekiah, Joram, Jehoshaphat" are in Matthew?
    // Matthew 1:7-8: Solomon -> Rehoboam -> Abijah -> Asa -> Jehoshaphat -> Joram -> Uzziah.
    // "Ahaziah" is NOT in Matthew (skipped).
    // So "Ahaziah" is the odd one out.
    // The list provided by user: "رحبعام - أبيا - حزقيا - يوشيا - يورام - يهوشافاط"
    // User instruction: "Replace Josiah with Ahaziah in the display".
    // So List: Rehoboam, Abijah, Hezekiah, Ahaziah, Joram, Jehoshaphat.
    // Target: Ahaziah.
    const [kingsList, setKingsList] = useState([
        { id: 'rehoboam', name: 'رحبعام', isOdd: false },
        { id: 'abijah', name: 'أبيا', isOdd: false },
        { id: 'hezekiah', name: 'حزقيا', isOdd: false },
        { id: 'ahaziah', name: 'أحزيا', isOdd: true }, // The odd one
        { id: 'joram', name: 'يورام', isOdd: false },
        { id: 'jehoshaphat', name: 'يهوشافاط', isOdd: false },
    ]);
    const [oddOneSolved, setOddOneSolved] = useState(false);

    // Puzzle 2: Description (Josiah)
    const [inputValue, setInputValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // TIMER LOGIC
    useEffect(() => {
        if (isFailed || oddOneSolved && inputValue) return; // Stop if failed or won (approx)
        // Actually stop timer only if Stage is done. But here we stop panic visual if puzzle 1 solved? No, panic until whole stage is done?
        // "Panic Timer ... if time runs out before solving (Josiah) ... room collapses".
        // So timer runs until BOTH puzzles are solved.

        if (timeLeft <= 0) {
            handleFail();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        // Trigger visual panic
        if (timeLeft <= 15) {
            toPanicMode(true); // Red/Shake
        }

        return () => clearInterval(timer);
    }, [timeLeft, isFailed]);

    // Handle Fail (Time Out)
    const handleFail = () => {
        setIsFailed(true);
        toPanicMode(false); // Stop shaking, maybe show Crumbled Room
        playSound('collapse_sound'); // Placeholder
    };

    // Handle Retry
    const handleRetry = () => {
        setIsFailed(false);
        setTimeLeft(40);
        setOddOneSolved(false);
        setInputValue('');
        toPanicMode(false);
    };

    // Puzzle 1 Handler
    const handleKingClick = (king) => {
        if (king.isOdd) {
            setOddOneSolved(true);
            playSound('success_chime');
            addScore(50);
        } else {
            // Wrong click penalty? Time penalty?
            setTimeLeft(prev => Math.max(0, prev - 5)); // -5 seconds penalty
            playSound('fail_whisper');
        }
    };

    // Puzzle 2 Handler
    const handleInputSubmit = (e) => {
        e.preventDefault();
        const cleanInput = inputValue.trim();
        if (['يوشيا', 'يوشياء'].includes(cleanInput)) {
            playSound('unlock');
            addScore(200 + timeLeft); // Time bonus
            toPanicMode(false);
            advanceStage();
        } else {
            setErrorMsg('إجابة خاطئة! الوقت ينفد!');
            playSound('fail_whisper');
            setTimeout(() => setErrorMsg(''), 2000);
        }
    };

    if (isFailed) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in z-50 relative">
                <div className="absolute inset-0 bg-black/80 z-0"></div>
                <div className="relative z-10 border-4 border-[#8B0000] p-8 rounded-xl bg-[#2c1810] shadow-2xl max-w-lg">
                    <h2 className="text-5xl font-bold text-[#ff5252] mb-6" style={{ fontFamily: "'Rakkas', serif", textShadow: '0 0 10px #8B0000' }}>تهدمت الغرفة!</h2>
                    <p className="text-2xl mb-8 text-white font-bold" style={{ fontFamily: "'Amiri', serif" }}>لم تستطع كشف السر في الوقت المناسب.</p>
                    <button
                        onClick={handleRetry}
                        className="heritage-btn heritage-btn-gold"
                        style={{ padding: '15px 40px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}
                    >
                        🔄 إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-4 overflow-y-auto custom-scrollbar">
            <div className={`flex items-center gap-2 mb-6 ${timeLeft <= 10 ? 'animate-pulse text-red-600 scale-110' : ''}`} style={{ color: timeLeft <= 10 ? 'red' : '#F4E4BC', textShadow: '1px 1px 2px #000' }}>
                <Timer className="w-8 h-8" color={timeLeft <= 10 ? 'red' : '#D4AF37'} />
                <span className="text-4xl font-mono font-bold">{timeLeft}s</span>
            </div>

            {/* Puzzle 1: Kings */}
            {!oddOneSolved ? (
                <div className="w-full max-w-lg">
                    <div className="inline-block px-4 py-2 rounded mb-4" style={{ background: 'rgba(44, 24, 16, 0.95)', border: '2px solid #D4AF37' }}>
                        <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: '#FFFFFF' }}>من هو الاسم الدخيل؟</h3>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {kingsList.map(king => (
                            <button
                                key={king.id}
                                onClick={() => handleKingClick(king)}
                                className="heritage-btn p-2 text-base md:text-lg"
                                style={{ minHeight: '80px' }}
                            >
                                {king.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="p-4 rounded border-2 border-[#D4AF37] text-white mb-6 w-full max-w-lg text-center animate-slide-up" style={{ background: 'rgba(46, 125, 50, 0.9)', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                    <p className="font-bold">أحسنت! أحزيا تم إسقاطه من السلسلة.</p>
                </div>
            )}

            {/* Puzzle 2: Josiah */}
            {oddOneSolved && (
                <div className="w-full max-w-md mt-4 animate-slide-up">
                    <div className="inline-block px-4 py-2 rounded mb-4" style={{ background: 'rgba(44, 24, 16, 0.95)', border: '2px solid #D4AF37' }}>
                        <h3 className="text-xl font-bold text-center" style={{ color: '#FFFFFF' }}>ملك الـ 8 سنوات</h3>
                    </div>
                    <div className="px-4 py-3 rounded mb-4 text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid #D4AF37' }}>
                        <p className="text-lg leading-relaxed font-bold" style={{ color: '#F4E4BC' }}>"فعل ما هو مستقيم في عيني الرب... من هو؟"</p>
                    </div>

                    <form onSubmit={handleInputSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="اكتب اسم الملك..."
                            className="heritage-input"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="heritage-btn"
                            style={{ background: 'linear-gradient(135deg, #b71c1c 0%, #8B0000 100%)', color: '#fff' }}
                        >
                            تثبيت وإيقاف الانهيار
                        </button>
                    </form>
                    {errorMsg && <p className="text-red-600 font-bold text-center mt-2">{errorMsg}</p>}
                </div>
            )}
        </div>
    );
};

export default Stage2_Kingdoms;

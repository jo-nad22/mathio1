import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { CheckCircle2, ArrowRightLeft, Lock } from 'lucide-react';

const initialAbrahamEvents = [
    { id: 'sacrifice', text: 'تقديم الذبيحة على الجبل' },
    { id: 'call', text: 'دعوة الله للخروج من الأرض' },
    { id: 'promise', text: 'الوعد بالنسل كنجوم السماء' },
];

const correctAbrahamOrder = ['call', 'promise', 'sacrifice'];

const initialLineage = [
    { id: 'yessar', text: 'يسار' }, // Wrong/Extra? No, wait. Task says: "يسار - بوعز - إسحق - راحاب - يهوذا - إبراهيم"
    { id: 'boaz', text: 'بوعز' },
    { id: 'isaac', text: 'إسحق' },
    { id: 'rahab', text: 'راحاب' },
    { id: 'judah', text: 'يهوذا' },
    { id: 'abraham', text: 'إبراهيم' },
];

// Correct: Abraham -> Isaac -> Judah -> Rahab -> Boaz -> Yessar (Wait, Yessar? Aram? Bible: Abraham->Isaac->Jacob->Judah->Perez->Hezron->Ram->Amminadab->Nahshon->Salmon->Boaz->Obed->Jesse->David.
// User prompt said: "الترتيب الصحيح (للتحقق): إبراهيم - إسحق - يهوذا - راحاب - بوعز - يسار." 
// "يسار" might be a typo for "يسى" (Jesse)? Or something else?
// Ah, Stage 1 Password is "Jesse" (يَسَّى). The input puzzle asks for "Link between Obed and David".
// The sort list "يسار" is strange. Let's look at the user prompt: "الأسماء المعروضة (مبعثرة): يسار - بوعز - إسحق - راحاب - يهوذا - إبراهيم."
// "الترتيب الصحيح: إبراهيم - إسحق - يهوذا - راحاب - بوعز - يسار."
// "يسار" (Yassar/Isar?) is likely a typo for "Ram" or "Hezron" or just a filler?
// Wait, "يسار" is the last one in their list. And the next puzzle asks for "Obed -> ? -> David".
// Boaz begot Obed. Obed begot Jesse. Jesse begot David.
// Rahab was Boaz's mother. 
// Judah was ancestor.
// So chronologically: Abraham -> Isaac -> Judah -> ... -> Rahab -> Boaz ...
// If "يسار" is the last one, maybe it's meant to be "Jesse"? But the NEXT puzzle is finding Jesse.
// I will stick EXACTLY to the User's "Correct Order" list for validation to be safe: [Abraham, Isaac, Judah, Rahab, Boaz, Yessar].
const correctLineageOrder = ['abraham', 'isaac', 'judah', 'rahab', 'boaz', 'yessar'];

const Stage1_Roots = () => {
    const { advanceStage, playSound, addScore } = useGame();

    // Puzzle 1 State: Abraham
    const [abrahamEvents, setAbrahamEvents] = useState(initialAbrahamEvents);
    const [abrahamSolved, setAbrahamSolved] = useState(false);

    // Puzzle 2 State: Lineage
    const [lineage, setLineage] = useState(initialLineage);
    const [lineageSolved, setLineageSolved] = useState(false);

    // Puzzle 3 State: Input
    const [inputValue, setInputValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Validate Abraham
    useEffect(() => {
        if (abrahamSolved) return;
        const currentIds = abrahamEvents.map(e => e.id);
        if (JSON.stringify(currentIds) === JSON.stringify(correctAbrahamOrder)) {
            setAbrahamSolved(true);
            playSound('success_chime');
            addScore(50); // Score for puzzle 1
        }
    }, [abrahamEvents]);

    // Validate Lineage
    const checkLineage = () => {
        const currentIds = lineage.map(e => e.id);
        if (JSON.stringify(currentIds) === JSON.stringify(correctLineageOrder)) {
            setLineageSolved(true);
            playSound('success_chime');
            addScore(100);
        } else {
            setErrorMsg('ترتيب غير صحيح، حاول تتبع النسل بتركيز.');
            playSound('fail_whisper');
            setTimeout(() => setErrorMsg(''), 3000);
        }
    };

    // Validate Input
    const handleInputSubmit = (e) => {
        e.preventDefault();
        const cleanInput = inputValue.trim().replace(/[ًٌٍَُِّْ]/g, ""); // Remove Tashkeel for loose matching
        if (['يسى', 'يسه', 'يسا'].includes(cleanInput) || cleanInput.includes('يسى')) {
            // User prompt says Password: "يَسَّى" (Yessy). loose match needed.
            playSound('unlock');
            addScore(150);
            advanceStage(); // Done!
        } else {
            setErrorMsg('إجابة خاطئة. تذكر، هو والد الملك داود.');
            playSound('fail_whisper');
            setTimeout(() => setErrorMsg(''), 3000);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 h-full overflow-y-auto p-4 custom-scrollbar">

            <div className="text-center mb-6">
                <div style={{
                    background: 'rgba(44, 24, 16, 0.95)',
                    border: '3px solid #D4AF37',
                    borderRadius: '12px',
                    padding: '20px 40px',
                    display: 'inline-block',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.5)'
                }}>
                    <h2 style={{
                        fontFamily: "'Rakkas', serif",
                        fontSize: '3rem',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        marginBottom: '8px'
                    }}>جذور الوعد</h2>
                    <p style={{
                        fontFamily: "'Amiri', serif",
                        fontSize: '1.5rem',
                        color: '#F4E4BC',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        margin: 0
                    }}>من إبراهيم إلى داود</p>
                </div>
            </div>

            {/* ERROR / SUCCESS MESSAGE */}
            {errorMsg && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-xl z-50 animate-bounce" style={{ background: '#8B0000', color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.125rem' }}>
                    {errorMsg}
                </div>
            )}

            {/* PUZZLE 1: ABRAHAM */}
            {!abrahamSolved ? (
                <div className="bg-[#E6D2A0]/50 p-4 rounded-lg border border-[#3B5323]/30">
                    <div className="inline-block px-4 py-2 rounded mb-4" style={{ background: 'rgba(44, 24, 16, 0.95)', border: '2px solid #D4AF37' }}>
                        <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                            <ArrowRightLeft size={20} /> 1. رتب أحداث حياة إبراهيم
                        </h3>
                    </div>
                    <Reorder.Group axis="y" values={abrahamEvents} onReorder={setAbrahamEvents} className="flex flex-col gap-2">
                        {abrahamEvents.map((item) => (
                            <Reorder.Item key={item.id} value={item} className="heritage-card text-dark">
                                {item.text}
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                    <div className="mt-4 text-center">
                        <div className="inline-block px-4 py-2 rounded border-2 shadow-lg" style={{ background: '#2c1810', borderColor: '#D4AF37' }}>
                            <span style={{ color: '#F4E4BC', fontWeight: 'bold', fontSize: '1.125rem' }}>
                                اسحب البطاقات للترتيب من الأقدم للأحدث
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 rounded text-center border-2 border-[#D4AF37] animate-fade-in" style={{ background: 'rgba(46, 125, 50, 0.9)', color: '#FFFFFF', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                    <CheckCircle2 className="inline-block mb-1" /> أحسنت! "بإيمان إبراهيم بدأت السلسلة"
                </div>
            )}

            {/* PUZZLE 2: LINEAGE */}
            {abrahamSolved && !lineageSolved && (
                <div className="bg-[#E6D2A0]/50 p-4 rounded-lg border border-[#3B5323]/30 animate-slide-up">
                    <div className="inline-block px-4 py-2 rounded mb-4" style={{ background: 'rgba(44, 24, 16, 0.95)', border: '2px solid #D4AF37' }}>
                        <h3 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>2. رتب شفرة الأجيال</h3>
                    </div>
                    <div className="mb-4 text-center">
                        <div className="inline-block px-4 py-2 rounded border-2 shadow-lg" style={{ background: '#2c1810', borderColor: '#D4AF37' }}>
                            <span style={{ color: '#F4E4BC', fontWeight: 'bold', fontSize: '1.125rem' }}>
                                رتب الأسماء بالسحب والإفلات لتكتشف التسلسل:
                            </span>
                        </div>
                    </div>

                    <Reorder.Group axis="y" values={lineage} onReorder={setLineage} className="grid grid-cols-2 gap-2">
                        {lineage.map((item) => (
                            <Reorder.Item key={item.id} value={item} className="heritage-card text-center font-bold text-dark">
                                {item.text}
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                    <button
                        onClick={checkLineage}
                        className="heritage-btn mt-6 w-full"
                    >
                        تأكيد الترتيب
                    </button>
                </div>
            )}

            {/* PUZZLE 3: INPUT */}
            {lineageSolved && (
                <div className="bg-[#E6D2A0]/50 p-6 rounded-lg border border-[#3B5323]/30 flex flex-col items-center gap-4 animate-slide-up">
                    <div className="inline-block px-4 py-2 rounded mb-2" style={{ background: 'rgba(44, 24, 16, 0.95)', border: '2px solid #D4AF37' }}>
                        <h3 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>3. الحلقة المفقودة</h3>
                    </div>
                    <div className="px-4 py-2 rounded mb-4 text-center" style={{ background: 'rgba(255, 255, 255, 0.4)', border: '1px solid #654321' }}>
                        <p className="text-lg leading-relaxed font-bold" style={{ color: '#2c1810' }}>
                            عوبيد أنجب <span className="inline-block w-8 h-8 border-b-2 border-[#8B0000] text-center">؟</span> أنجب داود
                        </p>

                        <form onSubmit={handleInputSubmit} className="flex flex-col gap-2 w-full max-w-xs">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="اكتب الاسم هنا..."
                                className="heritage-input"
                            />
                            <button
                                type="submit"
                                className="heritage-btn heritage-btn-gold w-full flex items-center justify-center gap-2 mt-4"
                            >
                                <Lock size={24} /> فتح القفل
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Stage1_Roots;

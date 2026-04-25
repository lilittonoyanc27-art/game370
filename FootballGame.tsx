import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  ChevronRight, 
  Goal, 
  User,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  sentence: string;
  translation: string;
  correct: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  { id: 1, sentence: "Yo ______ español muy bien.", translation: "Ես շատ լավ իսպաներեն եմ խոսում", correct: "hablo", options: ["hablo", "digo", "habla"] },
  { id: 2, sentence: "Él siempre ______ la verdad.", translation: "Նա միշտ ճշմարտությունն է ասում", correct: "dice", options: ["dice", "habla", "dices"] },
  { id: 3, sentence: "Nosotros ______ con el profesor.", translation: "Մենք խոսում ենք ուսուցչի հետ", correct: "hablamos", options: ["hablamos", "decimos", "hablan"] },
  { id: 4, sentence: "Tú ______ que no es posible.", translation: "Դու ասում ես, որ դա հնարավոր չէ", correct: "dices", options: ["dices", "hablas", "digo"] },
  { id: 5, sentence: "¿Ustedes ______ inglés?", translation: "Դուք անգլերեն խոսո՞ւմ եք", correct: "hablan", options: ["hablan", "dicen", "hablamos"] },
  { id: 6, sentence: "Ella me ______ un secreto.", translation: "Նա ինձ մի գաղտնիք է ասում", correct: "dice", options: ["dice", "habla", "digo"] },
  { id: 7, sentence: "Yo ______ la respuesta.", translation: "Ես ասում եմ պատասխանը", correct: "digo", options: ["digo", "hablo", "dice"] },
  { id: 8, sentence: "Ellos ______ mucho en clase.", translation: "Նրանք դասին շատ են խոսում", correct: "hablan", options: ["hablan", "dicen", "hablas"] },
  { id: 9, sentence: "Nosotros ______ que sí.", translation: "Մենք ասում ենք այո", correct: "decimos", options: ["decimos", "hablamos", "dice"] },
  { id: 10, sentence: "Tú ______ por teléfono ahora.", translation: "Դու հիմա հեռախոսով ես խոսում", correct: "hablas", options: ["hablas", "dices", "habló"] },
  { id: 11, sentence: "Pedro ______ hola a todos.", translation: "Պեդրոն բոլորին բարև է ասում", correct: "dice", options: ["dice", "habla", "dices"] },
  { id: 12, sentence: "Vosotros ______ muy rápido.", translation: "Դուք շատ արագ եք խոսում", correct: "habláis", options: ["habláis", "decís", "hablan"] },
  { id: 13, sentence: "Ellas ______ muchas cosas.", translation: "Նրանք շատ բաներ են ասում", correct: "dicen", options: ["dicen", "hablan", "dice"] },
  { id: 14, sentence: "Yo ______ con mi madre.", translation: "Ես մորս հետ եմ խոսում", correct: "hablo", options: ["hablo", "digo", "habla"] },
  { id: 15, sentence: "Usted ______ que es tarde.", translation: "Դուք ասում եք, որ ուշ է", correct: "dice", options: ["dice", "habla", "digo"] },
];

export default function FootballGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'shooting' | 'scored' | 'missed' | 'finished'>('idle');
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQ = QUESTIONS[currentIdx];

  const handleShoot = (option: string) => {
    if (gameState !== 'idle') return;
    
    setSelectedOption(option);
    setGameState('shooting');

    const isCorrect = option === currentQ.correct;

    setTimeout(() => {
      if (isCorrect) {
        setGameState('scored');
        setScore(s => s + 1);
        if (currentIdx === QUESTIONS.length - 1) {
          confetti({ particleCount: 200, spread: 90 });
        }
      } else {
        setGameState('missed');
      }
    }, 1000);
  };

  const next = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setGameState('idle');
      setSelectedOption(null);
    } else {
      setGameState('finished');
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setScore(0);
    setGameState('idle');
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-emerald-900 text-white font-sans overflow-hidden flex flex-col items-center select-none">
      
      {/* Stadium Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#065f46_0%,#064e3b_100%)]" />
        <div className="absolute top-0 w-full h-[50vh] bg-sky-500/20" />
        {/* Pitch Lines */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] bg-emerald-800 rotate-x-60 border-[20px] border-white/10 rounded-t-[50%]" />
      </div>

      <header className="w-full max-w-5xl p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-900 shadow-xl border-4 border-emerald-900">
            <Goal size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">Penalty Cup</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/60">Ernesto Edition</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-xl">
           <Star className="text-yellow-400" size={18} fill="currentColor" />
           <span className="text-2xl font-black italic tracking-tighter">{score}</span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl flex flex-col items-center justify-between p-6 relative z-10">
        
        {/* Question Area */}
        <AnimatePresence mode="wait">
          {gameState !== 'finished' && (
            <motion.div 
               key="question"
               initial={{ y: -50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="w-full max-w-2xl bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/20 text-center space-y-4 shadow-2xl"
            >
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-300">{currentQ.translation}</div>
               <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
                 {currentQ.sentence.split('______')[0]}
                 <span className="text-yellow-400">?</span>
                 {currentQ.sentence.split('______')[1]}
               </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D-ish Stadium Area */}
        <div className="relative w-full h-[50vh] perspective-[1000px] flex justify-center">
           {/* Goal Post */}
           <div className="absolute top-10 w-[70%] max-w-[600px] h-64 border-[12px] border-white border-b-0 rounded-t-lg shadow-inner flex items-end justify-center">
              {/* Nets Visual */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_22px)]" />
              
              {/* Goalkeeper (Ernesto as GK) */}
              <motion.div 
                animate={
                  gameState === 'shooting' ? { x: [0, 100, -100, 0] } : 
                  gameState === 'scored' ? { y: 100, opacity: 0 } :
                  gameState === 'missed' ? { rotate: [0, 10, -10, 0], scale: 1.2 } : {}
                }
                className="relative z-20 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-orange-200 rounded-full border-4 border-slate-900 flex items-center justify-center relative">
                   <div className="absolute -top-10 text-4xl">🌵</div>
                   <div className="w-1 h-3 bg-slate-900 absolute top-6 left-5" />
                   <div className="w-1 h-3 bg-slate-900 absolute top-6 right-5" />
                </div>
                <div className="w-12 h-24 bg-yellow-500 rounded-lg border-4 border-slate-900 mt-[-4px]" />
                <div className="absolute -top-12 bg-black/50 text-white text-[8px] font-black tracking-widest px-2 py-0.5 rounded uppercase">Ernesto</div>
              </motion.div>
           </div>

           {/* The Ball */}
           <motion.div 
             initial={{ bottom: 20, scale: 2 }}
             animate={
               gameState === 'shooting' ? { bottom: 180, scale: 0.5, rotate: 720 } :
               gameState === 'scored' ? { bottom: 200, scale: 0.4, opacity: 0.5 } :
               gameState === 'missed' ? { bottom: 220, x: 200, scale: 0.3, opacity: 0 } :
               { bottom: 20, scale: 2 }
             }
             transition={{ duration: 1, ease: "easeOut" }}
             className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full border-2 border-slate-300 shadow-2xl flex items-center justify-center overflow-hidden z-30"
           >
              <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#fff_0%,#ccc_100%)] flex items-center justify-center">
                 <div className="w-4 h-4 bg-black rotate-45" />
              </div>
           </motion.div>

           {/* Feedback Text */}
           <AnimatePresence>
             {(gameState === 'scored' || gameState === 'missed') && (
               <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  className={`absolute top-0 z-50 px-10 py-5 rounded-[2rem] font-black italic text-5xl uppercase tracking-tighter shadow-2xl
                    ${gameState === 'scored' ? 'bg-yellow-400 text-black rotate-3' : 'bg-rose-600 text-white -rotate-3'}
                  `}
               >
                 {gameState === 'scored' ? '¡GOOOOL!' : '¡FUERA!'}
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Options Area */}
        <div className="w-full max-w-4xl space-y-8">
           {gameState === 'idle' ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentQ.options.map(option => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShoot(option)}
                    className="py-10 px-4 bg-white text-emerald-900 rounded-[2.5rem] border-b-[8px] border-emerald-200 font-black italic text-3xl uppercase tracking-widest shadow-2xl hover:bg-emerald-50 transition-all"
                  >
                    {option}
                  </motion.button>
                ))}
             </div>
           ) : gameState === 'finished' ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center bg-white/10 backdrop-blur-3xl rounded-[3rem] p-16 space-y-8"
             >
                <div className="w-32 h-32 bg-yellow-400 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl border-4 border-white/20">
                   <Trophy size={64} className="text-white animate-bounce" />
                </div>
                <h2 className="text-7xl font-black italic tracking-tighter uppercase">FIESTA TOTAL</h2>
                <p className="text-2xl font-bold uppercase tracking-widest text-emerald-300">SCORE: {score} / {QUESTIONS.length}</p>
                <button onClick={restart} className="px-12 py-6 bg-white text-emerald-900 rounded-full font-black uppercase tracking-widest text-xl shadow-2xl flex items-center gap-3 mx-auto">
                   <RotateCcw /> REINTENTAR
                </button>
             </motion.div>
           ) : (
             <div className="flex justify-center pt-20">
                <AnimatePresence>
                  {gameState !== 'shooting' && (
                    <motion.button 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={next}
                      className="px-12 py-6 bg-black text-white rounded-full font-black uppercase text-xl shadow-2xl flex items-center gap-4 hover:bg-emerald-700 transition-colors"
                    >
                      SIGUIENTE <ChevronRight />
                    </motion.button>
                  )}
                </AnimatePresence>
             </div>
           )}
        </div>

        <div className="flex gap-2 pb-8">
           {QUESTIONS.map((_, i) => (
             <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'w-8 bg-white' : i < currentIdx ? 'bg-yellow-400' : 'bg-white/20'}`} />
           ))}
        </div>

      </main>

      <footer className="p-8 text-center opacity-20 select-none">
         <p className="text-[10px] font-black uppercase tracking-[1.5em]">Ernesto Penalty Cup v1.0</p>
      </footer>
    </div>
  );
}

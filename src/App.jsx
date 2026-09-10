import React, { useState } from 'react';

export default function CalculatorWithSubs() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [clearOnNextInput, setClearOnNextInput] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle digit / decimal clicks
  const handleNumber = (num) => {
    if (display === '0' || clearOnNextInput) {
      setDisplay(num);
      setClearOnNextInput(false);
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay(display + num);
    }
  };

  // Handle arithmetic operations
  const handleOperator = (op) => {
    if (prevValue !== null && !clearOnNextInput) {
      calculate(false); // Don't trigger modal mid-calculation
    } else {
      setPrevValue(parseFloat(display));
    }
    setOperation(op);
    setClearOnNextInput(true);
  };

  // Execute calculation
  const calculate = (triggerModal = true) => {
    if (prevValue === null || operation === null) {
      if (triggerModal) setShowModal(true); // Still pop up modal if equals is pressed
      return;
    }
    
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+': result = prevValue + current; break;
      case '-': result = prevValue - current; break;
      case '×': result = prevValue * current; break;
      case '÷': result = current === 0 ? 'Error' : prevValue / current; break;
      default: return;
    }

    const finalResult = typeof result === 'number' ? Math.round(result * 1e8) / 1e8 : result;
    
    setDisplay(String(finalResult));
    setPrevValue(null);
    setOperation(null);
    setClearOnNextInput(true);

    if (triggerModal) {
      setShowModal(true); // Show pricing modal when user hits '='
    }
  };

  // Reset calculator
  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setClearOnNextInput(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-800">
      
      {/* --- CALCULATOR --- */}
      <div className="w-full max-w-xs bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800">
        
        {/* Screen */}
        <div className="bg-slate-950 p-4 rounded-2xl mb-6 text-right border border-slate-800/80">
          <div className="text-slate-500 text-xs h-4 mb-1 font-mono">
            {prevValue !== null ? `${prevValue} ${operation}` : ''}
          </div>
          <div className="text-white text-4xl font-bold font-mono tracking-tight truncate">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          <button onClick={handleClear} className="p-3 bg-slate-800 text-amber-400 font-bold rounded-xl active:scale-95">AC</button>
          <button onClick={() => setDisplay(String(parseFloat(display) * -1))} className="p-3 bg-slate-800 text-slate-300 font-bold rounded-xl active:scale-95">±</button>
          <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className="p-3 bg-slate-800 text-slate-300 font-bold rounded-xl active:scale-95">%</button>
          <button onClick={() => handleOperator('÷')} className="p-3 bg-amber-500 text-slate-950 font-bold rounded-xl active:scale-95">÷</button>

          <button onClick={() => handleNumber('7')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">7</button>
          <button onClick={() => handleNumber('8')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">8</button>
          <button onClick={() => handleNumber('9')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">9</button>
          <button onClick={() => handleOperator('×')} className="p-3 bg-amber-500 text-slate-950 font-bold rounded-xl active:scale-95">×</button>

          <button onClick={() => handleNumber('4')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">4</button>
          <button onClick={() => handleNumber('5')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">5</button>
          <button onClick={() => handleNumber('6')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">6</button>
          <button onClick={() => handleOperator('-')} className="p-3 bg-amber-500 text-slate-950 font-bold rounded-xl active:scale-95">-</button>

          <button onClick={() => handleNumber('1')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">1</button>
          <button onClick={() => handleNumber('2')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">2</button>
          <button onClick={() => handleNumber('3')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">3</button>
          <button onClick={() => handleOperator('+')} className="p-3 bg-amber-500 text-slate-950 font-bold rounded-xl active:scale-95">+</button>

          <button onClick={() => handleNumber('0')} className="col-span-2 p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95 text-left pl-6">0</button>
          <button onClick={() => handleNumber('.')} className="p-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95">.</button>
          
          {/* EQUALS BUTTON (Triggers Modal) */}
          <button onClick={() => calculate(true)} className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl active:scale-95 shadow-lg shadow-indigo-500/30">=</button>
        </div>
      </div>

      {/* --- SUBSCRIPTION MODAL (Appears on '=') --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-slate-100 rounded-3xl p-6 md:p-8 shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-slate-200 hover:bg-slate-300 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-4">
              
              {/* Basic Plan */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-left flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-indigo-600 font-bold text-lg mb-2">Basic Calculator</h3>
                  <div className="text-3xl font-extrabold text-slate-900 mb-2">₱399<span className="text-sm font-normal text-slate-500">/month</span></div>
                  <p className="text-xs text-slate-500 mb-6">Start exploring millions of calculations with basic features and ads.</p>
                  <ul className="text-xs text-slate-600 space-y-2 mb-6">
                    <li>✓ Ad-supported calculations</li>
                    <li>✓ Not Accurate</li>
                  </ul>
                </div>
                <button className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-2.5 rounded-xl text-sm transition-colors">
                  Start Basic Plan
                </button>
              </div>

              {/* Premium Plan (Featured) */}
              <div className="relative bg-slate-950 border-2 border-indigo-500 p-6 rounded-2xl text-left text-white shadow-2xl transform md:-translate-y-2">
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
                <h3 className="text-white font-bold text-lg mb-2">Premium Sci-Cal</h3>
                <div className="text-3xl font-extrabold mb-2">₱799<span className="text-sm font-normal text-purple-400">/month</span></div>
                <p className="text-xs text-slate-400 mb-6">Enjoy the full Sci-cal experience with unlimited access and downloads.</p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li className="text-emerald-400">✓ Ad-free</li>
                  <li className="text-emerald-400">✓ Meet & Greet W/ Einstein</li>
                  <li className="text-emerald-400">✓ Unlimited Error Haha</li>
                </ul>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-lg shadow-indigo-500/25 transition-all">
                  Go Premium
                </button>
              </div>

              {/* Family Plan */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-left flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-indigo-600 font-bold text-lg mb-2">Family</h3>
                  <div className="text-3xl font-extrabold text-slate-900 mb-2">₱1399<span className="text-sm font-normal text-slate-500">/month</span></div>
                  <p className="text-xs text-slate-500 mb-6">Enjoy all of the features with a plan for up to 6 family members.</p>
                  <ul className="text-xs text-slate-600 space-y-2 mb-6">
                    <li>✓ All Premium features</li>
                    <li>✓ Up to 6 accounts</li>
                    <li>✓ Individual playlists & libraries</li>
                    <li>✓ Family Mix playlists</li>
                  </ul>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                  Start Family Plan
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
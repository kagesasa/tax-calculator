import { useState } from 'react';
import { useTaxCalculator } from './hooks/useTaxCalculator';
import ModeSwitcher from './components/ModeSwitcher';
import ResultCard from './components/ResultCard';
import Keypad from './components/Keypad';
import SettingsPanel from './components/SettingsPanel';
import HistoryList from './components/HistoryList';
// Icons are SVG now, removed lucide imports usage if not needed or used directly
// Wait, I used inline SVGs in previous edit, but kept import.
// Let's remove the import if I used inline SVGs or added Lucide.
// I installed Lucide, so I can use Lucide icons!
import { History, Settings, Save } from 'lucide-react';

function App() {
  const {
    inputStr,
    mode,
    setMode,
    rounding,
    setRounding,
    currentResult,
    handleInput,
    history,
    addToHistory,
    clearHistory
  } = useTaxCalculator();

  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Trigger history save on calculation completion effectively? 
  // Actually, standard calculator behavior is to add to history on "=" press. 
  // Since this is instant calculation, maybe add a specific "Save" or "Next" button?
  // Or just auto-log when input is cleared or mode changed?
  // For now, let's add a manual "Save/Next" button or assume user wants to see result first.
  // The 'AC' button clears input.

  // Refined Logic for Logic Hook: 
  // We need a way to commit the current calculation to history.
  // Let's add that to keypad or a separate action. 
  // But spec says "straight calculation".
  // "直前の計算結果がリストで残るようにし" -> implied automatic or on 'Enter'?
  // Let's add an Enter key to Keypad for "Done/Next" which adds to history and clears input?

  // Wait, keypad doesn't have Enter.
  // I'll add an "Enter" equivalent or just modify AC to "Save & Clear" and "Clear All".
  // Actually, let's rely on a manual "Add to List" button or auto-add when input is cleared after a valid calc?
  // Let's modify Keypad to have an "=" button which saves to history.

  const onKeypadInput = (key: string) => {
    handleInput(key);
  };

  const handleSave = () => {
    if (currentResult) {
      addToHistory();
      handleInput('C'); // Clear after save
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden flex justify-center">

      {/* Mobile-first Container */}
      <div className="w-full max-w-md h-[100dvh] flex flex-col bg-slate-900 border-x border-slate-800 shadow-2xl relative overflow-hidden">

        {/* Header */}
        <header className="flex justify-between items-center p-4 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              ¥
            </div>
            <h1 className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              The 消費税
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-full transition-colors ${showHistory ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-400'}`}
              aria-label="History"
            >
              <History size={20} />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-400'}`}
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 w-full h-[calc(100%-60px)] sm:h-[calc(100%-80px)]">
          <ModeSwitcher mode={mode} onChange={setMode} />

          {showSettings && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <SettingsPanel rounding={rounding} setRounding={setRounding} />
            </div>
          )}

          <div className="mb-2 sm:mb-6 px-2">
            <div className="text-right space-y-0.5 sm:space-y-1">
              <span className="text-[12px] sm:text-xs font-bold text-slate-500 tracking-widest">入力金額</span>
              <div className="h-12 sm:h-16 flex items-end justify-end">
                <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight font-mono">
                  {inputStr ? Number(inputStr).toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 mb-3 sm:mb-6 px-1">
            <ResultCard result={currentResult} />
          </div>

          <div className="mt-auto">
            <div className="flex gap-2 sm:gap-4 mb-2 sm:mb-4 px-2 sm:px-4">
              <button
                onClick={handleSave}
                className="relative flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 sm:py-4 rounded-xl font-bold text-sm sm:text-lg shadow-[0_2px_0_0_rgba(55,48,163,1)] active:top-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Save size={16} />
                <span>履歴に保存</span>
              </button>
            </div>
            <Keypad onInput={onKeypadInput} />
          </div>
        </div>

        {/* History Drawer Overlay & Sidebar */}
        {showHistory && (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
            <HistoryList history={history} onClear={clearHistory} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

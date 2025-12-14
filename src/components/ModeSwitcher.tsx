import React from 'react';
import type { CalculationMode } from '../utils/tax';

interface ModeSwitcherProps {
    mode: CalculationMode;
    onChange: (mode: CalculationMode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, onChange }) => {
    return (
        <div className="flex w-full bg-slate-900 p-1.5 rounded-full relative mb-3 sm:mb-6 shadow-inner border border-slate-800">
            <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-indigo-600 rounded-full transition-all duration-300 ease-spring shadow-[0_3px_0_0_rgba(49,46,129,1)] ${mode === 'ADD_TAX' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                    }`}
            />

            <button
                className={`flex-1 relative z-10 py-2 sm:py-4 text-base sm:text-lg font-bold transition-colors text-center rounded-full ${mode === 'ADD_TAX' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                onClick={() => onChange('ADD_TAX')}
            >
                税抜 → 税込
            </button>

            <button
                className={`flex-1 relative z-10 py-2 sm:py-4 text-base sm:text-lg font-bold transition-colors text-center rounded-full ${mode === 'REMOVE_TAX' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                onClick={() => onChange('REMOVE_TAX')}
            >
                税込 → 税抜
            </button>
        </div>
    );
};

export default ModeSwitcher;

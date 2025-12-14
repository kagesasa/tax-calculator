import React from 'react';
import type { RoundingMode } from '../utils/tax';

interface SettingsPanelProps {
    rounding: RoundingMode;
    setRounding: (mode: RoundingMode) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ rounding, setRounding }) => {
    const modes: { id: RoundingMode; label: string }[] = [
        { id: 'FLOOR', label: '切り捨て' },
        { id: 'ROUND', label: '四捨五入' },
        { id: 'CEIL', label: '切り上げ' },
    ];

    return (
        <div className="flex flex-col gap-2 p-4 bg-slate-800/30 rounded-xl mb-4">
            <label className="text-xs text-slate-400 font-medium ml-1">端数処理設定</label>
            <div className="grid grid-cols-3 gap-2">
                {modes.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setRounding(m.id)}
                        className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all ${rounding === m.id
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                            }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SettingsPanel;

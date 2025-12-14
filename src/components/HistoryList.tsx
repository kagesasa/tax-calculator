import React from 'react';
import type { HistoryItem } from '../hooks/useTaxCalculator';

interface HistoryListProps {
    history: HistoryItem[];
    onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onClear }) => {
    if (history.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500 text-sm">
                計算履歴はありません
            </div>
        );
    }

    const grandTotal = history.reduce((sum, item) => {
        // For ADD_TAX, item.results.rate10.total is the "Total".
        // For REMOVE_TAX, item.input is the "Total".
        // It's a bit ambiguous what "Total" means in history for mixed modes, 
        // but usually "how much money moved".
        return sum + (item.mode === 'ADD_TAX' ? item.results.rate10.total : item.input);
        // Note: This logic assumes 10% total is the relevant one for sum if mode is ADD.
    }, 0);

    return (
        <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 w-full md:w-80 absolute md:relative right-0 top-0 bottom-0 z-20 shadow-2xl transform transition-transform duration-300">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/95 backdrop-blur">
                <h2 className="text-lg font-bold text-slate-200">計算履歴</h2>
                <button
                    onClick={onClear}
                    className="text-xs text-red-400 hover:text-red-300 px-3 py-1 rounded bg-red-900/20 hover:bg-red-900/30 transition-colors"
                >
                    全消去
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {history.map((item) => (
                    <div key={item.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col gap-1 active:bg-slate-800 transition-colors">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>{item.mode === 'ADD_TAX' ? '税抜 → 税込' : '税込 → 税抜'}</span>
                            <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-medium text-slate-300">入力: ¥{item.input.toLocaleString()}</span>
                        </div>
                        <div className="text-right text-lg font-bold text-white">
                            ¥{(item.mode === 'ADD_TAX' ? item.results.rate10.total : item.results.rate10.base).toLocaleString()}
                            <span className="text-xs font-normal text-slate-500 ml-1">
                                (10%{item.mode === 'ADD_TAX' ? '' : '抜'})
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-slate-800 border-t border-slate-700 mt-auto">
                <div className="text-xs text-slate-400 mb-1">合計 (概算)</div>
                <div className="text-2xl font-bold text-amber-400">¥{grandTotal.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default HistoryList;

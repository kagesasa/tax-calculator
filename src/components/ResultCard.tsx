import React from 'react';
import type { CalculationResult, TaxResult } from '../utils/tax';

interface ResultCardProps {
    result: CalculationResult | null;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ja-JP').format(val);
};

const ResultRow = ({ label, result, isIncluded }: { label: string, result: TaxResult, isIncluded: boolean }) => {
    return (
        <div className="bg-slate-800 rounded-2xl p-4 border-b-4 border-slate-900/50 shadow-inner flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 text-xs font-bold tracking-wide truncate mr-1">{label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap ${result.rate === 0.1 ? 'bg-indigo-900/50 text-indigo-300' : 'bg-emerald-900/50 text-emerald-300'}`}>
                    {result.rate * 100}%
                </span>
            </div>

            <div className="flex flex-col items-end">
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1 text-right">
                    <span className="text-sm font-medium text-slate-500 mr-0.5">¥</span>
                    {isIncluded ? formatCurrency(result.total) : formatCurrency(result.base)}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                    <div className="text-[10px] font-medium text-slate-500">
                        {isIncluded ? '内税' : '税'}
                    </div>
                    <div className="text-sm font-bold text-indigo-400">
                        ¥{formatCurrency(result.tax)}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center h-48 text-slate-600">
                <p className="text-base font-medium">金額を入力してください</p>
            </div>
        );
    }

    const isAddMode = result.mode === 'ADD_TAX';

    return (
        <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 10% Result */}
            <ResultRow
                label={isAddMode ? "税込(10%)" : "本体(元10%)"}
                result={result.results.rate10}
                isIncluded={isAddMode}
            />

            {/* 8% Result */}
            <ResultRow
                label={isAddMode ? "税込(8%)" : "本体(元8%)"}
                result={result.results.rate8}
                isIncluded={isAddMode}
            />
        </div>
    );
};

export default ResultCard;

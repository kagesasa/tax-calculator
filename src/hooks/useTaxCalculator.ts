import { useState, useCallback, useEffect } from 'react';
import { calculateTax } from '../utils/tax';
import type { CalculationMode, RoundingMode, CalculationResult } from '../utils/tax';

export interface HistoryItem extends CalculationResult {
    id: string;
    timestamp: number;
}

export const useTaxCalculator = () => {
    const [inputStr, setInputStr] = useState<string>('');
    const [mode, setMode] = useState<CalculationMode>('ADD_TAX');
    const [rounding, setRounding] = useState<RoundingMode>('FLOOR');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [currentResult, setCurrentResult] = useState<CalculationResult | null>(null);

    // Load history from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('tax_calculator_history');
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse history', e);
            }
        }
    }, []);

    // Save history when it changes
    useEffect(() => {
        localStorage.setItem('tax_calculator_history', JSON.stringify(history));
    }, [history]);

    const handleInput = useCallback((key: string) => {
        if (key === 'C') {
            setInputStr('');
            setCurrentResult(null);
            return;
        }
        if (key === 'BS') {
            setInputStr(prev => {
                const next = prev.slice(0, -1);
                calculate(next);
                return next;
            });
            return;
        }

        setInputStr(prev => {
            // Prevent multiple leading zeros
            if (prev === '0' && key === '0') return prev;
            if (prev === '0' && key !== '.') return key;
            // Max length
            if (prev.length > 12) return prev;

            const next = prev + key;
            calculate(next);
            return next;
        });
    }, [mode, rounding]);

    const calculate = (val: string) => {
        if (!val) {
            setCurrentResult(null);
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num)) {
            const res = calculateTax(num, mode, rounding);
            setCurrentResult(res);
        }
    };

    // Recalculate when settings change
    useEffect(() => {
        calculate(inputStr);
    }, [mode, rounding]);

    const addToHistory = useCallback(() => {
        if (currentResult) {
            const newItem: HistoryItem = {
                ...currentResult,
                id: crypto.randomUUID(),
                timestamp: Date.now(),
            };
            setHistory(prev => [newItem, ...prev].slice(0, 50)); // Keep last 50
        }
    }, [currentResult]);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    return {
        inputStr,
        mode,
        setMode,
        rounding,
        setRounding,
        currentResult,
        history,
        addToHistory,
        clearHistory,
        handleInput
    };
};

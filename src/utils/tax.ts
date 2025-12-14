export type CalculationMode = 'ADD_TAX' | 'REMOVE_TAX';
export type RoundingMode = 'FLOOR' | 'ROUND' | 'CEIL';

export interface TaxResult {
    rate: number;
    total: number;
    base: number;
    tax: number;
}

export interface CalculationResult {
    mode: CalculationMode;
    input: number;
    results: {
        rate10: TaxResult;
        rate8: TaxResult;
    };
}

export const roundValue = (value: number, mode: RoundingMode): number => {
    switch (mode) {
        case 'FLOOR':
            return Math.floor(value);
        case 'ROUND':
            return Math.round(value);
        case 'CEIL':
            return Math.ceil(value);
    }
};

export const calculateTax = (
    amount: number,
    mode: CalculationMode,
    rounding: RoundingMode = 'FLOOR'
): CalculationResult => {
    if (mode === 'ADD_TAX') {
        // Input is Tax Exclusive (Base)
        // 10%
        const tax10 = roundValue(amount * 0.10, rounding);
        const total10 = amount + tax10;

        // 8%
        const tax08 = roundValue(amount * 0.08, rounding);
        const total08 = amount + tax08;

        return {
            mode,
            input: amount,
            results: {
                rate10: { rate: 0.10, total: total10, base: amount, tax: tax10 },
                rate8: { rate: 0.08, total: total08, base: amount, tax: tax08 },
            }
        };
    } else {
        // Input is Tax Inclusive (Total)
        // 10%
        const base10 = roundValue(amount / 1.10, rounding);
        const tax10 = amount - base10;

        // 8%
        const base08 = roundValue(amount / 1.08, rounding);
        const tax08 = amount - base08;

        return {
            mode,
            input: amount,
            results: {
                rate10: { rate: 0.10, total: amount, base: base10, tax: tax10 },
                rate8: { rate: 0.08, total: amount, base: base08, tax: tax08 },
            }
        };
    }
};

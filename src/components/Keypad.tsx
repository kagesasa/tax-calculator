import React from 'react';

interface KeypadProps {
    onInput: (key: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onInput }) => {
    const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.'];

    const buttonBaseClass = "relative h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold text-2xl sm:text-3xl transition-all active:top-[2px] active:shadow-none bg-slate-800 text-slate-200 shadow-[0_3px_0_0_rgba(30,41,59,1)] hover:bg-slate-700";
    const actionButtonClass = "relative flex-1 rounded-xl sm:rounded-2xl font-bold text-xl sm:text-2xl transition-all active:top-[2px] active:shadow-none shadow-[0_3px_0_0_rgba(15,23,42,0.5)] flex items-center justify-center";

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 pb-4 sm:pb-8">
            <div className="col-span-3 grid grid-cols-3 gap-2 sm:gap-4">
                {keys.map((key) => (
                    <button
                        key={key}
                        onClick={() => onInput(key)}
                        className={buttonBaseClass}
                    >
                        {key}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
                <button
                    onClick={() => onInput('C')}
                    className={`${actionButtonClass} h-auto bg-rose-600 text-white shadow-[0_3px_0_0_rgba(159,18,57,1)] hover:bg-rose-500`}
                >
                    AC
                </button>
                <button
                    onClick={() => onInput('BS')}
                    className={`${actionButtonClass} bg-slate-600 text-slate-200 shadow-[0_3px_0_0_rgba(71,85,105,1)] hover:bg-slate-500`}
                >
                    ⌫
                </button>
            </div>
        </div>
    );
};

export default Keypad;

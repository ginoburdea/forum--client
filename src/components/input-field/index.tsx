'use client';
import { InputProps } from '@/utils/types';

import './index.scss';

export default function InputField({
    onErrorChange,
    onChange,
    value,
    error,
    label,
}: InputProps) {
    return (
        <div className="g:mb-md">
            <p className="g:text-sm">{label}</p>
            <input
                onChange={(event) => {
                    onChange(event.target.value);
                    onErrorChange('');
                }}
                className="input-field"
                value={value}
                type="text"
            />
            <p className="g:text-sm g:text-red">{error}</p>
        </div>
    );
}

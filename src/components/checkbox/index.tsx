'use client';
import { InputProps } from '@/utils/types';

import './index.scss';

export default function Checkbox({
    onErrorChange,
    onChange,
    value,
    error,
    label,
}: InputProps<boolean>) {
    return (
        <div className="g:mb-md">
            <label className="checkbox-container ">
                <input
                    onChange={(event) => {
                        onChange(event.target.checked);
                        onErrorChange('');
                    }}
                    className="checkbox"
                    type="checkbox"
                    checked={value}
                />{' '}
                {label}
            </label>
            <p className="g:text-sm g:text-red">{error}</p>
        </div>
    );
}

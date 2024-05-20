'use client';
import { InputProps } from '@/utils/types';
import classNames from 'classnames';

import './index.scss';

export default function InputField({
    onErrorChange,
    onChange,
    disabled,
    value,
    error,
    label,
}: Omit<InputProps, 'loading'>) {
    return (
        <div className="g:mb-sm">
            <p className="g:text-sm">{label}</p>
            <input
                onChange={(event) => {
                    onChange(event.target.value);
                    onErrorChange('');
                }}
                className={classNames(
                    'input-field',
                    disabled && 'g:disabled-input',
                )}
                disabled={disabled}
                value={value}
                type="text"
            />
            <p className="g:text-sm g:text-red">{error}</p>
        </div>
    );
}

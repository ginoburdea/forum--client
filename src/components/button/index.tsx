import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import './index.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    label: string;
}

export default function Button({
    disabled,
    loading,
    label,
    ...other
}: ButtonProps) {
    return (
        <button
            className={classNames(
                'button',
                loading ? 'g:loading-input' : disabled && 'g:disabled-input',
            )}
            disabled={disabled}
            {...other}
        >
            {loading ? 'Incarcare...' : label}
        </button>
    );
}

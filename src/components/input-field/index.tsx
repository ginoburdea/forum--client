'use client';
import './index.scss';

interface InputFieldProps {
    onErrorChange: (newValue: string) => any;
    onChange: (newValue: string) => any;
    value: string;
    error: string;
    label: string;
}

export default function InputField({
    onErrorChange,
    onChange,
    value,
    error,
    label,
}: InputFieldProps) {
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
            <p className="g:text-sm input-field-error">{error}</p>
        </div>
    );
}

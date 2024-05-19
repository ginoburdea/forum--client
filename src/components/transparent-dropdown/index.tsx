import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import './index.scss';
import Link from 'next/link';

interface TransparentDropdownProps<T> {
    options: { label: string; value: T }[];
    value: T;
    onChange: (value: T) => any;
}

export default function TransparentDropdown<T>({
    options,
    value,
    onChange,
}: TransparentDropdownProps<T>) {
    const [open, setOpen] = useState(false);

    const clickOutsideRef = useDetectClickOutside({
        onTriggered: () => setOpen(false),
    });

    return (
        <div
            className="transparent-dropdown"
            ref={clickOutsideRef}
            onClick={() => setOpen(!open)}
        >
            <span className="transparent-dropdown-text">
                {options.find((opt) => opt.value === value)?.label}
            </span>
            <Image
                className={classNames([
                    '',
                    'g:has-transitions',
                    { 'g:rotate-180': open },
                ])}
                src="/img/arrow-down-black.png"
                alt="dropdown-arrow"
                height={10}
                width={10}
            />
            {open && (
                <div className="transparent-dropdown-options">
                    {options.map((opt) => (
                        <a onClick={() => onChange(opt.value)}>{opt.label}</a>
                    ))}
                </div>
            )}
        </div>
    );
}

import { useDetectClickOutside } from 'react-detect-click-outside';
import classNames from 'classnames';
import { useState } from 'react';
import Image from 'next/image';

import './index.scss';

interface TransparentDropdownProps<T> {
    options: { label: string; value: T }[];
    onChange: (value: T) => any;
    value: T;
}

export default function TransparentDropdown<T>({
    onChange,
    options,
    value,
}: TransparentDropdownProps<T>) {
    const [open, setOpen] = useState(false);

    const clickOutsideRef = useDetectClickOutside({
        onTriggered: () => setOpen(false),
    });

    return (
        <div
            className="transparent-dropdown"
            onClick={() => setOpen(!open)}
            ref={clickOutsideRef}
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
                        <a onClick={() => onChange(opt.value)} key={opt.label}>
                            {opt.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

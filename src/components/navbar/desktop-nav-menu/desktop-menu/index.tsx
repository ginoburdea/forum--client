import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Menu } from '../../types';
import Image from 'next/image';
import './index.scss';

interface DesktopMenuProps {
    menu: Menu;
    isChild?: boolean;
}

export default function DesktopMenu({
    menu,
    isChild = false,
}: DesktopMenuProps) {
    const [open, setOpen] = useState<boolean>(false);

    const currentUrl = usePathname();
    useEffect(() => {
        setOpen(false);
    }, [currentUrl]);

    const clickOutsideRef = useDetectClickOutside({
        onTriggered: () => setOpen(false),
    });

    return (
        <div
            className={classNames('g:mobile:hidden', 'desktop-menu')}
            ref={clickOutsideRef}
        >
            <Link
                href={menu.url || ''}
                className={classNames([
                    'desktop-menu-link',
                    { 'has-padding': isChild },
                ])}
                onClick={menu.children ? () => setOpen(!open) : menu.handler}
            >
                <span>{menu.label}</span>
                {menu.children && (
                    <Image
                        key={menu.label}
                        src="/img/arrow-down-white.png"
                        height={12}
                        width={12}
                        alt="dropdown-arrow"
                        className={classNames([
                            'g:has-transitions',
                            { 'g:rotate-180': open },
                        ])}
                    />
                )}
            </Link>
            {menu.children && open && (
                <div className={'desktop-menu-children'}>
                    {menu.children.map((child) => (
                        <DesktopMenu key={child.label} menu={child} isChild />
                    ))}
                </div>
            )}
        </div>
    );
}

import { useDetectClickOutside } from 'react-detect-click-outside';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { Menu } from '../../types';
import './index.scss';

interface DesktopMenuProps {
    isChild?: boolean;
    menu: Menu;
}

export default function DesktopMenu({
    isChild = false,
    menu,
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
                className={classNames([
                    'desktop-menu-link',
                    { 'has-padding': isChild },
                ])}
                onClick={menu.children ? () => setOpen(!open) : menu.handler}
                href={menu.url || ''}
            >
                <span>{menu.label}</span>
                {menu.children && (
                    <Image
                        className={classNames([
                            'g:has-transitions',
                            { 'g:rotate-180': open },
                        ])}
                        src="/img/arrow-down-white.png"
                        alt="dropdown-arrow"
                        key={menu.label}
                        height={12}
                        width={12}
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

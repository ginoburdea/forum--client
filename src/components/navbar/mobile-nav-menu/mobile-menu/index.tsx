import classNames from 'classnames';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Menu } from '../../types';
import './index.scss';

interface MobileMenuProps {
    depth?: number;
    menu: Menu;
}

export default function MobileMenu({ depth = 0, menu }: MobileMenuProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Link
                onClick={menu.children ? () => setOpen(!open) : menu.handler}
                className={classNames('g:tablet:hidden', 'mobile-menu')}
                style={{ paddingLeft: 10 + depth * 30 }}
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
                        height={16}
                        width={16}
                    />
                )}
            </Link>
            {menu.children &&
                open &&
                menu.children.map((child) => (
                    <MobileMenu
                        depth={depth + 1}
                        key={child.label}
                        menu={child}
                    />
                ))}
        </>
    );
}

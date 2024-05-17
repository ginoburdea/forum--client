import Link from 'next/link';
import { useState } from 'react';
import { Menu } from '../../types';
import Image from 'next/image';
import classNames from 'classnames';
import './index.scss';

interface MobileMenuProps {
    menu: Menu;
    depth?: number;
}

export default function MobileMenu({ menu, depth = 0 }: MobileMenuProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Link
                style={{ paddingLeft: 10 + depth * 30 }}
                href={menu.url || ''}
                className={classNames('g:tablet:hidden', 'mobile-menu')}
                onClick={menu.children ? () => setOpen(!open) : menu.handler}
            >
                <span>{menu.label}</span>
                {menu.children && (
                    <Image
                        key={menu.label}
                        src="/img/arrow-down-white.png"
                        height={16}
                        width={16}
                        alt="dropdown-arrow"
                        className={classNames([
                            'g:has-transitions',
                            { 'g:rotate-180': open },
                        ])}
                    />
                )}
            </Link>
            {menu.children &&
                open &&
                menu.children.map((child) => (
                    <MobileMenu
                        key={child.label}
                        menu={child}
                        depth={depth + 1}
                    />
                ))}
        </>
    );
}

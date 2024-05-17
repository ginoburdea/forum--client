import { useEffect } from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { useDetectClickOutside } from 'react-detect-click-outside';
import './index.scss';
import { Menu } from '../types';
import MobileMenu from './mobile-menu';

interface MobileNavMenuProps {
    open: boolean;
    onChangeOpen: (open: boolean) => any;
    menus: Menu[];
}

export function MobileNavMenu({
    open,
    onChangeOpen,
    menus,
}: MobileNavMenuProps) {
    const currentUrl = usePathname();
    useEffect(() => {
        onChangeOpen(false);
    }, [currentUrl, onChangeOpen]);

    const clickOutsideRef = useDetectClickOutside({
        onTriggered: () => onChangeOpen(false),
    });

    return (
        <div
            className={classNames([
                'g:tablet:hidden',
                'mobile-nav-menu',
                { hidden: !open },
            ])}
            ref={clickOutsideRef}
        >
            {menus.map((menu) => (
                <MobileMenu key={menu.label} menu={menu} />
            ))}
        </div>
    );
}

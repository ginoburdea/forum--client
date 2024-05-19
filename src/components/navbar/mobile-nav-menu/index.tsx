'use client'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { loggedInSelector } from '@/utils/stores/auth';
import { useAppSelector } from '@/utils/hooks';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useEffect } from 'react';

import LoginWithGoogleButton from '@/components/login-with-google-button';
import { CommonNavMenuProps } from '../types';
import MobileMenu from './mobile-menu';
import './index.scss';

interface MobileNavMenuProps extends CommonNavMenuProps {
    onChangeOpen: (open: boolean) => any;
    open: boolean;
}

export function MobileNavMenu({
    loggedInMenus,
    onChangeOpen,
    commonMenus,
    open,
}: MobileNavMenuProps) {
    const loggedIn = useAppSelector(loggedInSelector);

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
            {commonMenus.map((menu) => (
                <MobileMenu key={menu.label} menu={menu} />
            ))}
            {loggedIn ? (
                loggedInMenus.map((menu) => (
                    <MobileMenu key={menu.label} menu={menu} />
                ))
            ) : (
                <div className="google-button-container">
                    <LoginWithGoogleButton />
                </div>
            )}
        </div>
    );
}

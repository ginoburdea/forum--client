'use client'
import { useEffect } from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { useDetectClickOutside } from 'react-detect-click-outside';
import './index.scss';
import { CommonNavMenuProps } from '../types';
import MobileMenu from './mobile-menu';
import LoginWithGoogleButton from '../login-with-google-button';
import { useAppSelector } from '@/utils/hooks';
import { loggedInSelector } from '@/utils/stores/auth';

interface MobileNavMenuProps extends CommonNavMenuProps {
    open: boolean;
    onChangeOpen: (open: boolean) => any;
}

export function MobileNavMenu({
    open,
    onChangeOpen,
    commonMenus,
    loggedInMenus,
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

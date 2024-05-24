'use client';
import {
    updateMessagesFromHttpResponse,
    updateMessages,
} from '@/utils/stores/messages';
import { updateAuth } from '@/utils/stores/auth';
import { useAppDispatch } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import MobileNavMenuHamburger from './mobile-nav-menu-hamburger';
import { DesktopNavMenu } from './desktop-nav-menu';
import { MobileNavMenu } from './mobile-nav-menu';
import { Menus } from './types';
import './index.scss';

export default function Navbar() {
    const {
        error: logoutError,
        data: logoutData,
        mutate: logOut,
    } = useSWR(
        { url: '/v1/auth/logout', method: 'POST' },
        { revalidateOnMount: false },
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!logoutError) return;

        dispatch(updateMessagesFromHttpResponse(logoutError));
    }, [logoutError]);

    useEffect(() => {
        if (!logoutData) return;

        dispatch(updateAuth({}));
        dispatch(updateMessages({ msg: 'Ai iesit din cont cu success!' }));
    }, [logoutData]);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const commonMenus: Menus = [
        {
            label: 'Ultimele intrebari',
            url: '/',
        },
    ];
    const loggedInMenus: Menus = [
        {
            children: [
                { label: 'Intrebarile mele', url: '/intrebarile-mele' },
                { label: 'Actualizeaza cont', url: '/actualizeaza-cont' },
                { label: 'Iesi din cont', handler: logOut },
            ],
            label: 'Profil',
        },
    ];

    return (
        <>
            <nav className="navbar">
                <Link className="logo" href="/">
                    <h3>Tema e grea</h3>
                </Link>
                <MobileNavMenuHamburger
                    onChangeOpen={setMobileMenuOpen}
                    open={mobileMenuOpen}
                />
                <DesktopNavMenu
                    loggedInMenus={loggedInMenus}
                    commonMenus={commonMenus}
                />
            </nav>
            <MobileNavMenu
                onChangeOpen={setMobileMenuOpen}
                loggedInMenus={loggedInMenus}
                commonMenus={commonMenus}
                open={mobileMenuOpen}
            />
        </>
    );
}

'use client';
import Link from 'next/link';
import './index.scss';
import { useMemo, useState } from 'react';
import { DesktopNavMenu } from './desktop-nav-menu';
import { Menu } from './types';
import MobileNavMenuHamburger from './mobile-nav-menu-hamburger';
import { MobileNavMenu } from './mobile-nav-menu';

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const commonMenus: Menu[] = [
        {
            label: 'Ultimele intrebari',
            url: '/',
        },
    ];
    const loggedInMenus: Menu[] = [
        {
            label: 'Profil',
            children: [
                { label: 'Intrebarile mele', url: '/intrebarile-mele' },
                { label: 'Actualizeaza cont', url: '/actualizeaza-cont' },
                {
                    label: 'Iesi din cont',
                    handler: () => alert('Iesi din cont'),
                },
            ],
        },
    ];
    const loggedOutMenus: Menu[] = [
        {
            label: 'Autenificare',
            handler: () => alert('Authentificare'),
        },
    ];

    const menus = useMemo(
        () => [commonMenus, loggedIn ? loggedInMenus : loggedOutMenus].flat(),
        [loggedIn, commonMenus, loggedInMenus, loggedOutMenus],
    );

    return (
        <>
            <nav className="navbar">
                <Link href="/" className="logo">
                    <h3>Tema e grea</h3>
                </Link>
                <MobileNavMenuHamburger
                    open={mobileMenuOpen}
                    onChangeOpen={setMobileMenuOpen}
                />
                <DesktopNavMenu menus={menus} />
            </nav>
            <MobileNavMenu
                open={mobileMenuOpen}
                onChangeOpen={setMobileMenuOpen}
                menus={menus}
            />
        </>
    );
}

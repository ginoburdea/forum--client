'use client';
import { useState } from 'react';
import Link from 'next/link';

import MobileNavMenuHamburger from './mobile-nav-menu-hamburger';
import { DesktopNavMenu } from './desktop-nav-menu';
import { MobileNavMenu } from './mobile-nav-menu';
import { Menus } from './types';
import './index.scss';

export default function Navbar() {
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
                {
                    handler: () => alert('Iesi din cont'),
                    label: 'Iesi din cont',
                },
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

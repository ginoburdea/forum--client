'use client';
import Link from 'next/link';
import './index.scss';
import { useState } from 'react';
import { DesktopNavMenu } from './desktop-nav-menu';
import { Menus } from './types';
import MobileNavMenuHamburger from './mobile-nav-menu-hamburger';
import { MobileNavMenu } from './mobile-nav-menu';
import { useAppSelector } from '@/utils/hooks';
import { loggedInSelector } from '@/utils/stores/auth';

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
                <DesktopNavMenu
                    commonMenus={commonMenus}
                    loggedInMenus={loggedInMenus}
                />
            </nav>
            <MobileNavMenu
                open={mobileMenuOpen}
                onChangeOpen={setMobileMenuOpen}
                commonMenus={commonMenus}
                loggedInMenus={loggedInMenus}
            />
        </>
    );
}

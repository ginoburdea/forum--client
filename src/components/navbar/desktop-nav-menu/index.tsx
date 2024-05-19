import { loggedInSelector } from '@/utils/stores/auth';
import { useAppSelector } from '@/utils/hooks';
import classNames from 'classnames';

import LoginWithGoogleButton from '@/components/login-with-google-button';
import { CommonNavMenuProps } from '../types';
import DesktopMenu from './desktop-menu';
import './index.scss';

interface DesktopNavMenuProps extends CommonNavMenuProps {}

export const DesktopNavMenu = ({
    loggedInMenus,
    commonMenus,
}: DesktopNavMenuProps) => {
    const loggedIn = useAppSelector(loggedInSelector);

    return (
        <div className={classNames('g:mobile:hidden', 'desktop-nav-menu')}>
            {commonMenus.map((menu) => (
                <DesktopMenu key={menu.label} menu={menu} />
            ))}
            {loggedIn ? (
                loggedInMenus.map((menu) => (
                    <DesktopMenu key={menu.label} menu={menu} />
                ))
            ) : (
                <LoginWithGoogleButton />
            )}
        </div>
    );
};

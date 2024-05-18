import { CommonNavMenuProps } from '../types';
import classNames from 'classnames';
import './index.scss';
import DesktopMenu from './desktop-menu';
import LoginWithGoogleButton from '../login-with-google-button';
import { useAppSelector } from '@/utils/hooks';
import { loggedInSelector } from '@/utils/stores/auth';

interface DesktopNavMenuProps extends CommonNavMenuProps {}

export const DesktopNavMenu = ({
    commonMenus,
    loggedInMenus,
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

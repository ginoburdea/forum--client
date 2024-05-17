import { Menu } from '../types';
import classNames from 'classnames';
import './index.scss';
import DesktopMenu from './desktop-menu';

export const DesktopNavMenu = ({ menus }: { menus: Menu[] }) => {
    return (
        <div className={classNames('g:mobile:hidden', 'desktop-nav-menu')}>
            {menus.map((menu) => (
                <DesktopMenu key={menu.label} menu={menu} />
            ))}
        </div>
    );
};

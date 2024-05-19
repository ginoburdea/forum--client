import classNames from 'classnames';
import Image from 'next/image';

import './index.scss';

interface MobileNavMenuHamburgerProps {
    onChangeOpen: (newValue: boolean) => any;
    open: boolean;
}

export default function MobileNavMenuHamburger({
    onChangeOpen,
    open,
}: MobileNavMenuHamburgerProps) {
    return (
        <>
            <div className={'g:tablet:hidden'}>
                <Image
                    src={
                        open
                            ? '/img/x-icon-white.png'
                            : '/img/menu-icon-white.png'
                    }
                    className={classNames({ 'menu-icon-small': open })}
                    alt={open ? 'open-menu-icon' : 'close-menu-icon'}
                    onClick={() => onChangeOpen(!open)}
                    height={24}
                    width={24}
                />
            </div>
        </>
    );
}

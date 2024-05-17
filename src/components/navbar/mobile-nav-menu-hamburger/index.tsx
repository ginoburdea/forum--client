import classNames from 'classnames';
import Image from 'next/image';
import './index.scss';

interface MobileNavMenuHamburgerProps {
    open: boolean;
    onChangeOpen: (newValue: boolean) => any;
}

export default function MobileNavMenuHamburger({
    open,
    onChangeOpen,
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
                    alt={open ? 'open-menu-icon' : 'close-menu-icon'}
                    className={classNames({ 'menu-icon-small': open })}
                    width={24}
                    height={24}
                    onClick={() => onChangeOpen(!open)}
                />
            </div>
        </>
    );
}

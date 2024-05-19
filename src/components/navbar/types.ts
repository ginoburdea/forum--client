export type Menus = Menu[];

export interface Menu {
    handler?: () => any;
    children?: Menus;
    label: string;
    url?: string;
}

export interface CommonNavMenuProps {
    loggedInMenus: Menus;
    commonMenus: Menus;
}

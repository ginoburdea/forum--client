export type Menus = Menu[];

export interface Menu {
    label: string;
    url?: string;
    handler?: () => any;
    children?: Menus;
}

export interface CommonNavMenuProps {
    commonMenus: Menus;
    loggedInMenus: Menus;
}

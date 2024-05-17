export interface Menu {
    label: string;
    url?: string;
    handler?: () => any;
    children?: Menu[];
}

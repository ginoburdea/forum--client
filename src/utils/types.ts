export interface InputProps<T = string> {
    onErrorChange: (newValue: string) => any;
    onChange: (newValue: T) => any;
    label: string;
    error: string;
    value: T;
}

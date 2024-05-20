export interface InputProps<T = string> {
    onErrorChange: (newValue: string) => any;
    onChange: (newValue: T) => any;
    disabled?: boolean;
    loading?: boolean;
    label: string;
    error: string;
    value: T;
}

export interface InputProps<T = string> {
    onErrorChange: (newValue: string) => any;
    onChange: (newValue: T) => any;
    disabled?: boolean;
    loading?: boolean;
    label: string;
    error: string;
    value: T;
}

export interface IAnswer {
    replyingToAnswer: string;
    authorPhoto: string;
    authorName: string;
    postedAt: string;
    text: string;
    id: string;
}

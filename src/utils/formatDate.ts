import dayjs from 'dayjs';
import 'dayjs/locale/ro';

export const formatDate = (date: string) => {
    return dayjs(date).locale('ro').format('D MMM, HH:mm');
};

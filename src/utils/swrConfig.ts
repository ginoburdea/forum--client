import { SWRConfiguration } from 'swr';
import { store } from './stores';
import { loggedInSelector } from './stores/auth';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    validateStatus: () => true,
});

const fetcher = async (url: string) => {
    const state = store.getState();
    const isLoggedIn = loggedInSelector(state);

    const { data, status } = await axiosInstance.get(url, {
        headers: {
            authorization: isLoggedIn
                ? 'Bearer ' + state.auth?.token
                : undefined,
        },
    });

    if (status < 200 || status >= 300) throw data;
    return data;
};

export const swrConfig: SWRConfiguration = {
    fetcher,
    revalidateIfStale: false,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
};

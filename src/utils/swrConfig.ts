import { SWRConfiguration } from 'swr';
import axios from 'axios';

import { loggedInSelector, updateAuth } from './stores/auth';
import { store } from './stores';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    validateStatus: () => true,
});

const fetcher = async (url: string) => {
    const state = store.getState();
    const isLoggedIn = loggedInSelector(state);

    const { status, data } = await axiosInstance.get(url, {
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
    onError(error) {
        if (error.statusCode === 401) {
            store.dispatch(updateAuth({}));
        }
    },
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    fetcher,
};

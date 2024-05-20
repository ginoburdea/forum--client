import { SWRConfiguration } from 'swr';
import axios from 'axios';

import { loggedInSelector, updateAuth } from './stores/auth';
import { isObject } from './isObject';
import { store } from './stores';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    validateStatus: () => true,
});

interface InputWithMethod {
    method: string;
    url: string;
}

const fetcher = async (input: InputWithMethod | string) => {
    const state = store.getState();
    const isLoggedIn = loggedInSelector(state);

    const headers = isLoggedIn
        ? { authorization: 'Bearer ' + state.auth?.token }
        : {};

    const url: string = isObject(input)
        ? (input as InputWithMethod).url
        : (input as string);

    const method: string = isObject(input)
        ? (input as InputWithMethod).method
        : 'GET';

    const { status, data } = await axiosInstance({ headers, method, url });

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

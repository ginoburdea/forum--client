import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';

export interface AuthState {
    expiration?: string;
    token?: string;
}

const initialState: AuthState = {
    expiration: undefined,
    token: undefined,
};

export const authSlice = createSlice({
    reducers: {
        updateAuth(state, { payload }: PayloadAction<AuthState>) {
            state.token = payload.token;
            state.expiration = payload.expiration;
        },
    },
    initialState,
    name: 'auth',
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;

export const loggedInSelector = (state: RootState) => {
    if (!state.auth?.token || !state.auth?.expiration) {
        return false;
    }

    const date = new Date(state.auth.expiration);
    if (isNaN(date.getTime())) return false;

    return date > new Date();
};

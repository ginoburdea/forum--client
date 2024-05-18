import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface AuthState {
    token?: string;
    expiration?: string;
}

const initialState: AuthState = {
    token: undefined,
    expiration: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth(state, { payload }: PayloadAction<AuthState>) {
            state.token = payload.token;
            state.expiration = payload.expiration;
        },
    },
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

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MessagesState {
    errTitle?: string;
    err?: string;
    msg?: string;
}

const initialState: MessagesState = {
    errTitle: undefined,
    err: undefined,
    msg: undefined,
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        updateMessages(state, { payload }: PayloadAction<MessagesState>) {
            state.errTitle = payload.errTitle;
            state.err = payload.err;
            state.msg = payload.msg;
        },
    },
});

export const { updateMessages } = messagesSlice.actions;
export default messagesSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { isObject } from '../isObject';

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
    reducers: {
        updateMessagesFromHttpResponse(state, { payload }) {
            const errMessage = isObject(payload.message)
                ? Object.values(payload.message as object)[0]
                : payload.message;

            state.errTitle = errMessage ? payload.error : undefined;
            state.err = errMessage ? errMessage : payload.error;
        },
        updateMessages(state, { payload }: PayloadAction<MessagesState>) {
            state.errTitle = payload.errTitle;
            state.err = payload.err;
            state.msg = payload.msg;
        },
    },
    name: 'messages',
    initialState,
});

export const { updateMessagesFromHttpResponse, updateMessages } =
    messagesSlice.actions;
export default messagesSlice.reducer;

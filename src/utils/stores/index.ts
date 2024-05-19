import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import messagesReducer from './messages';
import authReducer from './auth';

const rootPersistConfig = {
    transforms:
        process.env.NODE_ENV === 'production'
            ? [
                  encryptTransform({
                      secretKey: process.env.NEXT_PUBLIC_STATE_ENCRYPTION_KEY,
                  }),
              ]
            : [],
    blacklist: ['messages'],
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    messages: messagesReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

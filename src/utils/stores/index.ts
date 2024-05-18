import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import messagesReducer from './messages';

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['messages'],
    transforms:
        process.env.NODE_ENV === 'production'
            ? [
                  encryptTransform({
                      secretKey: process.env.NEXT_PUBLIC_STATE_ENCRYPTION_KEY,
                  }),
              ]
            : [],
};

const rootReducer = combineReducers({
    auth: authReducer,
    messages: messagesReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

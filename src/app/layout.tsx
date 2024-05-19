'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/utils/stores';
import Message from '@/components/message';
import Navbar from '@/components/navbar';
import { Provider } from 'react-redux';
import Script from 'next/script';
import '@/styles/global.scss';
import '@/styles/reset.css';
import './layout.scss';
import { SWRConfig } from 'swr';
import axios from 'axios';
import { loggedInSelector } from '@/utils/stores/auth';
import { updateMessages } from '@/utils/stores/messages';
import { isObject } from '@/utils/isObject';
import { swrConfig } from '@/utils/swrConfig';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <PersistGate persistor={persistor} loading={null}>
                        <SWRConfig value={swrConfig}>
                            <Navbar></Navbar>
                            <main className="main-layout">{children}</main>
                            <Message></Message>
                            <Script
                                src="https://accounts.google.com/gsi/client"
                                async
                            />
                        </SWRConfig>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}

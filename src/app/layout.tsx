'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { persistor, store } from '@/utils/stores';
import { swrConfig } from '@/utils/swrConfig';
import Message from '@/components/message';
import Navbar from '@/components/navbar';
import { Provider } from 'react-redux';
import Script from 'next/script';
import { SWRConfig } from 'swr';
import '@/styles/global.scss';
import '@/styles/reset.css';

import './layout.scss';

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
                            <SkeletonTheme
                                highlightColor="#e6e6e6"
                                baseColor="#ffffff"
                                borderRadius={0}
                            >
                                <Navbar></Navbar>
                                <main className="main-layout">{children}</main>
                                <Message></Message>
                                <Script
                                    src="https://accounts.google.com/gsi/client"
                                    async
                                />
                            </SkeletonTheme>
                        </SWRConfig>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}

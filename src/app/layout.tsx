'use client';
import '@/styles/reset.css';
import '@/styles/global.scss';
import Navbar from '@/components/navbar';
import { Provider } from 'react-redux';
import { persistor, store } from '@/utils/stores';
import { PersistGate } from 'redux-persist/integration/react';
import Message from '@/components/message';
import Script from 'next/script';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Navbar></Navbar>
                        <main>{children}</main>
                        <Message></Message>
                        <Script
                            src="https://accounts.google.com/gsi/client"
                            async
                        />
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}

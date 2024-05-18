'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/utils/stores';
import Message from '@/components/message';
import Navbar from '@/components/navbar';
import { Provider } from 'react-redux';
import Script from 'next/script';
import '@/styles/global.scss';
import '@/styles/reset.css';

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

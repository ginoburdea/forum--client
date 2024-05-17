import '@/styles/reset.css';
import '@/styles/global.scss';
import Navbar from '@/components/navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar></Navbar>
                <main>{children}</main>
            </body>
        </html>
    );
}

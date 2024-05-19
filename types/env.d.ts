declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
            NEXT_PUBLIC_GOOGLE_REDIRECT_URL: string;
            NEXT_PUBLIC_STATE_ENCRYPTION_KEY: string;
            NEXT_PUBLIC_SERVER_URL: string;
        }
    }
}

export {};

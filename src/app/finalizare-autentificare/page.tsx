'use client';
import { AuthState, updateAuth } from '@/utils/stores/auth';
import { useAppDispatch } from '@/utils/hooks';
import { MessagesState, updateMessages } from '@/utils/stores/messages';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import './index.scss';

const handleAuthResponse = (
    authRes: any,
): { auth?: AuthState; messages: MessagesState } => {
    if (!authRes) {
        return {
            messages: {
                err: 'Autentificarea a esuat. Incercati din nou mai tarziu',
            },
        };
    }

    const parsedAuthRes = JSON.parse(authRes);
    if (
        parsedAuthRes.statusCode === 200 &&
        parsedAuthRes.token &&
        parsedAuthRes.expiresAt
    ) {
        return {
            auth: {
                token: parsedAuthRes.token,
                expiration: parsedAuthRes.expiresAt,
            },
            messages: {
                msg: 'Autentificat cu success',
            },
        };
    }

    if (parsedAuthRes.error && parsedAuthRes.message) {
        const errorMessage =
            typeof parsedAuthRes.message === 'string'
                ? parsedAuthRes.message
                : Object.values(parsedAuthRes.message)[0];

        return {
            messages: {
                errTitle: parsedAuthRes.error,
                err: errorMessage,
            },
        };
    }

    if (parsedAuthRes.statusCode) {
        return {
            messages: {
                err: `Autentificarea a esuat cu codul ${parsedAuthRes.statusCode}.`,
            },
        };
    }

    return {
        messages: {
            err: 'Autentificarea a esuat. Incercati din nou mai tarziu',
        },
    };
};

export default function CompleteAuthPage() {
    const dispatch = useAppDispatch();

    const query = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const authRes = query.get('oAuthRes');
        const { auth, messages } = handleAuthResponse(authRes);

        console.log({ authRes, auth, messages });

        if (auth) dispatch(updateAuth(auth));
        dispatch(updateMessages(messages));

        return router.push('/');
    }, [dispatch, query, router]);

    return (
        <div className="center">
            <p>Incarcare...</p>
        </div>
    );
}

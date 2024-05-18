'use client';
import { updateMessages } from '@/utils/stores/messages';
import './index.scss';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import classNames from 'classnames';
import { useEffect } from 'react';

export default function Message() {
    const dispatch = useAppDispatch();

    const messages = useAppSelector((state) => state.messages);
    const hasMessages = useAppSelector(
        (state) => state.messages?.err || state.messages?.msg,
    );

    useEffect(() => {
        setTimeout(() => {
            dispatch(updateMessages({}));
        }, 6000);
    }, [dispatch]);

    return (
        hasMessages && (
            <div
                className={classNames(
                    'message',
                    messages && (messages?.err ? 'has-error' : 'has-success'),
                )}
            >
                <div className="message-loader"></div>

                {messages ? (
                    <>
                        {messages.errTitle && <h3>{messages.errTitle}</h3>}
                        <p>{messages.err || messages.msg}</p>
                    </>
                ) : (
                    <p>Incarcare...</p>
                )}
            </div>
        )
    );
}

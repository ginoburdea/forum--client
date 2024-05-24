'use client';
import {
    updateMessagesFromHttpResponse,
    updateMessages,
} from '@/utils/stores/messages';
import { DOMAttributes, useEffect, useState } from 'react';
import InputField from '@/components/input-field';
import { useAppDispatch } from '@/utils/hooks';
import Button from '@/components/button';
import useSWR from 'swr';

interface PostQuestionOrAnswerCardProps {
    serverBodyField: string;
    onSuccess?: () => any;
    replyingTo?: string;
    successMsg: string;
    inputLabel: string;
    serverUrl: string;
}

export default function PostQuestionOrAnswerCard({
    onSuccess = () => {},
    serverBodyField,
    successMsg,
    inputLabel,
    replyingTo,
    serverUrl,
}: PostQuestionOrAnswerCardProps) {
    const dispatch = useAppDispatch();

    const [postQuestionBody, setPostQuestionBody] = useState({});

    const [postQuestionText, setPostQuestionText] = useState('');
    const [postQuestionTextError, setPostQuestionTextError] = useState('');

    const {
        isLoading: postQuestionLoading,
        error: postQuestionError,
        data: postQuestionRes,
    } = useSWR(
        {
            body: postQuestionBody,
            url: serverUrl,
            method: 'POST',
        },
        { revalidateOnMount: false },
    );

    useEffect(() => {
        (async () => {
            if (!postQuestionRes) return;

            setPostQuestionText('');
            dispatch(updateMessages({ msg: successMsg }));
            await onSuccess();
        })();
    }, [postQuestionRes]);

    useEffect(() => {
        if (!postQuestionError) return;

        if (postQuestionError?.message?.text) {
            setPostQuestionTextError(postQuestionError.message.text);
            return;
        }

        dispatch(updateMessagesFromHttpResponse(postQuestionError));
    }, [postQuestionError]);

    const postQuestion: DOMAttributes<HTMLFormElement>['onSubmit'] = (
        event,
    ) => {
        event.preventDefault();

        if (postQuestionLoading) return;

        setPostQuestionBody({
            [serverBodyField]: postQuestionText,
            time: Date.now(),
            replyingTo,
        });
    };

    return (
        <form onSubmit={postQuestion} className="g:mb-lg">
            <InputField
                onErrorChange={setPostQuestionTextError}
                onChange={setPostQuestionText}
                error={postQuestionTextError}
                value={postQuestionText}
                label={inputLabel}
            />
            <Button label="Posteaza" type="submit" />
        </form>
    );
}

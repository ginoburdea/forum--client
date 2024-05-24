'use client';
import {
    updateMessagesFromHttpResponse,
    updateMessages,
} from '@/utils/stores/messages';
import TransparentDropdown from '@/components/transparent-dropdown';
import { DOMAttributes, useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import InputField from '@/components/input-field';
import { useAppDispatch } from '@/utils/hooks';
import { useParams } from 'next/navigation';
import Button from '@/components/button';
import { IAnswer } from '@/utils/types';
import Card from '@/components/card';
import useSWR from 'swr';

import './page.scss';

export default function QuestionPage() {
    const dispatch = useAppDispatch();
    const { questionId } = useParams();

    const answersSortOptions = [
        { label: 'Cele mai noi', value: 'newest' },
        { label: 'Cele mai vechi', value: 'oldest' },
    ];

    const {
        isLoading: questionLoading,
        error: questionError,
        data: question,
    } = useSWR(`/v1/questions/${questionId}`);

    const [localAnswers, setLocalAnswers] = useState<IAnswer[]>([]);

    const [answersPage, setAnswersPage] = useState(0);
    const [answersSort, setAnswersSort] = useState('newest');

    const [hasMore, setHasMore] = useState(true);

    const {
        isLoading: answersLoading,
        error: answersError,
        data: answers,
    } = useSWR(
        `/v1/questions/${questionId}/answers?page=${answersPage}&sort=${answersSort}`,
    );

    const [postAnswerBody, setPostAnswerBody] = useState({});

    const [postAnswerText, setPostAnswerText] = useState('');
    const [postAnswerTextError, setPostAnswerTextError] = useState('');

    const {
        isLoading: postAnswerLoading,
        error: postAnswerError,
        data: postAnswerRes,
    } = useSWR(
        {
            url: `/v1/questions/${questionId}/answers`,
            body: postAnswerBody,
            method: 'POST',
        },
        { revalidateOnMount: false },
    );

    useEffect(() => {
        if (!postAnswerRes) return;

        setPostAnswerText('');
        dispatch(updateMessages({ msg: 'Raspuns postat cu succes!' }));
    }, [postAnswerRes]);

    useEffect(() => {
        if (!answers) return;

        setLocalAnswers((prev) => [...prev, ...(answers.answers as IAnswer[])]);
        setHasMore(answers.hasMore);
    }, [answers]);

    useEffect(() => {
        if (!questionError) return;

        dispatch(updateMessagesFromHttpResponse(questionError));
    }, [questionError]);

    useEffect(() => {
        if (!answersError) return;

        dispatch(updateMessagesFromHttpResponse(answersError));
    }, [answersError]);

    useEffect(() => {
        if (!postAnswerError) return;

        if (postAnswerError?.message?.text) {
            setPostAnswerTextError(postAnswerError.message.text);
            return;
        }

        dispatch(updateMessagesFromHttpResponse(postAnswerError));
    }, [postAnswerError]);

    const postAnswer: DOMAttributes<HTMLFormElement>['onSubmit'] = (event) => {
        event.preventDefault();

        if (postAnswerLoading) return;

        setPostAnswerBody({ text: postAnswerText, time: Date.now() });
    };

    if (questionError || answersError) return null;

    return (
        <>
            <Card loading={questionLoading} data={question} />

            <form onSubmit={postAnswer} className="g:mb-lg">
                <InputField
                    onErrorChange={setPostAnswerTextError}
                    onChange={setPostAnswerText}
                    label="Scrie un raspuns..."
                    error={postAnswerTextError}
                    value={postAnswerText}
                />
                <Button label="Posteaza" type="submit" />
            </form>

            {answersLoading ? (
                Array(3)
                    .fill(null)
                    .map((_, index) => (
                        <Card size="small" key={index} loading />
                    ))
            ) : localAnswers.length === 0 ? (
                <></>
            ) : (
                <>
                    <div className="g:mb-sm">
                        <TransparentDropdown
                            onChange={(newValue) => {
                                setLocalAnswers([]);
                                setAnswersSort(newValue);
                            }}
                            options={answersSortOptions}
                            value={answersSort}
                        />
                    </div>
                    {localAnswers.map((answer, index) => (
                        <Card data={answer} size="small" key={index} />
                    ))}
                    {hasMore && (
                        <div className="flex-center">
                            <Button
                                onClick={() =>
                                    setAnswersPage((page) => page + 1)
                                }
                                label="Incarca mai multe"
                                loading={answersLoading}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

'use client';
import PostQuestionOrAnswerCard from '@/components/post-question-or-answer-card';
import { updateMessagesFromHttpResponse } from '@/utils/stores/messages';
import TransparentDropdown from '@/components/transparent-dropdown';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppDispatch } from '@/utils/hooks';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

    if (questionError || answersError) return null;

    return (
        <>
            <Card loading={questionLoading} data={question} />

            <PostQuestionOrAnswerCard
                serverUrl={`/v1/questions/${questionId}/answers`}
                successMsg="Raspuns postat cu succes!"
                inputLabel="Scrie un raspuns..."
                serverBodyField="text"
            />

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

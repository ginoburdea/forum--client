'use client';
import { updateMessagesFromHttpResponse } from '@/utils/stores/messages';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate } from '@/utils/formatDate';
import { useAppDispatch } from '@/utils/hooks';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import './page.scss';

export default function QuestionPage() {
    const { questionId } = useParams();
    const {
        isLoading: questionLoading,
        error: questionError,
        data: question,
    } = useSWR(`/v1/questions/${questionId}`);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!questionError) return;

        dispatch(updateMessagesFromHttpResponse(questionError));
    }, [questionError]);

    if (questionError) return null;

    return (
        <>
            <div className="g:promo-card g:mb-lg">
                <div className="question-header g:mb-md">
                    {questionLoading ? (
                        <Skeleton height={32} width={32} />
                    ) : (
                        <Image
                            src={question.authorPhoto}
                            alt="author-profile-photo"
                            height={32}
                            width={32}
                        />
                    )}
                    <div className="w-full">
                        <h3>
                            {questionLoading ? (
                                <Skeleton />
                            ) : (
                                question.authorName
                            )}
                        </h3>
                    </div>
                </div>
                <div className="g:mb-md">
                    <p>
                        {questionLoading ? (
                            <Skeleton count={5} />
                        ) : (
                            question.text
                        )}
                    </p>
                </div>
                <div className="question-footer">
                    {questionLoading ? (
                        <div className="w-1/4">
                            <Skeleton />
                        </div>
                    ) : (
                        <p className="g:text-sm">
                            {question.answers} raspunsuri
                        </p>
                    )}

                    {questionLoading ? (
                        <div className="w-1/4">
                            <Skeleton />
                        </div>
                    ) : (
                        <p className="g:text-sm">
                            {formatDate(question.postedAt)}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

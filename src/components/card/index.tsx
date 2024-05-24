import { formatDate } from '@/utils/formatDate';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';
import { useState } from 'react';
import Image from 'next/image';

import PostQuestionOrAnswerCard from '../post-question-or-answer-card';
import './index.scss';

interface QuestionOrAnswer {
    authorPhoto?: string;
    authorName?: string;
    postedAt?: string;
    answers?: number;
    text?: string;
    id?: string;
}

interface CardData extends QuestionOrAnswer {
    replyingToAnswer?: QuestionOrAnswer;
    questionId?: string;
}

interface CardProps {
    size?: 'extra-small' | 'regular' | 'small';
    loading?: boolean;
    data?: CardData;
}

export default function Card({
    size = 'regular',
    data = {},
    loading,
}: CardProps) {
    const [showReply, setShowReply] = useState(false);

    return (
        <>
            <div
                className={classNames(
                    size === 'regular' && 'g:promo-card-md g:mb-lg',
                    size === 'small' && 'promo-card-sm g:mb-sm',
                    size === 'extra-small' && 'promo-card-xs g:mb-lg',
                )}
            >
                {data?.replyingToAnswer && (
                    <Card data={data.replyingToAnswer} size="extra-small" />
                )}
                <div className="card-header g:mb-md">
                    {loading ? (
                        <Skeleton height={32} width={32} />
                    ) : (
                        <Image
                            src={data?.authorPhoto || ''}
                            alt="author-profile-photo"
                            height={32}
                            width={32}
                        />
                    )}
                    <div className="w-full">
                        <h3>{loading ? <Skeleton /> : data?.authorName}</h3>
                    </div>
                </div>
                <div className="g:mb-md">
                    <p>
                        {loading ? (
                            <Skeleton count={size === 'regular' ? 5 : 3} />
                        ) : (
                            data?.text
                        )}
                    </p>
                </div>

                <div className="card-footer">
                    <p>{}</p>
                </div>
                <div className="card-footer">
                    {data?.answers || data.answers === 0 ? (
                        loading ? (
                            <div className="w-1/4">
                                <Skeleton />
                            </div>
                        ) : (
                            <p className="g:text-sm">
                                {data?.answers} raspunsuri
                            </p>
                        )
                    ) : (
                        <div>
                            {size !== 'extra-small' && (
                                <a
                                    onClick={() => setShowReply((val) => !val)}
                                    className="g:link g:text-sm"
                                >
                                    Raspunde
                                </a>
                            )}
                        </div>
                    )}

                    {loading ? (
                        <div className="w-1/4">
                            <Skeleton />
                        </div>
                    ) : (
                        <p className="g:text-sm">
                            {formatDate(data?.postedAt || '')}
                        </p>
                    )}
                </div>
            </div>
            {showReply && (
                <PostQuestionOrAnswerCard
                    serverUrl={`/v1/questions/${data.questionId}/answers`}
                    successMsg="Raspuns postat cu success!"
                    onSuccess={() => setShowReply(false)}
                    inputLabel="Scrie un raspus..."
                    serverBodyField="text"
                    replyingTo={data.id}
                />
            )}
        </>
    );
}

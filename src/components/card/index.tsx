import { formatDate } from '@/utils/formatDate';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

import './index.scss';

interface CardProps {
    data?: {
        authorPhoto?: string;
        authorName?: string;
        postedAt?: string;
        answers?: number;
        text?: string;
    };
    size?: 'regular' | 'small';
    loading?: boolean;
}

export default function Card({
    size = 'regular',
    data = {},
    loading,
}: CardProps) {
    return (
        <div
            className={
                size === 'regular'
                    ? 'g:promo-card g:mb-lg'
                    : 'g:promo-card-light g:mb-sm'
            }
        >
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
                        <p className="g:text-sm">{data?.answers} raspunsuri</p>
                    )
                ) : (
                    <div></div>
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
    );
}

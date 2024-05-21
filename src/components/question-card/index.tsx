import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';

import './index.scss';

export interface Question {
    authorPhoto: string;
    authorName: string;
    postedAt: string;
    preview: string;
    closed: boolean;
    answers: number;
    id: string;
}

interface QuestionCardProps {
    question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
    return (
        <Link href={`/intrebarea/${question.id}`} className="disable-underline">
            <div className="question-card">
                <div className="question-card-header">
                    <Image
                        src={question.authorPhoto}
                        alt="author-profile-photo"
                        height={32}
                        width={32}
                    />
                    <div className="div">
                        <h3>{question.authorName}</h3>
                    </div>
                </div>

                <p className="question-card-content">
                    {question.closed && '[Arhivata] '}
                    {question.preview}
                </p>

                <div className="question-card-meta">
                    <p className="g:text-sm">{question.answers} raspunsuri</p>
                    <p className="g:text-sm">{formatDate(question.postedAt)}</p>
                </div>
            </div>
        </Link>
    );
}

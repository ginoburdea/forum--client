import Link from 'next/link';
import './index.scss';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/ro';

export interface Question {
    id: string;
    postedAt: string;
    preview: string;
    closed: boolean;
    answers: number;
    authorName: string;
    authorPhoto: string;
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
                        height={32}
                        width={32}
                        src={question.authorPhoto}
                        alt="author-profile-photo"
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
                    <p className="g:text-sm">
                        {dayjs(question.postedAt)
                            .locale('ro')
                            .format('D MMM, HH:mm')}
                    </p>
                </div>
            </div>
        </Link>
    );
}

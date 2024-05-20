'use client';
import {
    updateMessagesFromHttpResponse,
} from '@/utils/stores/messages';
import { useAppDispatch } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import QuestionCard, { Question } from '../question-card';
import TransparentDropdown from '../transparent-dropdown';
import './index.scss';

const useQuestions = (ownQuestions: boolean, page: number, sortBy: string) => {
    const querystring = new URLSearchParams({
        page: '' + page,
        sort: sortBy,
    }).toString();

    const urlPath = ownQuestions ? '/v1/questions/own' : '/v1/questions';

    const { isLoading, error, data } = useSWR(urlPath + '?' + querystring);

    return {
        hasNextPage: data?.nextPage || false,
        questions: data?.questions || [],
        questionsLoading: isLoading,
        questionsError: error,
    };
};

interface QuestionsProps {
    ownQuestions: boolean;
}

export default function Questions({ ownQuestions }: QuestionsProps) {
    const sortByOptions = [
        { label: 'Cele mai noi', value: 'newest' },
        { label: 'Cele mai vechi', value: 'oldest' },
        { label: 'Cu cele mai multe raspunsuri', value: 'mostAnswered' },
        { label: 'Cu cele mai putine raspunsuri', value: 'leastAnswered' },
    ];

    const [sortBy, setSortBy] = useState(sortByOptions[0].value);

    const [lastPage, setLastPage] = useState(-1);
    const [localQuestions, setLocalQuestions] = useState<Question[]>([]);

    const { questionsLoading, questionsError, hasNextPage, questions } =
        useQuestions(ownQuestions, lastPage + 1, sortBy);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!questions || questions.length === 0) return;

        setLocalQuestions([...localQuestions, ...questions]);
    }, [questions]);

    useEffect(() => {
        if (!questionsError) return;

        dispatch(updateMessagesFromHttpResponse(questionsError));
    }, [questionsError]);

    if (questionsError) return null;

    return (
        <>
            <div className="g:mb-md">
                <TransparentDropdown
                    onChange={(newValue) => {
                        setLocalQuestions([]);
                        setLastPage(-1);
                        setSortBy(newValue);
                    }}
                    options={sortByOptions}
                    value={sortBy}
                />
            </div>

            {localQuestions.length === 0 &&
                !questionsLoading &&
                (ownQuestions ? (
                    <p>
                        Nu ai postat nicio intrebare inca.{' '}
                        <Link href="/posteaza-intrebare" className="g:link">
                            Posteaza una acum!
                        </Link>
                    </p>
                ) : (
                    <p>
                        Nu a fost postata nicio intrebare inca.{' '}
                        <Link href="/posteaza-intrebare" className="g:link">
                            Fi primul care posteaza!
                        </Link>
                    </p>
                ))}

            {localQuestions.map((question) => (
                <QuestionCard question={question} key={question.id} />
            ))}

            <div className="center">
                {questionsLoading ? (
                    <p className="g:text-sm">Incarcare...</p>
                ) : hasNextPage ? (
                    <button
                        onClick={() => setLastPage(lastPage + 1)}
                        disabled={!hasNextPage}
                    >
                        Incarca mai multe
                    </button>
                ) : (
                    localQuestions.length > 0 &&
                    !questionsLoading && (
                        <p className="g:text-sm">
                            Se pare ca ai ajuns la finalul intrebarilor!
                        </p>
                    )
                )}
            </div>
        </>
    );
}

'use client';
import { updateMessagesFromHttpResponse } from '@/utils/stores/messages';
import { useAppDispatch } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import QuestionCard, { Question } from '../question-card';
import TransparentDropdown from '../transparent-dropdown';
import Button from '../button';
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
            {localQuestions.length > 0 && (
                <div className="g:mb-sm">
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
            )}

            {localQuestions.length === 0 &&
                !questionsLoading &&
                (ownQuestions ? (
                    <p>Nu ai postat nicio intrebare inca.</p>
                ) : (
                    <p>Nu a fost postata nicio intrebare inca.</p>
                ))}

            {localQuestions.map((question) => (
                <QuestionCard question={question} key={question.id} />
            ))}

            <div className="center">
                {hasNextPage ? (
                    <Button
                        onClick={() => setLastPage(lastPage + 1)}
                        loading={questionsLoading}
                        label="Incarca mai multe"
                    />
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

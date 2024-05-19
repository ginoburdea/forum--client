'use client';
import LoginWithGoogleButton from '@/components/login-with-google-button';
import './page.scss';
import TransparentDropdown from '@/components/transparent-dropdown';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { isObject } from '@/utils/isObject';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { updateMessages } from '@/utils/stores/messages';
import QuestionCard, { Question } from '@/components/question-card';
import { loggedInSelector } from '@/utils/stores/auth';
import Link from 'next/link';

const useQuestions = (page: number, sortBy: string) => {
    const querystring = new URLSearchParams({
        page: '' + page,
        sort: sortBy,
    }).toString();

    const { data, error, isLoading } = useSWR('/v1/questions?' + querystring);

    console.log('data', data);

    return {
        questions: data?.questions || [],
        hasNextPage: data?.nextPage || false,
        questionsError: error,
        questionsLoading: isLoading,
    };
};

export default function Home() {
    const sortByOptions = [
        { label: 'Cele mai noi', value: 'newest' },
        { label: 'Cele mai vechi', value: 'oldest' },
        { label: 'Cu cele mai multe raspunsuri', value: 'mostAnswered' },
        { label: 'Cu cele mai putine raspunsuri', value: 'leastAnswered' },
    ];

    const [sortBy, setSortBy] = useState(sortByOptions[0].value);

    const [lastPage, setLastPage] = useState(-1);
    const [localQuestions, setLocalQuestions] = useState<Question[]>([]);

    const { questions, hasNextPage, questionsError, questionsLoading } =
        useQuestions(lastPage + 1, sortBy);

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(loggedInSelector);

    useEffect(() => {
        console.log('questions', questions);
        if (!questions) return;

        setLocalQuestions([...localQuestions, ...questions]);
    }, [questions]);

    useEffect(() => {
        console.log('questionsError', questionsError);
        if (!questionsError) return;

        const errMessage = isObject(questionsError.message)
            ? Object.values(questionsError.message as object)[0]
            : questionsError.message;

        dispatch(
            updateMessages({
                errTitle: errMessage ? questionsError.error : undefined,
                err: errMessage ? errMessage : questionsError.error,
            }),
        );
    }, [questionsError]);

    return (
        <>
            {!isLoggedIn && (
                <div className="promo-card mb-lg">
                    <div className="mb-lg">
                        <h1 className="mb-md">Bun venit la „Tema e grea”</h1>
                        <p>
                            Aici poti gasi si posta intrebari la cele mai
                            dificile teme si ceilalti membri iti vor raspunde!
                        </p>
                    </div>
                    <div className="mb-lg">
                        <p>
                            Simte-te liber sa explorezi site-ul. Cand esti
                            pregatit sa
                        </p>
                        <ul>
                            <li>citesti intrebarile in intregime</li>
                            <li>vezi raspunsuri</li>
                            <li>postezi intrebari</li>
                        </ul>
                        <p>creaza-ti un cont apasand pe butonul de mai jos!</p>
                    </div>
                    <LoginWithGoogleButton />
                </div>
            )}

            <div className="mb-md">
                <TransparentDropdown
                    value={sortBy}
                    options={sortByOptions}
                    onChange={(newValue) => {
                        setLocalQuestions([]);
                        setLastPage(-1);
                        setSortBy(newValue);
                    }}
                />
            </div>

            {localQuestions.length === 0 && !questionsLoading && (
                <p>
                    Nu a fost postata nicio intrebare inca.
                    <Link href="/posteaza-intrebare">
                        Fi primul care posteaza!
                    </Link>
                </p>
            )}

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
                    <p className="g:text-sm">
                        Se pare ca ai ajuns la finalul intrebarilor!
                    </p>
                )}
            </div>
        </>
    );
}

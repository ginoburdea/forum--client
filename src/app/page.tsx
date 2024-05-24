'use client';
import PostQuestionOrAnswerCard from '@/components/post-question-or-answer-card';
import LoginWithGoogleButton from '@/components/login-with-google-button';
import { loggedInSelector } from '@/utils/stores/auth';
import { useAppSelector } from '@/utils/hooks';
import Questions from '@/components/questions';

export default function Home() {
    const isLoggedIn = useAppSelector(loggedInSelector);

    return (
        <>
            {!isLoggedIn && (
                <div className="g:promo-card-md g:mb-lg">
                    <div className="g:mb-md">
                        <h1 className="g:mb-sm">Bun venit la „Tema e grea”</h1>
                        <p>
                            Aici poti gasi si posta intrebari la cele mai
                            dificile teme si ceilalti membri iti vor raspunde!
                        </p>
                    </div>
                    <div className="g:mb-md">
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

            <PostQuestionOrAnswerCard
                successMsg="Intrebare postata cu success!"
                inputLabel="Scrie o intrebare..."
                serverBodyField="question"
                serverUrl="/v1/questions"
            />

            <Questions ownQuestions={false} />
        </>
    );
}

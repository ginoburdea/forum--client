'use client';
import LoginWithGoogleButton from '@/components/login-with-google-button';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { loggedInSelector } from '@/utils/stores/auth';
import Questions from '@/components/questions';

import './page.scss';

export default function Home() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(loggedInSelector);

    return (
        <>
            {!isLoggedIn && (
                <div className="promo-card g:mb-lg">
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

            <Questions ownQuestions={false} />
        </>
    );
}

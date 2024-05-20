'use client';
import {
    updateMessagesFromHttpResponse,
    updateMessages,
} from '@/utils/stores/messages';
import { FormEventHandler, useEffect, useState } from 'react';
import InputField from '@/components/input-field';
import { useAppDispatch } from '@/utils/hooks';
import Checkbox from '@/components/checkbox';
import { isObject } from '@/utils/isObject';
import useSWR from 'swr';

import './page.scss';

export default function UpdateAccountPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [answersNotifications, setAnswersNotifications] = useState(false);
    const [repliesNotifications, setRepliesNotifications] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({
        answersNotifications: '',
        repliesNotifications: '',
        name: '',
    });

    const [updateProfileBody, setUpdateProfileBody] = useState({});

    const dispatch = useAppDispatch();

    const {
        isLoading: getProfileLoading,
        error: getProfileError,
        data: profileInfo,
    } = useSWR('/v1/auth/profile');

    useEffect(() => {
        if (!profileInfo) return;

        setName(profileInfo.name);
        setEmail(profileInfo.email);
        setAnswersNotifications(profileInfo.answersNotifications);
        setRepliesNotifications(profileInfo.repliesNotifications);
    }, [profileInfo]);

    useEffect(() => {
        if (!getProfileError) return;

        dispatch(updateMessagesFromHttpResponse(getProfileError));
    }, [getProfileError]);

    const {
        isLoading: updateProfileLoading,
        error: updateProfileError,
        data: updateProfileData,
    } = useSWR(
        {
            url: '/v1/auth/profile',
            body: updateProfileBody,
            method: 'PATCH',
        },
        { revalidateOnMount: false },
    );

    useEffect(() => {
        if (updateProfileData !== '') return;

        dispatch(updateMessages({ msg: 'Profil actualizat cu succes!' }));
    }, [updateProfileData]);

    useEffect(() => {
        if (!updateProfileError) return;

        if (!isObject(updateProfileError.message)) {
            dispatch(updateMessagesFromHttpResponse(updateProfileError));
            return;
        }

        for (const key in updateProfileError.message || {}) {
            if (Object.keys(fieldErrors).includes(key)) {
                setFieldErrors((currentErrors) => ({
                    ...currentErrors,
                    [key]: updateProfileError.message[key],
                }));
            }
        }
    }, [updateProfileError]);

    const updateAccount: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (updateProfileLoading) return;

        setUpdateProfileBody({
            lastUpdate: Date.now(),
            answersNotifications,
            repliesNotifications,
            name,
        });
    };

    if (getProfileError) return null;

    return (
        <form className="update-account-page" onSubmit={updateAccount}>
            <h1 className="g:mb-lg">Actualizeaza cont</h1>
            <div className="g:mb-lg">
                <InputField
                    onErrorChange={() =>
                        setFieldErrors((errors) => ({ ...errors, name: '' }))
                    }
                    disabled={getProfileLoading || updateProfileLoading}
                    error={fieldErrors.name}
                    onChange={setName}
                    label="Nume"
                    value={name}
                />
                <InputField
                    disabled={getProfileLoading || updateProfileLoading}
                    onErrorChange={() => {}}
                    onChange={setEmail}
                    label="Email"
                    value={email}
                    error={''}
                />
            </div>
            <div className="g:mb-lg">
                <p className="g:mb-md g:text-bold">Notificari prin email</p>
                <Checkbox
                    onErrorChange={() =>
                        setFieldErrors((errors) => ({
                            ...errors,
                            answersNotifications: '',
                        }))
                    }
                    label="Cand cineva raspunde la o intrebare postata de mine"
                    error={fieldErrors.answersNotifications}
                    onChange={setAnswersNotifications}
                    value={answersNotifications}
                />
                <Checkbox
                    onErrorChange={() =>
                        setFieldErrors((errors) => ({
                            ...errors,
                            repliesNotifications: '',
                        }))
                    }
                    label="Cand cineva raspunde la un raspuns postat de mine"
                    error={fieldErrors.repliesNotifications}
                    onChange={setRepliesNotifications}
                    value={repliesNotifications}
                />
            </div>
            <button type="submit">Actualizeaza cont</button>
        </form>
    );
}

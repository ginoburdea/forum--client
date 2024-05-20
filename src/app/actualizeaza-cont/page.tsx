'use client';
import InputField from '@/components/input-field';
import Checkbox from '@/components/checkbox';

import './page.scss';

export default function UpdateAccountPage() {
    return (
        <div className="update-account-page">
            <h1 className="g:mb-lg">Actualizeaza cont</h1>
            <div className="g:mb-lg">
                <InputField
                    error="Name is too short"
                    onErrorChange={() => {}}
                    onChange={() => {}}
                    value="John Doe"
                    label="Name"
                />
                <InputField
                    value="john.doe@example.com"
                    onErrorChange={() => {}}
                    onChange={() => {}}
                    label="Email"
                    error=""
                />
                <Checkbox
                    label="Subscribe to blah blah blah"
                    onErrorChange={() => {}}
                    onChange={() => {}}
                    error="Required"
                    value="false"
                />
                <Checkbox
                    label="Subscribe to blah blah blah"
                    onErrorChange={() => {}}
                    onChange={() => {}}
                    value="false"
                    error=""
                />
            </div>
            <button>Actualizeaza cont</button>
        </div>
    );
}

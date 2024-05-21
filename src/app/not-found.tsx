import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="g:py-md">
            <h1 className="g:mb-sm">Pagina nu a fost gasita</h1>
            <p>
                Pagina pe care incerci sa o accesezi nu a fost gasita.{' '}
                <Link className="g:link" href="/">
                    Apasa aici pentru a te intoarce la pagina principala
                </Link>
            </p>
        </div>
    );
}

'use client';

import styles from './formbutton.module.css';
import { Prompt } from 'next/font/google';
import { useFormStatus } from 'react-dom';
import { Spinner } from '../Spinner';

const prompt = Prompt({
    weight: ['600'],
    subsets: ['latin'],
    display: 'swap'
})

export const FormButton = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button
            className={`${prompt.className} ${styles.button}`}
        >
            {pending ? <Spinner /> : <>{children}</>}
        </button>
    )
}
'use client';
import styles from './searchbar.module.css';
import { Prompt } from 'next/font/google';
import { useRouter } from 'next/navigation';

const prompt = Prompt({
    weight: ['400', '600'],
    subsets: ['latin'],
    display: 'swap',
});

export default function Searchbar({ }) {
    const router = useRouter();

    const searchSubmit = e => {
        e.preventDefault();
        const q = e.target.q.value;
        router.push(`/?q=${q}`);
    }

    return <form
        className={styles.form}
        onSubmit={searchSubmit}
    >
        <input
            name='q' // name to be displayed in the query string of the URL
            type="text"
            placeholder="Digite o que você procura"
            className={`${styles.input} ${prompt.className}`}
        />
        <button className={`${styles.button} ${prompt.className}`} >Buscar</button>
    </form>
}
'use client';
import styles from './searchbar.module.css';
import { Prompt } from 'next/font/google';

const prompt = Prompt({
    weight: ['400', '600'],
    subsets: ['latin'],
    display: 'swap',
});

export default function Searchbar({ }) {
    const searchSubmit = e => {
        e.preventDefault();
    }

    return <form className={styles.form} onSubmit={searchSubmit}>
        <input 
            type="text" 
            placeholder="Digite o que você procura" 
            className={`${styles.input} ${prompt.className}`} 
        />
        <button className={`${styles.button} ${prompt.className}`} >Buscar</button>
    </form>
}
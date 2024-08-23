'use client'; // error components MUST BE client components
import { useEffect } from "react";
import errorImg from './assets/500.png';
import Image from "next/image";
import Link from "next/link";
import { ArrowBack } from "@/components/ArrowBack";
import styles from './error.module.css';

export default function Error({ error }) {
    useEffect(() => {
        // winston logger will not work on the client side
        console.log(`Erro na página inicial: ${error}`);
    }, [error]);

    return (
        <div className={styles.container}>
            <Image src={errorImg} alt="Um robô pensativo com a mão no queixo." width={656} />
            <h2 className={styles.title}>Opa! Um erro ocorreu.</h2>
            <p className={styles.content}>Não conseguimos carregar a página, volte para seguir navegando.</p>
            <Link href={'/'} className={styles.link}>Voltar ao feed<ArrowBack color="#BFFFC3" /></Link>
        </div>
    )
}
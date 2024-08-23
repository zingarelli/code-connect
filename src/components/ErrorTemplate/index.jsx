import Image from 'next/image';
import { ArrowBack } from '../ArrowBack';
import styles from './errortemplate.module.css';
import Link from 'next/link';

export default function ErrorTemplate({ imgSrc, imgAlt, title, content }) {
    return (
        <div className={styles.container}>
            <Image src={imgSrc} alt={imgAlt} width={656} />
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
            <Link href={'/'} className={styles.link}>Voltar ao feed<ArrowBack color="#BFFFC3" /></Link>
        </div>
    )
}
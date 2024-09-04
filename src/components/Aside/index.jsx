import styles from './aside.module.css';
import logo from './logo.png';
import Image from 'next/image';
import Link from 'next/link';

export const Aside = () => {
    return (<aside className={styles.aside}>
        <Link href='/'>
            <Image src={logo} alt='Logo do Code Connect' />
        </Link>
    </aside>)
}
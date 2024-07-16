import Image from 'next/image';
import styles from './aside.module.css';
import logo from './logo.png';

export const Aside = () => {
    return (<aside className={styles.aside}>
        {/* <img src="/logo.png" alt="Logo do Code Connect" /> */}
        <Image src={logo} alt="Logo do Code Connect" />
    </aside>)
}
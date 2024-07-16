import styles from './avatar.module.css';
import Image from "next/image";

export const Avatar = ({ username, imageSrc }) => {
    return (
        <ul className={styles.list}>
            <li className={styles.avatar}>
                <Image
                    src={imageSrc}
                    width={32}
                    height={32}
                    alt={`Avatar para ${username}`}
                />
            </li>
            <li className={styles.username}>
                @{username}
            </li>
        </ul>
    )
}
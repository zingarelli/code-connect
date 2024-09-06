import styles from "./comment.module.css";

import Image from "next/image";

export const Comment = ({ comment }) => {
    return (
        <div className={styles.comment}>
            <Image 
                src={comment.author.avatar}
                width={32}
                height={32}
                alt={`Avatar da pessoa ${comment.author.name}`}
            />
            <strong className={styles.author}>@{comment.author.username}</strong>
            <p>{comment.text}</p>
        </div>
    );
}
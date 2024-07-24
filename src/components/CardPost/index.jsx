import styles from './cardpost.module.css';
import Image from "next/image";
import { Avatar } from "../Avatar";
import Link from 'next/link';

export const CardPost = ({ post }) => {
    return (
        <Link href={`posts/${post.slug}`} className={styles.link}>
            <article className={styles.container}>
                <header className={styles.header}>
                    <figure className={styles.headerFigure}>
                        <Image
                            src={post.cover}
                            width={438}
                            height={133}
                            alt={`Capa do post ${post.title}`}
                            className={styles.headerImg}
                        />
                    </figure>
                </header>
                <div className={styles.body}>
                    <section className={styles.section}>
                        <h2 className={styles.title}>
                            {post.title}
                        </h2>
                        <p className={styles.content}>{post.body}</p>
                        <p className={styles.innerLink} >Ver detalhes</p>
                    </section>
                    <footer>
                        <Avatar
                            imageSrc={post.author.avatar}
                            username={post.author.username}
                        />
                    </footer>
                </div>
            </article>
        </Link>
    );
}
import styles from './cardpost.module.css';
import Image from "next/image";
import { Avatar } from "../Avatar";
import Link from 'next/link';
import { incrementThumbsUp } from '@/actions';
import { ThumbsUpButton } from './ThumbsUpButton';

export const CardPost = ({ post }) => {
    // we can use bind to pass additional arguments to a Server Action
    const submitThumbsUp = incrementThumbsUp.bind(null, post);
    
    return (
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
                    <Link href={`posts/${post.slug}`} className={styles.innerLink} >
                        Ver detalhes
                    </Link>
                </section>
                <footer className={styles.footer}>
                    <form action={submitThumbsUp}>
                        <ThumbsUpButton />
                        <p>{post.likes}</p>
                    </form>
                    <Avatar
                        imageSrc={post.author.avatar}
                        username={post.author.username}
                    />
                </footer>
            </div>
        </article>
    );
}
import styles from './cardpost.module.css';
import Image from "next/image";
import { Avatar } from "../Avatar";
import Link from 'next/link';
import { incrementThumbsUp, postComment } from '@/actions';
import { ThumbsUpButton } from './ThumbsUpButton';
import { ModalComment } from '../ModalComment';

// use highlight to display a single post in a page
export const CardPost = ({ post, highlight = false }) => {
    // we can use bind to pass additional arguments to a Server Action
    const submitThumbsUp = incrementThumbsUp.bind(null, post);
    const submitComment = postComment.bind(null, post);

    return (
        <article className={styles.container} style={{ width: highlight ? 993 : 486 }}>
            <header className={styles.header}>
                <figure className={styles.headerFigure}>
                    <Image
                        src={post.cover}
                        width={highlight ? 960 : 438}
                        height={highlight ? 300 : 133}
                        alt={`Capa do post ${post.title}`}
                        className={styles.headerImg}
                    />
                </figure>
            </header>
            <section className={styles.post}>
                <div className={styles.body}>
                    <h2 className={styles.title}>
                        {post.title}
                    </h2>
                    <p className={styles.content}>{post.body}</p>
                    {!highlight &&
                        <Link href={`posts/${post.slug}`} className={styles.innerLink} >
                            Ver detalhes
                        </Link>
                    }
                </div>
                <footer className={styles.footer}>
                    <div className={styles.actions}>
                        <form action={submitThumbsUp}>
                            <ThumbsUpButton />
                            <p>{post.likes}</p>
                        </form>
                        <div>
                            <ModalComment action={submitComment} />
                            <p>{post.comments.length}</p>
                        </div>
                    </div>
                    <Avatar
                        imageSrc={post.author.avatar}
                        username={post.author.username}
                    />
                </footer>
            </section>
        </article>
    );
}
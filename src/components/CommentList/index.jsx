import styles from "./commentlist.module.css";
import { Comment } from "../Comment";
import { Replies } from "../Replies";
import { ModalReply } from "../ModalReply";

export const CommentList = ({ comments }) => {
    return (<>
        {
            comments.length > 0 && <section className={styles.section}>
                <h2 className={styles.title}>Comentários</h2>
                <ul className={styles.list}>
                    {comments.map(item => <li key={item.id} className={styles.item}>
                        <Comment comment={item} />
                        <ModalReply comment={item} />
                        <Replies comment={item} />
                    </li>)}
                </ul>
            </section>
        }
    </>);
}
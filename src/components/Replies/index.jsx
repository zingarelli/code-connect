'use client';

import { Comment } from "../Comment";
import { ModalReply } from "../ModalReply";
import styles from "./replies.module.css";
import { useEffect, useState } from "react";

export const Replies = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchReplies = async () => {
            const response = await fetch(`/api/comment/${comment.id}/replies`);
            const data = await response.json();
            setReplies(data);
        }

        if (showReplies) fetchReplies();

    }, [showReplies])

    return (<>
        <button
            className={styles.button}
            onClick={() => setShowReplies(!showReplies)}
        >
            {showReplies ? 'Ocultar' : 'Ver'} respostas
        </button>
        {
            showReplies && <ul className={styles.list}>
                {replies.map(reply => <li key={reply.id}>
                    <Comment comment={reply} />
                    <ModalReply comment={reply} />
                </li>)}
            </ul>
        }
    </>)
}
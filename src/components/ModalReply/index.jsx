'use client';

import styles from './modalreply.module.css';
import { useRef } from "react";
import { Modal } from "../Modal";
import { Prompt } from "next/font/google";
import Image from 'next/image';
import { FormButton } from '../FormButton';
import { ArrowFoward } from '../icons/ArrowForward';
import { postReply } from '@/actions';

const prompt = Prompt({
    weight: ['600'],
    subsets: ['latin'],
    display: 'swap',
});

export const ModalReply = ({ comment }) => {
    const modalRef = useRef();
    const submitReply = postReply.bind(null, comment);

    return (<>
        <Modal ref={modalRef}>
            <div className={styles.wrapper}>
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
                <span className={styles.line}></span>
                <form
                    action={submitReply}
                    className={styles.form}
                    onSubmit={() => modalRef.current.closeModal()}
                >
                    <textarea
                        required
                        name="text"
                        className={`${prompt.className} ${styles.text}`}
                    >
                    </textarea>
                    <FormButton>Responder <ArrowFoward /></FormButton>
                </form>
            </div>
        </Modal>
        <button
            className={`${prompt.className} ${styles.button}`}
            onClick={() => modalRef.current.openModal()}
        >
            Responder
        </button>
    </>)
}
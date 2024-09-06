'use client';

import styles from "./modalcomment.module.css";
import { useRef } from "react";
import { IconButton } from "../IconButton";
import { Chat } from "../icons/Chat";
import { Modal } from "../Modal";
import { FormButton } from "../FormButton";
import { ArrowFoward } from "../icons/ArrowForward";
import { Prompt } from "next/font/google";

const prompt = Prompt({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
});

export const ModalComment = ({ action }) => {
    const modalRef = useRef();

    return <>
        <Modal ref={modalRef}>
            <h2 className={styles.title}>Deixe seu comentário sobre o post:</h2>
            <form
                action={action}
                className={styles.form}
                onSubmit={() => modalRef.current.closeModal()}
            >
                <textarea
                    required
                    name="text"
                    className={`${prompt.className} ${styles.text}`}
                    placeholder='Digite seu comentário'>
                </textarea>
                <FormButton>Comentar <ArrowFoward color="#132E35" /></FormButton>
            </form>
        </Modal>
        <IconButton onClick={() => modalRef.current.openModal()}>
            <Chat />
        </IconButton>
    </>
}
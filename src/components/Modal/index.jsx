// client component to handle user interaction
'use client';

import styles from './modal.module.css';
import { forwardRef, useImperativeHandle, useRef } from "react";

// template for a modal, exposing close and open 
// modal functions to parent
export const Modal = forwardRef(({ children }, ref) => {
    // we will reference the modal internally and only expose
    // to parent the open and close functions
    const dialogRef = useRef();
    
    // using built-in methods of the dialog element
    const openModal = () => dialogRef.current.showModal();
    const closeModal = () => dialogRef.current.close();

    // exposing functions to parent component using the ref 
    // received in props
    useImperativeHandle(ref, () => {
        return { openModal, closeModal }
    })

    // parent will NOT have access to dialog element
    return <dialog ref={dialogRef} className={styles.dialog}>
        <header className={styles.header}>
            <button className={styles.closeBtn} onClick={closeModal}>X</button>
        </header>
        {children}
    </dialog>
});
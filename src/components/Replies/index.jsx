'use client';

import styles from "./replies.module.css";
import { useState } from "react";

export const Replies = () => {
    const [showReplies, setShowReplies] = useState(false);
    
    return (
        <button 
            className={styles.button}
            onClick={() => setShowReplies(!showReplies)}
        >
            {showReplies ? 'Ver' : 'Ocultar'} respostas
        </button>
    )
}
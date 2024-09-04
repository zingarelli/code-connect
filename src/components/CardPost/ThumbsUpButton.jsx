'use client';

import { IconButton } from "../IconButton"
import { ThumbsUp } from "../icons/ThumbsUp"
import { useFormStatus } from "react-dom"
import { Spinner } from "../Spinner";

export const ThumbsUpButton = () => {
    const { pending } = useFormStatus();
    return <IconButton disabled={pending}>
        {pending ? <Spinner /> : <ThumbsUp />}
    </IconButton>
}
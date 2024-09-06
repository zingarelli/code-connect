// explicit tell Next that this file is to run in the server
'use server';

import { revalidatePath } from "next/cache";
import db from "../../prisma/db";

// server action to increment the number of likes for a post
export async function incrementThumbsUp(post) {
    await db.post.update({
        where: {
            id: post.id
        },
        data: {
            // we can pass an object with an "increment" property
            // to let Prisma increment the current value of a field 
            // by a value of X (increment likes by 1 in this case)
            likes: {
                increment: 1
            }
        }
    });

    // clear cache to update the UI of pages affected by this action
    revalidatePath('/');
    revalidatePath(`/${post.slug}`);
}

// add a comment to a post
// for now, we will hard-code the author of the comment with
// the user created in /prisma/seed.js
// the object formData is automatically injected by Next as the last
// argument of a server action, when invoked in a form. It contains 
// data from this form, in which the attribute "name" of each input 
// element is passed as properties to the formData object.
export async function postComment(post, formData) {
    const author = await db.user.findFirst({
        where: {
            username: 'anabeatriz_dev'
        }
    });

    await db.comment.create({
        data: {
            text: formData.get('text'),
            authorId: author.id,
            postId: post.id
        }
    });

    // clear cache to update the UI of pages affected by this action
    revalidatePath('/');
    revalidatePath(`/${post.slug}`);
}
// explicit tell Next that this file is to run in the server
'use server';

import { revalidatePath } from "next/cache";
import db from "../../prisma/db";

// server action to increment the number of likes for a post
export async function incrementThumbsUp(post){
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
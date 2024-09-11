import db from "../../../../../../prisma/db"

// we use underline to indicate that the request parameter will not be used
export const GET = async (_request, { params }) => {
    const replies = await db.comment.findMany({
        where: {
            parentId: parseInt(params.id)
        },
        include: {
            author: true
        }
    });

    return Response.json(replies);
}
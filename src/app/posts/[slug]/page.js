import styles from "./page.module.css";
import logger from "@/logger";
import { remark } from "remark";
import html from "remark-html";
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";
import { CardPost } from "@/components/CardPost";
import { CommentList } from "@/components/CommentList";

const markdownToHtml = async (data) => {
    const processedContent = await remark()
        .use(html) // html plugin for remark
        .process(data) // markdown data
    return processedContent.toString();
}

const getPostBySlug = async (slug) => {
    try {
        const post = await db.post.findFirst({
            where: {
                slug
            },
            include: {
                author: true, // author of the post
                // nested relationships
                comments: {
                    include: {
                        author: true // author of a comment
                    }
                }
            }
        });

        if (!post) {
            throw new Error(`Não foi encontrado post para o slug ${slug}`);
        }

        logger.info(`[${new Date().toString()}] Função getPostBySlug --> post obtido com sucesso para o slug ${slug}`);

        post.markdown = await markdownToHtml(post.markdown);

        return post;
    }
    catch (error) {
        logger.error(`[${new Date().toString()}] Função getPostBySlug --> erro ao obter o post na API para o slug ${slug}. Mensagem de erro: ${error.message}`);
    }

    // redirect to 404 page if an error happened
    redirect('/not-found');
}

const PagePost = async ({ params }) => {
    const post = await getPostBySlug(params.slug);

    return (<>
        <CardPost post={post} highlight />
        <section className={styles.code}>
            <h2 className={styles.codeTitle}>Código:</h2>
            <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </section>
        <CommentList comments={post.comments} />
    </>);
}
export default PagePost;
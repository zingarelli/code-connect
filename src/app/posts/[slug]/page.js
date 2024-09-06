import styles from "./page.module.css";
import { Avatar } from "@/components/Avatar";
import logger from "@/logger";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";
import { CardPost } from "@/components/CardPost";

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
                author: true,
                comments: true
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
    </>);
}
export default PagePost;
import styles from "./page.module.css";
import { Avatar } from "@/components/Avatar";
import logger from "@/logger";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";

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
                author: true
            }
        });

        if(!post) {
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

    return (<article className={styles.article}>
        <header className={styles.header}>
            <figure className={styles.headerFigure}>
                <Image
                    src={post.cover}
                    // fill
                    width={960}
                    height={300}
                    alt={`Capa do post ${post.title}`}
                    className={styles.headerImg}
                />
            </figure>
        </header>
        <section className={styles.body}>
            <h2 className={styles.title}>
                {post.title}
            </h2>
            <p className={styles.content}>{post.body}</p>
            <footer>
                <Avatar
                    imageSrc={post.author.avatar}
                    username={post.author.username}
                />
            </footer>
        </section>
        <section className={styles.code}>
            <h2 className={styles.codeTitle}>Código:</h2>
            <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </section>
    </article>
    );
}
export default PagePost;
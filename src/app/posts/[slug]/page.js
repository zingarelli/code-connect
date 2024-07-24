import styles from "./page.module.css";
import { Avatar } from "@/components/Avatar";
import logger from "@/logger";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";

const markdownToHtml = async (data) => {
    const processedContent = await remark()
        .use(html) // html plugin for remark
        .process(data) // markdown data
    return processedContent.toString();
}

const getPostBySlug = async (slug) => {
    const url = `http://localhost:3042/posts/?slug=${slug}`;
    const resp = await fetch(url)
        .catch(error => {
            logger.error(`Função getPostBySlug --> erro de conexão com a API: ${error.message}`);
            return null; // this return is assigned to the variable "resp"
        });

    if (!resp || !resp.ok) {
        logger.error(`Função getPostBySlug --> erro ao obter o post na API para o slug ${slug}`);
        return {};
    }

    const data = await resp.json();
    if (data.length === 0) {
        logger.error(`Função getPostBySlug --> nenhum post obtido para o slug ${slug}`);
        return {};
    }

    logger.info(`Função getPostBySlug --> post obtido com sucesso para o slug ${slug}`);

    // retrieve only the first post (case more than one is retrieved)
    const post = data[0];
    post.markdown = await markdownToHtml(post.markdown);

    return post;
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
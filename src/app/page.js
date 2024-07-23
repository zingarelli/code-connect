import styles from './page.module.css';
import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import Link from 'next/link';

const ITEMS_PER_PAGE = 2;

// server-side fetch
const getAllPosts = async (page) => {
  const resp = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=${ITEMS_PER_PAGE}`)
    .catch(error => {
      logger.error(`Função getAllPosts --> erro de conexão com a API: ${error.message}`);
      return null;
    });
  if (!resp || !resp.ok) {
    // this console.log will be displayed in the TERMINAL
    // because this is a server-side component
    // console.log('Função getAllPosts --> erro ao obter as postagens da API');

    // using winston for logging
    logger.error('Função getAllPosts --> erro ao obter as postagens da API');
    return [];
  }
  logger.info('Função getAllPosts --> posts obtidos com sucesso');
  return resp.json();
}

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  // destructuring JSON Server response when paginating
  const { data: posts, prev, next } = await getAllPosts(currentPage);
  return (
    <main>
      <div className={styles.posts}>
        {posts.map(post => <CardPost post={post} key={post.id} />)}
      </div>
      <div className={styles.pagination}>
        {prev && <Link className={styles.navLink} href={`/?page=${prev}`}>
          Página anterior
        </Link>}
        {next && <Link className={styles.navLink} href={`/?page=${next}`}>
          Próxima página
        </Link>}
      </div>
    </main>
  );
}

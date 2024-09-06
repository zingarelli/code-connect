import styles from './page.module.css';
import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import Link from 'next/link';
import db from '../../prisma/db';
import { Modal } from '@/components/Modal';

const ITEMS_PER_PAGE = 4;

// server-side fetch using Prisma client
// page: number of the current page
// searchTerm: filter posts by title
const getAllPosts = async (page, searchTerm) => {
  try {
    const where = {};

    // filter posts by title
    if (searchTerm) {
      where.title = {
        contains: searchTerm, // WHERE title LIKE %searchTerm%
        mode: 'insensitive' // ignore case ("A" and "a" will be considered the same)
      }
    }

    // logic for previous page
    const prev = page > 1 ? page - 1 : null;

    // logic for next page, based on the number of items in the database
    const totalItems = await db.post.count({ where }); // SELECT count(*) FROM post WHERE
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const next = page < totalPages ? page + 1 : null;

    // logic to get the items for the next page
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // similar to a SELECT * FROM post
    const posts = await db.post.findMany({
      where,
      // use include property to also return data of another table
      // when there's a relationship between them (similar to a JOIN)
      include: {
        author: true,
        comments: true
      },
      // pagination
      take: ITEMS_PER_PAGE,
      skip,
      // sorting 
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc'}
      ]
    });
    return { data: posts, prev, next };
  }
  catch (error) {
    logger.error(`[${new Date().toString()}] Função getAllPosts --> erro de conexão com a API: ${error}`);
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  // URL parameters are returned as strings
  const currentPage = parseInt(searchParams?.page || 1);

  // for when a user search posts by a title
  const searchTerm = searchParams?.q;

  // destructuring JSON Server response when paginating
  const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm);
  return (
    <main>
      <Modal />
      <div className={styles.posts}>
        {posts.map(post => <CardPost post={post} key={post.id} />)}
      </div>
      <div className={styles.pagination}>
        {prev && <Link
          className={styles.navLink}
          // same as `/?page=${prev}&q=${searchTerm}`
          href={{
            pathname: '/',
            query: {
              page: prev,
              q: searchTerm
            }
          }}
        >
          Página anterior
        </Link>}
        {next && <Link
          className={styles.navLink}
          href={{
            pathname: '/',
            query: {
              page: next,
              q: searchTerm
            }
          }}
        >
          Próxima página
        </Link>}
      </div>
    </main>
  );
}

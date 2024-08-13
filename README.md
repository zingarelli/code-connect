# Este README está em construção

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Versão inicial com JSON Server

A primeira versão do projeto utiliza um back end mockado por meio do JSON Server. Dê uma olhada na [Seção sobre a versão FullStack](#versão-fullstack) para saber mais sobre as tecnologias utilizadas na evolução deste projeto.

> A versão inicial que se encontra na **branch main**.

Para isso, crie uma pasta foram da pasta da aplicação e salve [este arquivo JSON](https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts.json) nesta pasta. O arquivo servirá como o banco de dados de postagens a serem exibidas na aplicação. 

Na linha de comando, navegue até a pasta criada e faça a instalação local do JSON Server na versão específica:

    npm i json-server@1.0.0-alpha.22

Para rodar o servidor com o arquivo baixado e na porta 3042 (você pode escolher a porta que quiser):

    npx json-server posts.json -p 3042

Você pode consultar a resposta da API na URL: `http://localhost:3042/posts`. Ela irá retornar um array de objetos.

### Trabalhando com paginação

O JSON Server oferece uma solução de paginação utilizando dois parâmetros (a query string da URL): `_page` e `_per_page`. Exemplo:

    http://localhost:3042/posts?_page=2&_per_page=2

Quando se trabalha com paginação, a resposta da API é diferente, trazendo um objeto ao invés de um array de objetos post.

```json
{
    "first": 1,
    "prev": 1,
    "next": 2,
    "last": 6,
    "pages": 6,
    "items": 12,
    "data": [{}]
}
```

Agora os dados de post estão na propriedade `data`, com os items baseados no que foi passado em `page` e `per_page`. 

As propriedades `prev` e `next` podem nos ajudar a navegar pelas páginas e obter os dados correspondentes.

Exemplo de código utilizando paginação para exibir os dados:

```jsx
export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  const { data: posts, prev, next } = await getAllPosts(currentPage);
  return (
    <main className={styles.posts}>
      {posts.map(post => <CardPost post={post} key={post.id} />)}
      {prev && <Link href={`/?page=${prev}`}>Página anterior</Link>}
      {next && <Link href={`/?page=${next}`}>Próxima página</Link>}
    </main>
  );
}
```

A prop `searchParams` é fornecida pelo Next para acessarmos as query string da URL da página. O acesso é feito como se fosse um objeto.

## Versão FullStack

A segunda versão do projeto utiliza o [Docker Compose](https://docs.docker.com/compose/) para subir um banco de dados Postgres (versão 15). Para interação com este banco por meio do Next, utilizamos o ORM [Prisma](https://www.prisma.io/).

> A versão FullStack se encontra na **branch postgres_prisma**.

### Docker Compose

A configuração para subir o contêiner com o serviço do Postgres está no arquivo `docker-compose.yaml`. Utilizamos o comando `docker compose up -d` para baixar os arquivos necessários e criar o contêiner.

### Prisma 

O Prisma é um [ORM (Object Relational Mapper)](https://www.prisma.io/dataguide/types/relational/what-is-an-orm). Isso significa que ele atua, no caso do projeto, como um intermediador entre as linguagens SQL e JavaScript. Assim, podemos focar nas estruturas e códigos no Next, criando tabelas e consultas utilizando objetos em JS, e deixar que o Prisma se responsabilize por se comunicar com o banco de dados e "traduzir" em SQL aquilo que queremos. 

Para adicionar o Prisma ao projeto, usamos o comando `npm i prisma`.

Para criar os arquivos iniciais para utilização do Prisma, o comando é `npx prisma init`. Caso ele ainda não esteja instalado na máquina, este comando também irá fazer a instalação. 

Iniciado o Prisma, uma pasta `prisma` será criada no projeto com um arquivo `schema.prisma`. Neste arquivo definimos qual SGBD será utilizado e também criamos os objetos que representarão as tabelas e seus relacionamentos. 

Também será criado um arquivo `.env`, onde são definidas variáveis de ambiente. O prisma irá consultar esse arquivo para obter as credenciais de conexão ao banco.

> O arquivo `.env` contém dados sensíveis de acesso ao projeto, então **não o versione** nem o compartilhe em ambiente de produção.

#### Criação do banco de dados

Supondo que vamos criar o banco do zero, definimos as tabelas e relacionamentos no arquivo `schema.prisma` e rodamos o comando abaixo para efetuar a chamada "migração" (*migration*). Esta é a ação que irá criar de fato o banco de dados e suas tabelas no Postgres.

    npx prisma migrate dev --name init

- `dev` indica que estamos em um ambiente de desenvolvimento

- `--name init` é a forma de darmos um nome a essa migração, de modo a facilitar identificá-la quando houver outras migrações. Você pode escolher o nome que quiser.

- a pasta `prisma/migrations` contém pastas com os arquivos SQL criados pelo Prisma.

Exemplo de como criar tabelas (models) no `schema.prisma`, incluindo chaves primárias e estrangeira, e relacionamentos:

```js
// @id indicates this property as primary key
// @default is a default value; in this case, it will use the autoincrement function to generate an integer
// @unique indicates that the value cannot be repeated between records (rows)
// Post Post[] indicates a 1:N relationship between User and Post
model User {
  id Int @id @default(autoincrement())
  name String
  username String @unique
  avatar String
  Post Post[]
}

// @updatedAt automatically updates the time when a record is updated
// @relation configures foreign keys to indicate a connection between tables
model Post {
  id Int @id @default(autoincrement())
  cover String
  title String
  slug String @unique
  body String
  markdown String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId Int
  author User @relation(fields: [authorId], references: [id])
}
```

## Monitoramento de logs usando o winston

O "winston" é uma biblioteca especializada em criar diferentes tipos de logs para uma aplicação.

O [repositório do projeto](https://github.com/winstonjs/winston) no GitHub possui exemplos e a documentação.

Criando um logger:

```js
import { createLogger, format, transports } from 'winston';
const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
});
export default logger;
```

O winston trabalha com níveis de log: error, warn, info, http, verbose, debug, silly. O nível "error" é o mais severo e importante (valor 0) e o "silly" é o menos importante (valor 6). Quando informado o nível no `createLogger` (`level`), ele só irá criar logs daquele nível para baixo.

A propriedade `transports` são os arquivos que serão usados para registrar os logs. Quando informado o `level`, o transport correspondente irá registrar somente os logs daquele nível para baixo.

Você **precisa criar os arquivos** em que os logs serão gravados. Eles devem ser criados na raiz do projeto com o nome que você definiu para cada um no código.

Exemplo de uso:

```jsx
import logger from "@/logger";

const getAllPosts = async () => {
  const resp = await fetch('http://localhost:3042/posts');
  if (!resp.ok) {
    // using winston for logging
    logger.error('Função getAllPosts --> erro ao obter as postagens da API');
    return [];
  }
  logger.info('Função getAllPosts --> posts obtidos com sucesso');
  return resp.json();
}
```

## Exibição de markdown usando remark

O Code Connect exibe postagens de tecnologia e, dentre o conteúdo em cada postagem, há uma seção que exibe códigos. Esses códigos são escritos em formato markdown.

O [`remark`](https://github.com/remarkjs/remark) é uma biblioteca sugerida pelo Next para renderizar conteúdo markdown. Ele possui um plugin `remark-html` para conversão do conteúdo markdown para HTML.

Instalação:

    npm i remark remark-html

Exemplo de uso convertendo um conteúdo markdown para HTML:

```jsx
// -- app/posts/[slug]/page.js
import { remark } from "remark";
import html from "remark-html";

const markdownToHtml = async (data) => {
    const processedContent = await remark()
        .use(html) // html plugin for remark
        .process(data) // markdown data
    return processedContent.toString();
}

const getPostBySlug = async (slug) => {
    // code omitted
    // assume data is an array of objects 
    // retrieved from the API
    const post = data[0];
    post.markdown = await markdownToHtml(post.markdown);
    return post;
}

const PagePost = async ({ params }) => {
    const post = await getPostBySlug(params.slug);

    return (
        <div dangerouslySetInnerHTML={{ __html: post.markdown }} />   
    );
}
export default PagePost;
```
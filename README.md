# Code Connect

Uma rede social para Devs. Projeto em andamento, desenvolvido em Next.js versão 14. Atualmente, uma lista de posts é exibida, sendo possível clicar em um post para ver o conteúdo completo. Há também um mecanismo de busca por título de um post.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Code Connect**
| :label: Tecnologias | Next, Prisma
| :rocket: URL         | https://code-connect-eosin.vercel.app
| :fire: Curso     | https://www.alura.com.br/formacao-next-js-14-aplicacoes-robustas-alta-produtividade

![](https://github.com/user-attachments/assets/e1d1e74d-119b-4614-a8d7-0e9272a8ace8#vitrinedev)

## Créditos 

Este projeto é resultado dos cursos da Alura para a formação [Next.js 14: desenvolvendo aplicações robustas com alta produtividade](https://www.alura.com.br/formacao-next-js-14-aplicacoes-robustas-alta-produtividade), ministrados pela [Patrícia Silva](https://github.com/gss-patricia) e pelo [Vinicios Neves](https://www.linkedin.com/in/vinny-neves/).

## Detalhes do projeto

Este é meu primeiro projeto FullStack trabalhando com Next. Ele é o resultado dos cursos introdutórios em que eu aprendi Next e tecnologias associadas. 

Atualmente, o Code Connect consiste em **duas telas: Home e Post**.

A tela Home é a página inicial, que exibe todos os posts cadastrados na base de dados, utilizando de paginação para exibir somente 4 posts por página, como pode ser visto na captura de tela abaixo:

![captura de tela da página inicial do Code Connect exibindo uma barra lateral com a logo, uma barra de pesquisa no topo e uma seção exibindo quatro posts, cada um com uma imagem, título, descrição, link para ver mais detalhes e o nome da autora. No final da página há um link para exibir os próximos posts](https://github.com/user-attachments/assets/e7871720-5d43-4902-af04-2eea89b0522b)

Quando a pessoal clica em um post, é redirecionada para a tela de Post, exibe o conteúdo da postagem, incluindo uma imagem, título e conteúdo do post. Há também uma seção para exibir código em formato markdown - isso é feito com a biblioteca remark e você pode ver mais detalhes sobre ela [nessa Seção](#exibição-de-markdown-usando-remark). Segue uma captura de tela de exibição de um post: 

![captura de tela da postagem cujo título é "Otimização de Performance no React"](https://github.com/user-attachments/assets/2538ec61-e44e-40ff-a91c-dafd27e30970)

Além das duas telas, há uma **funcionalidade de busca por post**, por meio de uma barra de pesquisa que fica no topo das telas. Ao digitar algum termo, a tela exibe posts que tenham o conteúdo da busca no título.

### Evoluções tecnológicas

O projeto está **em evolução**, com novas tecnologias e soluções sendo adicionadas a cada atualização. Para isso, cada evolução se encontra em branches separadas. 

A **branch main** contém a versão inicial do projeto, que utiliza um Back End mockado pelo JSON Server.

A **branch postgres_prisma** fornece uma solução FullStack completa, com Front e Back End. Nela, criamos um contêiner no Docker para subir um banco Postgres, e utilizamos o Prisma para popular o banco e fazer as consultas. Por fim, é feito o deploy na Vercel, e o projeto pode ser visto [neste link](https://code-connect-eosin.vercel.app). 

Informações sobre cada tecnologia utilizada podem ser vistas na [Seção Detalhes Técnicos](#detalhes-técnicos).

## Instalação

O projeto foi desenvolvido em [Next.js](https://nextjs.org/) utlizando o [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Após cloná-lo ou baixá-lo, abra um terminal, navegue até a pasta do projeto e rode o comando abaixo para instalar as dependências necessárias.

    npm install

Feito isso, o app pode ser iniciado em modo de desenvolvimento com o seguinte comando:

    npm run dev

O app irá rodar na URL [http://localhost:3000](http://localhost:3000).

Detalhes sobre como fazer o deploy na [Vercel](https://vercel.com/) podem ser vistos [nesta Seção](#deploy-fullstack-na-vercel).

## Detalhes Técnicos

### Versão inicial com JSON Server

> A versão inicial que se encontra na **branch main**.

A primeira versão do projeto utiliza um back end mockado por meio do [JSON Server](https://www.npmjs.com/package/json-server). 

Para poder rodá-lo localmente, crie uma pasta fora da pasta da aplicação e salve nela [este arquivo JSON](https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts.json). O arquivo servirá como o banco de dados de postagens a serem exibidas na aplicação. 

Na linha de comando, navegue até a pasta criada e faça a instalação local do JSON Server na versão específica:

    npm i json-server@1.0.0-alpha.22

O comando abaixo irá rodar o servidor com o arquivo baixado e na porta 3042 (você pode escolher a porta que quiser):

    npx json-server posts.json -p 3042

Você pode consultar a resposta da API na URL: [http://localhost:3042/posts](http://localhost:3042/posts). Ela irá retornar um array de objetos.

#### Trabalhando com paginação

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

A prop **`searchParams`** é fornecida pelo Next para acessarmos os parâmetros contidos na query string da URL da página. O acesso é feito como se fosse um objeto.

### Versão FullStack

> A versão FullStack se encontra na **branch postgres_prisma**.

A segunda versão do projeto utiliza o [Docker Compose](https://docs.docker.com/compose/) para subir um banco de dados Postgres (versão 15). Para interação com este banco por meio do Next, utilizamos o ORM [Prisma](https://www.prisma.io/).


#### Docker Compose

A configuração para subir o contêiner com o serviço do Postgres está no arquivo `docker-compose.yaml`. Utilizamos o comando `docker compose up -d` para baixar os arquivos necessários e criar o contêiner.

No caso de reiniciar o contêiner (por exemplo, se a máquina foi reiniciada e o Docker Desktop também tenha sido reiniciado), você poder usar o comando `docker compose start`.

#### Prisma 

O Prisma é um [ORM (Object Relational Mapper)](https://www.prisma.io/dataguide/types/relational/what-is-an-orm). Isso significa que ele atua, no caso do projeto, como um **intermediador entre as linguagens SQL e JavaScript** (ele também trabalha com outras linguagens). Assim, podemos focar nas estruturas e códigos no Next, criando tabelas e consultas utilizando objetos em JS, e deixar que o Prisma se responsabilize por se comunicar com o banco de dados e "traduzir" em SQL aquilo que queremos. 

- Para adicionar o Prisma ao projeto, usamos o comando `npm i prisma`.

- Para criar os arquivos iniciais para utilização do Prisma, o comando é `npx prisma init`. Caso ele ainda não esteja instalado na máquina, este comando também irá fazer a instalação. 

Iniciado o Prisma, uma pasta `prisma` será criada na raiz do projeto com um arquivo `schema.prisma`. Neste arquivo definimos qual SGBD será utilizado e também criamos os objetos que representarão as tabelas e seus relacionamentos (daí o nome *Object Relational Mapper*). 

Também será criado um arquivo `.env`, onde são definidas variáveis de ambiente. O Prisma irá consultar esse arquivo para obter as credenciais de conexão ao banco.

> O arquivo `.env` contém dados sensíveis de acesso ao projeto, então **não o versione** nem o compartilhe em ambiente de produção.

#### Criação do banco de dados

Supondo que vamos criar o banco do zero, definimos as tabelas e relacionamentos no arquivo `schema.prisma` e rodamos o comando abaixo para efetuar a chamada "migração" (*migration*). Esta é a ação que irá criar de fato o banco de dados e suas tabelas no Postgres.

    npx prisma migrate dev --name init

- `dev` indica que estamos em um ambiente de desenvolvimento;

- `--name init` é a forma de darmos um nome a essa migração, de modo a facilitar identificá-la quando houver outras migrações. Você pode escolher o nome que quiser;

- a pasta `prisma/migrations` contém pastas com os arquivos SQL criados pelo Prisma.

Exemplo de como criar tabelas (models) no `schema.prisma`, incluindo chaves primárias e estrangeira, e relacionamentos:

```prisma
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

#### Prisma Client

É uma classe disponibilizada pelo Prisma para fazer consultas e as demais operações de CRUD na base de dados, sem usar SQL. 

O client é criado pelo seguinte comando:

    npx prisma generate

Esse comando deve ser **utilizado toda vez que houver alguma mudança no banco** (alguma alteração no `schema.prisma`), para garantir que o client esteja atualizado com qualquer alteração dos modelos, tipos e relacionamentos.

Para disponibilizar o client para uso na aplicação, uma sugestão é criar um arquivo `db.js` na pasta prisma e exportar o client. 

```js
// --- prisma/db.js
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
export default db;
```

#### Seed de dados

> Link do Prisma sobre seeding, incluindo exemplos em JS e TS: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding.

Você pode usar o Prisma para popular (semear) o banco de dados. Para isso, criamos um comando `seed` no `package.json`, e usamos o comando `npx prisma db seed` para popular o banco.

O exemplo a seguir mostra como seria o comando incluído no `package.json`. O arquivo `prisma/seed.js` será executado pelo node e irá popular o banco de dados.

```json
{
  "prisma": {
    "seed": "node prisma/seed.js"
  }
}
```

O próximo exemplo mostra a inserção de um novo dado à tabela "Author":

```js
// --- prisma/seed.js
const { PrismaClient } = require('@prisma/client'); // neste caso, precisamos usar require
const prisma = new PrismaClient();

async function main() {
    // --- creating author "Ana Beatriz"
    const author = {
        name: "Ana Beatriz",
        username: "anabeatriz_dev",
        avatar: "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png",
    };

    // upsert will perform an insert or update in the database
    // based on a condition passed to the where property
    const ana = await prisma.user.upsert({
        where: { username: author.username },
        update: {}, // we won't perform any updates for now
        create: author
    });

    console.log('Author created: ', ana);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
```

#### Fetch de dados

Por meio do prisma client, podemos acessar as **tabelas** do banco (os models no `schema.prisma`) como se fossem **objetos do client**. Esses objetos possuem métodos para fazer consultas.

No exemplo a seguir, usamos o método **`findMany`** para recuperar os dados da tabela post. Essa tabela possui uma relação com a tabela author (uma chave estrangeira para o id do autor), então podemos passar via parâmetro um objeto de configuração com a propriedade `include` para também recuperar dados da tabela author. Além disso, também está implementada a lógica para paginação (utilizando as propriedades `take` e `skip`) e a ordenação pela data de criação do post (propriedade `orderBy`);

```js
import db from '../../prisma/db';

const ITEMS_PER_PAGE = 6;

// server-side fetch using Prisma client
const getAllPosts = async (page) => {
  try {
    // logic for previous page
    const prev = page > 1 ? page - 1 : null;

    // logic for next page, based on the number of items in the database
    const totalItems = await db.post.count(); // SELECT count(*) FROM post
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE); 
    const next = page < totalPages ? page + 1 : null;

    // logic to get the items for the next page
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // similar to SELECT * FROM post
    const posts = await db.post.findMany({
      // use include property to also return data of another table
      // when there's a relationship between them (similar to a JOIN)
      include: {
        author: true
      },
      // pagination
      take: ITEMS_PER_PAGE,
      skip,
      // sorting 
      orderBy: { createdAt: 'desc' }
    });
    return { data: posts, prev, next };
  }
  catch (error) {
    logger.error(`[${new Date().toString()}] Função getAllPosts --> erro de conexão com a API: ${error}`);
    return { data: [], prev: null, next: null };
  }
}
```

#### Deploy FullStack na Vercel

A Vercel possibilita criarmos um banco de dados e integrá-lo ao deploy da aplicação. Para isso, precisamos fazer alguns ajustes no projeto e também na Vercel.

Para o uso do Prisma, a Vercel solicita duas variáveis de ambiente, então precisamos alterar o `schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  // Uses connection pooling
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

Para manter o sincronismo com o projeto rodando localmente, adicionamos essas variáveis também ao `.env`:

```
POSTGRES_PRISMA_URL="postgresql://postgres@localhost:5432/codeconnect_dev"
POSTGRES_URL_NON_POOLING="postgresql://postgres@localhost:5432/codeconnect_dev"
```

Por fim, ajustamos o `package.json`, adicionando os passos do Prisma para o script de `build` (a Vercel irá chamar esse comando durante o deploy):

```json
{  
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma migrate dev && prisma db seed && next build",
    "start": "next start",
    "lint": "next lint"
  },
}
```

Na Vercel, precisamos adicionar um banco Postgres, disponibilizado pela plataforma. Para o caso deste projeto, a versão free (hobby) está disponível. 

- Acesse a página do projeto na Vercel;

- Vá até a aba "Storage";

- Clique no botão "Create" ao lado do item "Postgres";

- Use todas as opções padrão nas próximas janelas.

> A página do projeto na Vercel só aparece após o primeiro deploy. Então faça o primeiro deploy, que irá gerar um erro por não ter um banco de dados, e aí então crie um banco Postgres e faça um redeploy.

### Monitoramento de logs usando o winston

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

### Exibição de markdown usando remark

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

### Server Actions

Server Actions são funções assíncronas que você pode criar em seu projeto Next, e que podem ser invocadas tanto por client components quanto por server components. Essas funções são **executadas no lado do servidor**. 

Um exemplo comum é invocá-las na submissão de um formulário, usando o atributo `action` do elemento `form`. Um aspecto interessante do Next é que essa submissão **não** irá causar um recarregamento da página.

- Podemos passar argumentos para uma Server Action usando a função `bind`. Isso é necessário, pois a função está rodando no servidor, então temos que "emprestá-la" do servidor para o componente que vai invocá-la;

- Caso uma Server Action resulte em uma ação que atualiza algum campo da página, você pode usar a função `revalidatePath` para que o Next faça as alterações necessárias na UI (sem recarregar a página inteira).

- Server Actions também podem ser invocadas da maneira tradicional, por meio de eventos ou hooks como `useEffect`.

- Podemos utilizar o hook `useFormStatus` do React para verificar se uma ação está pendente. Isso é útil para exibirmos um ícone de carregamento enquanto a ação não termina, por exemplo.

  - até 2024, este hook se encontra [disponível de forma experimental](https://react.dev/reference/react-dom/hooks/useFormStatus) no React;

  - o hook só funciona se o componente for renderizado dentro de um elemento `form`;

  - o componente que utiliza o hook deve ser um client component. Você pode, por exemplo, abstrair o pedaço de código que usa o hook em um componente separado e aí informar que será um client component.

Ao criar uma server action, é uma **boa prática deixar explícito** no arquivo que a função deve ser executada no servidor, utilizando a diretiva `'use server'`. 

Outra boa prática é colocar as actions em uma pasta separada, por exemplo: `src/actions/index.js`.

Exemplo de Server Action para incrementar o número de curtidas: 

```js
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
```

Exemplo de chamada utilizando a `action` de um elemento `form`. Parte não relevante do código foi omitida para economizar espaço. 

```jsx
import { incrementThumbsUp } from '@/actions';

export const CardPost = ({ post }) => {
    // using bind to pass additional arguments to the Server Action
    const submitThumbsUp = incrementThumbsUp.bind(null, post);
    
    return (
        <form action={submitThumbsUp}>
              <ThumbsUpButton />
              <p>{post.likes}</p>
        </form>
    );
}
```

Mesmo exemplo, dessa vez utilizando o evento de submit do `form`. Neste caso, é necessário transformar o componente em um client component e, por conta disso, impedir o recarregamento da página com `preventDefault`:

```jsx
'use client'

import { incrementThumbsUp } from '@/actions';

export const CardPost = ({ post }) => {
    // using bind to pass additional arguments to the Server Action
    const submitThumbsUp = incrementThumbsUp.bind(null, post);

    const handleSubmit = e => {
        e.preventDefault();
        submitThumbsUp();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <ThumbsUpButton />
            <p>{post.likes}</p>
        </form>
    );
}
```

O `ThumbsUpButton` é um client component que vai renderizar um botão ou um spinner, baseado no estado da ação. Parte não relevante do código foi omitida para economizar espaço. :

```jsx
'use client';

import { useFormStatus } from "react-dom"

export const ThumbsUpButton = () => {
    const { pending } = useFormStatus();
    return <IconButton disabled={pending}>
        {pending ? <Spinner /> : <ThumbsUp />}
    </IconButton>
}
```
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

## JSON-server

Iremos mockar o back end utilizando o json-server.

Para isso, crie uma pasta foram da pasta da aplicação e salve [este arquivo JSON](https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts.json) nesta pasta. O arquivo servirá como o banco de dados de postagens a serem exibidas na aplicação. 

Na linha de comando, navegue até a pasta criada e faça a instalação local do json-server na versão específica:

    npm i json-server@1.0.0-alpha.22

Para rodar o servidor com o arquivo baixado e na porta 3042 (você pode escolher a porta que quiser):

    npx json-server posts.json -p 3042
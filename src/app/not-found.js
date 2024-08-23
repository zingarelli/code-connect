import ErrorTemplate from '@/components/ErrorTemplate';
import errorImg from './assets/404.png';

export default function NotFound() {
    return <ErrorTemplate
        imgSrc={errorImg}
        imgAlt={"Um robô triste olhando para a água. Na água há um reflexo com o número 404."}
        title={"OPS! Página não encontrada."}
        content={"Você pode voltar ao feed e continuar buscando projetos incríveis!"}
    />
}
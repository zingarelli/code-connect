'use client'; // error components MUST BE client components
import { useEffect } from "react";
import errorImg from './assets/500.png';
import ErrorTemplate from "@/components/ErrorTemplate";

export default function Error({ error }) {
    useEffect(() => {
        // winston logger will not work on the client side
        console.log(`Erro na página inicial: ${error}`);
    }, [error]);

    return <ErrorTemplate 
        imgSrc={errorImg}
        imgAlt={"Um robô pensativo com a mão no queixo."}
        title={"Opa! Um erro ocorreu."}
        content={"Não conseguimos carregar a página, volte para seguir navegando."}
    />
}
"use client";

import { useEffect } from "react";
import { ArrowDownCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/alunos/button";
import Sidebar from "@/components/layout/sidebar";
import checklist from "../../../assets/images/checklist.png";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export default function CheckInEmocional({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const { darkMode, toggleTheme } = useTheme();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <div
      className={`min-h-screen bg-[#F0F7FF] flex flex-col lg:flex-row dark:bg-[#141414]`}
    >
      <Sidebar />
      <div className="w-full flex flex-col items-center mt-8 px-4 lg:px-0">
        <div className="w-full flex justify-end mb-8 lg:mr-28">
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <div className="bg-[#FFFFFF] w-full lg:w-[75%] p-4 lg:p-8 lg:pr-20 lg:pt-20 lg:pb-20 space-y-2 rounded-3xl dark:bg-black">
          <h1 className="text-[#0077FF] font-bold text-[24px]">
            Seu bem-estar importa!
          </h1>
          <p className="text-[16px] lg:text-[20px] dark:text-[#ffffff]">
            A rotina escolar envolve muitos desafios, e sabemos que cada aluno
            vivencia experiências únicas. Pensando nisso, criamos este espaço
            para que você possa expressar seus sentimentos, dificuldades e
            sugestões de forma segura e confidencial. O objetivo deste
            formulário é entender melhor como você está se sentindo e
            identificar maneiras de tornar o ambiente escolar mais acolhedor e
            positivo para todos. Suas respostas são valiosas e podem contribuir
            para melhorias no dia a dia da instituição.
          </p>
          <h1 className="text-[#0077FF] font-bold text-[24px]">
            Por que preencher este formulário?
          </h1>

          <div className="flex flex-row gap-4 lg:gap-8 items-center">
            <Image src={checklist} alt="#" width={20} height={20} priority />
            <p className="text-[16px] lg:text-[20px] dark:text-[#ffffff]">
              Expressar suas emoções, um espaço para compartilhar como você está
              se sentindo.
            </p>
          </div>

          <div className="flex flex-row gap-4 lg:gap-8 items-center">
            <Image src={checklist} alt="#" width={20} height={20} priority />
            <p className="text-[16px] lg:text-[20px] dark:text-[#ffffff]">
              Sugerir melhorias, se há algo que pode ser ajustado, queremos
              ouvir você.
            </p>
          </div>

          <div className="flex flex-row gap-4 lg:gap-8 items-center">
            <Image src={checklist} alt="#" width={20} height={20} priority />
            <p className="text-[16px] lg:text-[20px] dark:text-[#ffffff]">
              Ser ouvido com respeito, suas respostas serão analisadas com
              empatia e seriedade.
            </p>
          </div>

          <h1 className="text-[#0077FF] font-bold text-[24px]">
            Importante lembrar:
          </h1>
          <p className="text-[16px] lg:text-[20px] dark:text-[#ffffff]">
            • Todas as respostas são anônimas e opcionais. Você pode responder
            apenas as perguntas que desejar.
          </p>
          <p className="text-[16px] lg:text-[20px] dark:text-[#ffffff]">
            • Se precisar de apoio, nossa equipe está disponível para ajudar.
            Não hesite em procurar ajuda sempre que precisar.
          </p>
          <p className="text-[16px] lg:text-[20px] dark:text-[#ffffff]">
            • Juntos, podemos construir um ambiente escolar mais saudável e
            acolhedor para todos.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfG-Q-ecWsjrEOd_wz3b5fwT5vJdwFDHparoeiKLVtp3WxB3Q/viewform?usp=header"
            className="flex w-full lg:w-72 items-center gap-2 border-2 border-blue-500 rounded-full px-4 py-2 text-black font-semibold hover:bg-blue-100 transition-all dark:text-white dark:hover:bg-[#141414]"
          >
            <ArrowDownCircle className="text-blue-500" size={24} />
            <span>Acesse o formulário aqui.</span>
          </a>
        </div>
      </div>
    </div>
  );
}

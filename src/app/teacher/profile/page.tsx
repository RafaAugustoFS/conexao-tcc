"use client"; // Indica que este é um componente do lado do cliente no Next.js

import Sidebar from "@/components/layout/sidebarTeacher"; // Barra lateral do professor
import { ProfileInfo } from "@/components/ui/teacher/profile"; // Componente para exibir informações do perfil do professor
import WelcomeUser from "@/components/ui/welcomeUser"; // Componente para exibir uma mensagem de boas-vindas personalizada
import { Button } from "@/components/ui/alunos/button"; // Componente de botão personalizado
import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e estado
import { Moon, Sun } from "lucide-react"; // Ícones para o tema claro e escuro
import { jwtDecode } from "jwt-decode"; // Biblioteca para decodificar tokens JWT
import { useTheme } from "@/components/ThemeProvider"; // Hook para gerenciar o tema (claro/escuro)

// Interface para definir a estrutura dos dados do perfil do professor
interface TeacherProfile {
  nomeDocente: string; // Nome do professor
  emailDocente: string; // E-mail do professor
  dataNascimentoDocente: string; // Data de nascimento do professor
  telefoneDocente: string; // Telefone do professor
  identifierCode: string; // Código identificador do professor
}

// Componente principal da página de perfil do professor
export default function TeacherProfile({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const { darkMode, toggleTheme } = useTheme(); // Estado e função para alternar o tema
  const [docenteData, setDocenteData] = useState<TeacherProfile | null>(null); // Estado para armazenar os dados do professor
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros, se houver

  // Função para buscar os dados do professor
  const fetchDocenteData = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtém o token do localStorage
      if (!token) throw new Error("Token não encontrado"); // Lança erro se o token não existir

      const decoded: any = jwtDecode(token); // Decodifica o token JWT
      const id = decoded?.sub; // Obtém o ID do usuário do token
      if (!id) throw new Error("ID do usuário não encontrado no token"); // Lança erro se o ID não existir

      // Faz uma requisição para buscar os dados do professor
      const response = await fetch(`http://localhost:3000/api/teacher/${id}`);
      if (!response.ok)
        throw new Error("Não foi possível carregar os dados do estudante"); // Lança erro se a requisição falhar

      const data = await response.json(); // Converte a resposta para JSON
      setDocenteData(data); // Atualiza os dados do professor
    } catch (err: any) {
      setError(err.message); // Define a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Efeito para buscar os dados do professor ao carregar o componente
  useEffect(() => {
    fetchDocenteData(); // Executa a função para buscar os dados
  }, []);

  // Efeito para aplicar o tema escuro/claro ao HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      {/* Barra lateral do professor */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1">
        <div className="p-8">
          {/* Cabeçalho com mensagem de boas-vindas e botão de alternar tema */}
          <div className="flex items-center justify-between mb-8">
            <div>
              {/* Mensagem de boas-vindas personalizada com o nome do professor */}
              <WelcomeUser name={docenteData?.nomeDocente || "Nao achou"} />
            </div>
            {/* Botão para alternar entre tema claro e escuro */}
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Exibe as informações do perfil do professor, se disponíveis */}
          {docenteData && (
            <ProfileInfo
              name={docenteData.nomeDocente} // Nome do professor
              email={docenteData.emailDocente} // E-mail do professor
              birthDate={docenteData.dataNascimentoDocente} // Data de nascimento do professor
              phone={docenteData.telefoneDocente} // Telefone do professor
              registrationNumber={docenteData.identifierCode} // Código identificador do professor
              classes={[]} // Lista de turmas (vazia neste exemplo)
              password={""} // Senha (vazia neste exemplo)
            />
          )}
        </div>
      </main>
    </div>
  );
}
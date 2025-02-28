"use client"

import { useState } from "react"
import { Sun, Moon, Eye, EyeOff } from "lucide-react"
import { useRouter } from 'next/navigation'
import Illustration from "../assets/images/Illustration.png"
import Image from "next/image"

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [identifierCode, setIdentifierCode] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = {
      identifierCode,
      password
    };
    if(identifierCode.startsWith("p")){
      try {
        const response = await fetch("http://localhost:3000/api/teacher/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        if (response.ok) {
          console.log("Login realizado como professor!");
          const data = await response.json();
          console.log(data);
          const token = data.token;
          if (token) {
            localStorage.setItem("token", token); // Armazena o token no localStorage
            console.log("Token gerado com sucesso!");
            router.push("/institution")
          } else {
            console.log("Erro: Token não recebido.");
          }
          setIdentifierCode("");
          setPassword("");
        } else {
          console.log("Erro no professor!");
        }
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
    }else if(identifierCode.startsWith("a")){
      try {
        const response = await fetch("http://localhost:3000/api/student/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        if (response.ok) {
          console.log("Login realizado como aluno!");
          const data = await response.json();
          console.log(data);
          const token = data.token;
          if (token) {
            localStorage.setItem("token", token); // Armazena o token no localStorage
            console.log("Token gerado com sucesso!");
            router.push("/student")
          } else {
            console.log("Erro: Token não recebido.");
          }
          setIdentifierCode("");
          setPassword("");
        } else {
          console.log("Erro no aluno!");
        }
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
    }else{
      try {
        const response = await fetch("http://localhost:3000/api/institution/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        if (response.ok) {
          console.log("Login realizado como instituição!");
          const data = await response.json();
          console.log(data);
          const token = data.token;
          if (token) {
            localStorage.setItem("token", token); // Armazena o token no localStorage
            console.log("Token gerado com sucesso!");
            router.push("/teacher")
          } else {
            console.log("Erro: Token não recebido.");
          }
          setIdentifierCode("");
          setPassword("");
        } else {
          console.log("Erro!");
        }
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
    }

    
  };

  return (
    <main className={`min-h-screen w-full ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8 flex min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
            
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Bem-vindo à <br />
              (plataforma)
            </h1>
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-md`}>
              Acompanhe seu desempenho, receba notificações e explore recursos personalizados. Faça login para começar!
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="w-full flex justify-end mb-8">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg`}
              >
                {isDark ? <Moon size={24} /> : <Sun size={24} />}
              </button>
            </div>

            <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${isDark ? "bg-gray-800" : "bg-white"}`}>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Matrícula"
                    value={identifierCode}
                    onChange={(e) => setIdentifierCode(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark ? "bg-gray-700 text-white" : "bg-gray-50"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark ? "bg-gray-700 text-white" : "bg-gray-50"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => handleSubmit}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <a
                    href="#"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Recover Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-96 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none">
        <Image
          src={Illustration}
          alt="Character illustration"
          width={400}
          height={400}
          priority
        />
      </div>
    </main>
  )
}


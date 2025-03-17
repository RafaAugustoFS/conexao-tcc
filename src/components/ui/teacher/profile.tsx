import Image from "next/image"; // Componente de imagem otimizada do Next.js
import { useState } from "react"; // Hook do React para gerenciar estado
import { Eye, EyeOff } from "lucide-react"; // Ícones para mostrar/esconder senha

// Interface para definir as propriedades do componente ProfileInfo
interface ProfileInfoProps {
  name: string; // Nome do usuário
  email: string; // E-mail do usuário
  birthDate: string; // Data de nascimento do usuário
  phone: string; // Telefone do usuário
  registrationNumber: string; // Número de matrícula do usuário
  classes: string[]; // Lista de turmas do usuário
  password: string; // Senha do usuário (não utilizada no código atual)
}

// Componente para exibir as informações do perfil do usuário
export function ProfileInfo({
  name,
  email,
  birthDate,
  phone,
  registrationNumber,
  classes,
  password,
}: ProfileInfoProps) {
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  return (
    <div className="bg-white dark:bg-black rounded-lg p-8">
      {/* Seção superior com imagem e informações básicas */}
      <div className="flex items-start gap-6">
        {/* Imagem do perfil */}
        <Image
          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?t=st=1738800543~exp=1738804143~hmac=5400a6f0c02663ed6f91ff172c490ed49dbd456d03bed9e4c98b2aed06b0dfdb&w=826"
          alt="Profile picture"
          width={80}
          height={80}
          className="rounded-full"
        />
        {/* Nome e e-mail */}
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            {name}
          </h2>
          <p className="text-gray-500 dark:text-[#8A8A8A]">{email}</p>
        </div>
      </div>

      {/* Seção de informações detalhadas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo: Nome Completo */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Nome Completo
          </label>
          <input
            type="text"
            value={name}
            readOnly
            className="w-full p-2 rounded-lg border text-gray-700 dark:text-[#8A8A8A] border-blue-100 bg-blue-50 dark:bg-[#141414] dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Campo: Data de Nascimento */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Data de Nascimento
          </label>
          <input
            type="text"
            value={birthDate}
            readOnly
            className="w-full p-2 rounded-lg border text-gray-700 dark:text-[#8A8A8A] border-blue-100 bg-blue-50 dark:bg-[#141414] dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Campo: Email */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-[#8A8A8A] dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Campo: Telefone */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Telefone
          </label>
          <input
            type="tel"
            value={phone}
            readOnly
            className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-[#8A8A8A] dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Campo: Nº Matrícula */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Nº Matrícula
          </label>
          <input
            type="text"
            value={registrationNumber}
            readOnly
            className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-[#8A8A8A] dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Campo: Turmas */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Turmas
          </label>
          <select className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-[#8A8A8A] dark:border-[#141414] cursor-not-allowed">
            <option value="">Turmas</option>
            {/* Mapeia as turmas e exibe cada uma como uma opção no select */}
            {classes.map((turma, index) => (
              <option key={index} value={turma}>
                {turma}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ProfileInfoProps {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  registrationNumber: string;
  classes: string[]; 
  password: string;
}

export function ProfileInfo({
  name,
  email,
  birthDate,
  phone,
  registrationNumber,
  classes,
  password,
}: ProfileInfoProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white dark:bg-black rounded-lg p-8">
      <div className="flex items-start gap-6">
        <Image
          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?t=st=1738800543~exp=1738804143~hmac=5400a6f0c02663ed6f91ff172c490ed49dbd456d03bed9e4c98b2aed06b0dfdb&w=826"
          alt="Profile picture"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            {name}
          </h2>
          <p className="text-gray-500">{email}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome Completo */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Nome Completo
          </label>
          <input
            type="text"
            value={name}
            readOnly
             className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Data de Nascimento */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Data de Nascimento
          </label>
          <input
            type="text"
            value={birthDate}
            readOnly
              className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
              className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Telefone
          </label>
          <input
            type="tel"
            value={phone}
            readOnly
             className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Nº Matrícula */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Nº Matrícula
          </label>
          <input
            type="text"
            value={registrationNumber}
            readOnly
            className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Campo de Senha */}
        

        {/* Turmas */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">
            Turmas
          </label>
          <select   className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 cursor-not-allowed">
          <option value="">Turmas</option>
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

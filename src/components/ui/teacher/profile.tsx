import Image from "next/image";
import { useState } from "react";

interface ProfileInfoProps {
  imageUrl: string;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  registrationNumber: string;
  classes: Array<{ nomeTurma: string }>;
  password: string;
}

export function ProfileInfo({
  imageUrl,
  name,
  email,
  birthDate,
  phone,
  registrationNumber,
  classes,
  password,
}: ProfileInfoProps) {
  const [showPassword, setShowPassword] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg p-4 sm:p-6 lg:p-8 text-sm sm:text-base">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="flex-shrink-0">
          <Image
            src={imageUrl}
            width={80}
            height={80}
            className="rounded-full w-16 h-16 sm:w-20 sm:h-20"
            alt="Foto de perfil"
          />
        </div>
        <div className="mt-2 sm:mt-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
            {name}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{email}</p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Nome Completo */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm text-gray-600 dark:text-[#ffffffd8]">
            Nome Completo
          </label>
          <input
            type="text"
            value={name}
            readOnly
            className="w-full p-2 text-sm sm:text-base rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-white dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Data de Nascimento */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm text-gray-600 dark:text-[#ffffffd8]">
            Data de Nascimento
          </label>
          <input
            type="text"
            value={formatDate(birthDate)}
            readOnly
            className="w-full p-2 text-sm sm:text-base rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-white dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm text-gray-600 dark:text-[#ffffffd8]">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 text-sm sm:text-base rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-white dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Telefone */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm text-gray-600 dark:text-[#ffffffd8]">
            Telefone
          </label>
          <input
            type="tel"
            value={phone}
            readOnly
            className="w-full p-2 text-sm sm:text-base rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-white dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Nº Matrícula */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm text-gray-600 dark:text-[#ffffffd8]">
            Nº Matrícula
          </label>
          <input
            type="text"
            value={registrationNumber}
            readOnly
            className="w-full p-2 text-sm sm:text-base rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-white dark:border-[#141414] cursor-not-allowed"
          />
        </div>

        {/* Turmas */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm text-gray-600 dark:text-[#ffffffd8]">
            Turmas
          </label>
          <select className="w-full p-2 text-sm sm:text-base rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-[#141414] dark:text-white dark:border-[#141414] cursor-not-allowed">
            <option value="">Turmas</option>
            {classes.map((turma, index) => (
              <option key={index} value={turma.nomeTurma}>
                {turma.nomeTurma}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
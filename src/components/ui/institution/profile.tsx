import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    registrationNumber: "",
    password: "",
    classes: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {

  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    // Aqui você pode enviar os dados para a API
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-black rounded-lg shadow-sm p-8">
      <div className="flex items-start gap-6">
        <Image
          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg"
          alt="Profile picture"
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Nome Completo", type: "text", name: "name" },
          { label: "Data de Nascimento", type: "date", name: "birthDate" },
          { label: "Email", type: "email", name: "email" },
          { label: "Telefone", type: "tel", name: "phone" },
          { label: "Nº Matrícula", type: "text", name: "registrationNumber" }
        ].map(({ label, type, name }) => (
          <div key={name} className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">{label}</label>
            <input
              type={type}
              name={name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />
          </div>
        ))}


        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">Turmas</label>
          <select
            name="classes"
            value={formData.classes}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border text-gray-700 border-blue-100 bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          >
            <option value="">Selecione uma turma</option>
            <option value="positivo">Positivo</option>
            <option value="negativo">Negativo</option>
            <option value="neutro">Neutro</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        salvar
      </button>
    </form>
  );
}

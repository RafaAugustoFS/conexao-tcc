import Image from "next/image"

interface ProfileInfoProps {
  imageUrl: string
  name: string
  email: string
  birthDate: string
  phone: string
  registrationNumber: string
}

export function ProfileInfo({ imageUrl, name, email, birthDate, phone, registrationNumber }: ProfileInfoProps) {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-sm p-8">
      <div className="flex items-start gap-6">
        <Image
          src={imageUrl}
          width={80}
          height={80}
          className="rounded-full"
          alt="Foto de perfil"
        />
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">{name}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm text-gray-600  dark:text-[#ffffffd8]">Nome Completo</label>
          <input
            type="text"
            value={name}
            readOnly
            className="w-full p-2 rounded-lg border text-[#00000075] border-[#F0F7FF] bg-[#F0F7FF] dark:bg-[#141414] dark:text-[#ffffff94] dark:border-[#141414]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">Data de Nascimento</label>
          <input
            type="text"
            value={birthDate}
            readOnly
            className="w-full p-2 rounded-lg border text-[#00000075] border-[#F0F7FF] bg-[#F0F7FF] dark:bg-[#141414] dark:text-[#ffffff94] dark:border-[#141414]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 rounded-lg border text-[#00000075] border-[#F0F7FF] bg-[#F0F7FF] dark:bg-[#141414] dark:text-[#ffffff94] dark:border-[#141414]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">Telefone</label>
          <input
            type="tel"
            value={phone}
            readOnly
            className="w-full p-2 rounded-lg border text-[#00000075] border-[#F0F7FF] bg-[#F0F7FF] dark:bg-[#141414] dark:text-[#ffffff94] dark:border-[#141414]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-600 dark:text-[#ffffffd8]">Nº Matrícula</label>
          <input
            type="text"
            value={registrationNumber}
            readOnly
            className="w-full p-2 rounded-lg border text-[#00000075] border-[#F0F7FF] bg-[#F0F7FF] dark:bg-[#141414] dark:text-[#ffffff94] dark:border-[#141414]"
          />
        </div>
      </div>
    </div>
  )
}


import Image from "next/image";

interface ProfessorCardProps {
  name: string;
  imageSrc: string;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ name, imageSrc }) => {
  return (
    <div className="bg-[#93c5fd] p-4 rounded-2xl shadow-md text-center w-[20%]">
      <div className="flex justify-center">
        <Image
          src={imageSrc}
          alt={name}
          width={60}
          height={60}
          className="rounded-full bg-white p-2 border border-gray-300"
        />
      </div>
      <p className="text-lg font-semibold mt-2">Prof(a) {name}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-700">
        Ver
      </button>
    </div>
  );
};

export default ProfessorCard;

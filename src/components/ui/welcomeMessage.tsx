import Image from "next/image";
import HumanSpace from "../../assets/images/HumaaansSpace.png";

interface WelcomeMessageProps {
  name: string;
}

export default function WelcomeMessage({ name }: WelcomeMessageProps) {
  return (
  
      <div className="w-full">
        <div className="w-full bg-[#0077FF] flex flex-row rounded-[15px] text-[#FFFFFF] mt-2">
          <div className="p-8 w-1/2">
            <h1 className="text-3xl font-bold">Seja bem-vindo(a), {name} 👋</h1>
            <p className="w-80">O sucesso é a soma de pequenos esforços repetidos dia após dia.</p>
          </div>
          <div className="w-1/2 flex justify-center">
            <Image src={HumanSpace} alt="Imagem ilustrativa" width={300} height={200} />
          </div>
        </div>
      </div>
  );
}


import Image from "next/image";
import HumanSpace from "../../assets/images/HumaaansSpace.png";

interface WelcomeUserProps {
  name: string;
}

export default function WelcomeMessage({ name }: WelcomeUserProps) {
  return (
  
      <div>
       <div>
              <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#ffffff]">{name}</h1>
              <p className="text-gray-500">Tue, 07 June 2022</p>
            </div>
      </div>
  );
}


import { useRef } from "react";

interface InputImageProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputImage({ onChange }: InputImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => fileInputRef.current?.click()}
      >
        Escolher Imagem
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}

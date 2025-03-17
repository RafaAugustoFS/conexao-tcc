"use client";
import Link from "next/link";
import React from "react";

interface CardFeedbackProps {
  person: string; // Agora recebe apenas um nome de professor
  rote?: string;
}

export default function CardFeedback({ person, rote = "/" }: CardFeedbackProps) {
  return (
    <button>
      <div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-[#F0F7FF] dark:bg-[#141414] dark:text-white border-[#F0F7FF] dark:border-[#141414] cursor-pointer">
        <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
          🎓
        </div>
        <span className="font-medium">{person}</span>
        <Link href={rote}>
          <div className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Ver
          </div>
        </Link>
      </div>
    </button>
  );
}

"use client";

import { useState } from "react";
import { Button } from "../alunos/button";

export default function FeedbackForm() {
  const [rating, setRating] = useState(null);

  return (
    <div>
        <h2 className="font-bold text-blue-500">
          Dê seu feedback sobre o aluno(a)!
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Avalie os seguintes aspectos de 1 a 10 para nos ajudar a melhorar a
          experiência das aulas.
        </p>
        <div className="mt-6 bg-[#F0F7FF] p-4 rounded-xl">
          <p className="text-sm text-black">1- Nível de Engajamento</p>
          <p className="text-xs text-gray-400">
            (O quanto a aula prendeu a atenção e motivou a participação?)
          </p>
          <div className="flex justify-between mt-4">
            {[...Array(10)].map((_, i) => (
              <button
                key={i + 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                  rating === i + 1
                    ? "bg-blue-500"
                    : "bg-white hover:bg-blue-500 text-blue-500 hover:text-white"
                }`}
                onClick={() => setRating(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <Button>Enviar respostas</Button>
      </div>
    
  );
}
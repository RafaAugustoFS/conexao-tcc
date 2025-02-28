'use client';

import React, { useState } from 'react';

export function Class(){
  
  const turmas = [
    { id: 1, nome: 'Turma A - 1º Ano', numero: '0231000' },
    { id: 2, nome: 'Turma A - 1º Ano', numero: '0231000' },
    { id: 3, nome: 'Turma A - 1º Ano', numero: '0231000' },
    { id: 4, nome: 'Turma A - 1º Ano', numero: '0231000' },
  ];
  const [turmaSelecionada, setTurmaSelecionada] = useState(turmas[0]);


  return (
    <>
    <div className="space-y-2">
      {turmas.map((turma) => (
        <button
          key={turma.id}
          onClick={() => setTurmaSelecionada(turma)}
          className={`block w-full p-3 text-left border border-[#F0F7FF] bg-[#F0F7FF] dark:bg-[#141414] dark:border-[#141414] dark:hover:border-blue-500  rounded-lg ${turmaSelecionada.id === turma.id ? 'border-blue-500' : 'border-[#F0F7FF'}`}
        >
          <span className="font-semibold">{turma.nome}</span>
          <span className="block text-gray-500 text-sm">Nº{turma.numero}</span>
        </button>
      ))}
    </div>
    </>
  );
};


"use client";
import SidebarInstitution from '@/components/layout/sidebarInstitution'
import { Button } from '@/components/ui/alunos/button'
import FloatingButton from '@/components/ui/institution/FloatingButton';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function viewClass() {
      const [darkMode, setDarkMode] = useState(false);
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [darkMode]);
  return (
    <div className='flex flex-row'>
        <SidebarInstitution/>
        <div className='w-full p-5'>
        <div className='w-full flex flex-row justify-end pt-1 pr-1'>
        <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
                    <div className="overflow-x-auto max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 mt-6">
                        <table className="w-full text-left border-collapse border border-[#1A85FF] dark:border-black">
                            <thead>
                                <tr className="bg-[#1A85FF] text-white">
                                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Nome do aluno</th>
                                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Nº da Matrícula</th>
                                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Média(%)</th>
                                    <th className="p-2 border border-blue-500 bg-[#F0F7FF] text-blue-500 dark:bg-[#141414]">Perfil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Alice Fernandes", id: "2025001", grade: "87%" },
                                    { name: "Bianca Ferreira", id: "2025002", grade: "72%" },
                                    { name: "Bruno Oliveira", id: "2025003", grade: "75%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                    { name: "Bruno Oliveira", id: "2025003", grade: "75%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                    { name: "Bruno Oliveira", id: "2025003", grade: "75%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                    { name: "Bruno Oliveira", id: "2025003", grade: "75%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                    { name: "Bruno Oliveira", id: "2025003", grade: "75%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                    { name: "Bruno Oliveira", id: "2025003", grade: "75%" },
                                    { name: "Camila Souza", id: "2025004", grade: "92%" },
                                    { name: "Daniel Pereira", id: "2025005", grade: "68%" },
                                ].map((student, index) => (
                                    <tr key={index} className="border border-blue-500">
                                        <td className="p-2 border border-blue-500 dark:text-white">{student.name}</td>
                                        <td className="p-2 border border-blue-500 dark:text-[#8A8A8A]">{student.id}</td>
                                        <td className="p-2 border border-blue-500 dark:text-white">{student.grade}</td>
                                        <td className="p-2 border border-blue-500 text-blue-500 cursor-pointer"><Link href="viewclass/profile">Visualizar Perfil</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <FloatingButton rote=''/>
                </div>
  )
}

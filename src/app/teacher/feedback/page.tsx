'use client';

import { useEffect, useState } from 'react';
import { ArrowDownCircle, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/alunos/button';
import Sidebar from '@/components/layout/sidebarTeacher';
import SearchInput from '@/components/ui/search';

export default function CheckInEmocional({ value, className }: { value: number; className?: string }) {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
    return (
        <div className={`min-h-screen bg-[#F0F7FF] flex flex-row dark:bg-[#141414]`}>
            <Sidebar />
            <div className='w-full flex flex-col items-center mt-8'>
                <div className='w-full flex justify-end mb-8 mr-28'>
                    <Button onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                </div>
                <div className="container mx-auto p-4 border rounded-lg bg-[#FFFFFF] w-[85%] h-[85%] p-8 pr-15 pt-20 pb-20 space-y-2 rounded-3xl dark:bg-black dark:border-black">
                    <div className="relative w-full max-w-md mx-auto flex justify-center items-center mb-6">
                            <SearchInput placeholder='Digite o nome ou Nº da matricula'/> 
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { title: "Turma A - 1º Ano", code: "0231000", students: 30, time: "08h - 12h" },
                            { title: "Turma B - 2º Ano", code: "0321000", students: 28, time: "13h - 17h" },
                            { title: "Turma C - 3º Ano", code: "0312000", students: 26, time: "19h - 22h" },
                            { title: "Turma C - 3º Ano", code: "0312000", students: 26, time: "19h - 22h" },
                            { title: "Turma C - 3º Ano", code: "0312000", students: 26, time: "19h - 22h" },
                        ].map((turma, index) => (
                            <div key={index} className="bg-blue-50 dark:bg-[#141414] p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg dark:text-white">{turma.title} <span className="text-gray-500 text-sm dark:text-[#8A8A8A]">Nº{turma.code}</span></h3>
                                <p className="text-gray-700 dark:text-white">{turma.students} alunos ativos</p>
                                <p className="text-gray-700 dark:text-white">Horário: Segunda a Sexta, <span className="text-blue-500 font-bold">{turma.time}</span></p>
                                <a href="/teacher/feedback/studentsFeedback">
                                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Visualizar turma</button>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
            );
       
}

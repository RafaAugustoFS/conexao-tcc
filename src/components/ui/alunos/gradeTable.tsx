'use client';

import React, {useEffect, useState} from 'react';
import DownloadButton from './downloadButton'
import {jwtDecode} from 'jwt-decode';

// Tipos para as notas e as matérias
interface Nota {
  idNota: number;
  nota: number;
  bimestre: number;
  status: string;
  NomeDiscipline: string;
}

interface Materia {
  nomeDisciplina: string;
  notas: (number | null)[];
}


const Table = () => {
    // Estado para armazenar as disciplinas e notas
    const [disciplinas, setDisciplinas] = useState<Materia[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [erro, setErro] = useState<string | null>(null);
  
    // Função para organizar as notas por disciplina
    const organizarNotasPorDisciplina = (notas: Nota[]): Materia[] => {
      const disciplinasMap: { [key: string]: (number | null)[] } = {};
  
      // Organiza as notas por disciplina
      notas.forEach((nota) => {
        const { NomeDiscipline, bimestre, nota: valorNota } = nota;
  
        // Inicializa a disciplina se não existir no mapa
        if (!disciplinasMap[NomeDiscipline]) {
          disciplinasMap[NomeDiscipline] = [null, null, null, null]; // Inicializa os bimestres como nulos
        }
        // Adiciona a nota no bimestre correspondente (1 a 4)
        disciplinasMap[NomeDiscipline][bimestre - 1] = valorNota;
      });
  
      // Converte o mapa de disciplinas para um array de Materia
      return Object.keys(disciplinasMap).map((nomeDisciplina) => ({
        nomeDisciplina,
        notas: disciplinasMap[nomeDisciplina],
      }));
    };
  
    // Faz a requisição para buscar as notas quando o componente for montado
    useEffect(() => {
      const buscarNotas = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Token não encontrado');
  
          // 2. Decodifica o token para obter o ID do usuário
          const decoded: any = jwtDecode(token);
          const userId = decoded?.sub; // Supondo que o token contenha { id: 123 }
          if (!userId) throw new Error('ID do usuário não encontrado no token');
  
          // Requisição para a API
          const resposta = await fetch(`http://localhost:3000/api/student/${userId}`);
  
          if (!resposta.ok) {
            throw new Error('Falha ao buscar os dados');
            console.log(resposta)
          }
  
          const dados = await resposta.json();
  
          // Organiza as notas por disciplina
          const disciplinasOrganizadas = organizarNotasPorDisciplina(dados.notas);
  
          // Atualiza o estado com as disciplinas e notas organizadas
          setDisciplinas(disciplinasOrganizadas);
        } catch (erro) {
          setErro((erro as Error).message);
        } finally {
          setCarregando(false);
        }
      };
  
      buscarNotas();
    }, []); // O array vazio faz a requisição ser executada uma única vez ao montar o componente
  
    // Exibe a mensagem de carregamento ou erro, se houver
    if (carregando) {
      return <div>Carregando...</div>;
    }
  
    if (erro) {
      return <div>Erro: {erro}</div>;
    }
  
  return (
    <div className="flex flex-col overflow-x-auto p-4 w-full justify-center items-center bg-white dark:bg-black rounded-[20px]">
      <table className="w-1/2 border-separate border-spacing-8">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2">Matéria</th>
            <th className="p-2">1° Bim.</th>
            <th className="p-2">2° Bim.</th>
            <th className="p-2">3° Bim.</th>
            <th className="p-2">4° Bim.</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((materia, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-gray-200">
              <td className="p-2 bg-blue-600 text-white font-semibold text-center">{materia.nomeDisciplina}</td>
              {materia.notas.map((nota, i) => (
                <td key={i} className="p-2 text-center border border-transparent text-black bg-[#EAF4FF] dark:bg-[#141414] dark:text-white">
                  {nota !== null ? nota : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <DownloadButton apiBaseUrl='http://localhost:3000/api/boletim' />
    </div>
  );
};

export default Table;
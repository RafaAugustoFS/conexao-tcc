"use client";

import { useState, useEffect } from "react";
import SmallSelect from "@/components/ui/smallSelect";
import { jwtDecode } from "jwt-decode";

export function MediaCard({ atualizarMedia }: { atualizarMedia: (media: number) => void }) {
  const [selectedType, setSelectedType] = useState("Todas");
  const [notas, setNotas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const decoded: any = jwtDecode(token);
        const userId = decoded?.sub;
        if (!userId) throw new Error("ID do usuário não encontrado no token");

        const resposta = await fetch(`http://localhost:3000/api/student/${userId}`);
        if (!resposta.ok) {
          throw new Error("Falha ao buscar os dados");
        }

        const dados = await resposta.json();
        setNotas(dados.notas);
      } catch (erro) {
        console.error("Erro ao buscar as notas:", erro);
      } finally {
        setCarregando(false);
      }
    };

    fetchNotas();
  }, []);

  const calcularMediaPorBimestre = () => {
    let bimestreNotas = [];
    let media = 0;

    if (selectedType === "Todas") {
      bimestreNotas = notas;
    } else {
      const bimestre = parseInt(selectedType[0]);
      bimestreNotas = notas.filter((nota) => nota.bimestre === bimestre);
    }

    const somaNotas = bimestreNotas.reduce((acc, nota) => acc + nota.nota, 0);
    media = somaNotas / bimestreNotas.length || 0;
    return media;
  };

  useEffect(() => {
    const mediaCalculada = calcularMediaPorBimestre();
    atualizarMedia(mediaCalculada); // Atualiza a média no componente pai
  }, [selectedType, notas]);

  if (carregando) return <div>Carregando...</div>;

  return (
    <div className="flex flex-row justify-between">
      <h2 className="text-lg font-bold">Média de notas</h2>
      <div className="flex flex-row items-center justify-center">
        <SmallSelect
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          placeholder="Selecione o Bimestre"
          items={["Todas", "1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"]}
        />
      </div>
    </div>
  );
}

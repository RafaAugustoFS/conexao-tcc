import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jwtDecode } from 'jwt-decode';
import SmallSelect from "@/components/ui/alunos/smallselect";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/alunos/select";
import { useParams } from 'next/navigation';  

interface FeedbackData {
  bimestre: number;
  resposta1: number;
  resposta2: number;
  resposta3: number;
  resposta4: number;
  resposta5: number;
  createdByDTO: { id: number; nomeDocente: string };
}

interface ChartData {
  name: string;
  value: number;
}

interface Creator {
  id: number;
  nomeDocente: string;
}

const EngagementChart: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Acessa o parâmetro `id` da URL
  const studentId = id ? parseInt(id, 10) : null; // Converte para número

  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [bimestre, setBimestre] = useState<number>(1);
  const [allData, setAllData] = useState<FeedbackData[]>([]);
  const [selectedType, setSelectedType] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);
  const [selectedCreatorName, setSelectedCreatorName] = useState<string | null>(null);

  const valorVindoDoSelect = (value: string) => {
    switch (value) {
      case "1º Bimestre":
        setSelectedType(1);
        setBimestre(1);
        break;
      case "2º Bimestre":
        setSelectedType(2);
        setBimestre(2);
        break;
      case "3º Bimestre":
        setSelectedType(3);
        setBimestre(3);
        break;
      case "4º Bimestre":
        setSelectedType(4);
        setBimestre(4);
        break;
    }
  };

  const types = ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"];

  const normalizeData = (values: number[]) => {
    const maxValue = Math.max(...values);
    if (maxValue === 0) return values;
    return values.map(value => (value / maxValue) * 5);
  };

  const fetchCreators = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const resposta = await fetch("http://localhost:3000/api/teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resposta.ok) throw new Error("Falha ao buscar os criadores");

      const dados = await resposta.json();
      console.log("Dados dos criadores:", dados); // Inspecione os dados aqui
      setCreators(dados);
    } catch (err: any) {
      console.error("Erro ao buscar criadores:", err); // Log de erro
      setError(err.message || "Erro ao buscar os criadores");
      setCreators([]); // Define creators como array vazio em caso de erro
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      if (!studentId) throw new Error("ID do aluno não encontrado na URL");

      const resposta = await fetch(`http://localhost:3000/api/student/feedback/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resposta.ok) throw new Error("Falha ao buscar os dados");

      const dados = await resposta.json();
      console.log("Dados recebidos:", dados); // Debug: inspecione os dados

      // Verifica se os dados foram carregados corretamente
      if (!dados || dados.length === 0) {
        setData([]); // Define data como array vazio
        return;
      }

      // Filtra os feedbacks pelo criador selecionado (com verificação de createdByDTO)
      const filteredByCreator = selectedCreator
        ? dados.filter((item: FeedbackData) => item.createdByDTO && item.createdByDTO.id === selectedCreator)
        : dados;

      // Filtra os feedbacks pelo bimestre
      const filteredData = bimestre === 0
        ? filteredByCreator
        : filteredByCreator.filter((item: FeedbackData) => item.bimestre === bimestre);

      // Se não houver dados após os filtros, define data como array vazio
      if (filteredData.length === 0) {
        setData([]); // Define data como array vazio
        return;
      }

      // Extrai os valores das respostas do primeiro feedback filtrado
      const values = [
        filteredData[0].resposta1,
        filteredData[0].resposta2,
        filteredData[0].resposta3,
        filteredData[0].resposta4,
        filteredData[0].resposta5,
      ];

      // Normaliza os valores para o gráfico
      const normalizedValues = normalizeData(values);

      // Formata os dados para o gráfico
      const formattedData = [
        { name: 'Engajamento', value: normalizedValues[0] },
        { name: 'Disposição', value: normalizedValues[1] },
        { name: 'Entrega', value: normalizedValues[2] },
        { name: 'Atenção', value: normalizedValues[3] },
        { name: 'Comportamento', value: normalizedValues[4] },
      ];

      setData(formattedData); // Define os dados formatados
      setError(null);

      // Atualiza o nome do docente selecionado
      if (filteredData.length > 0 && filteredData[0].createdByDTO) {
        setSelectedCreatorName(filteredData[0].createdByDTO.nomeDocente);
      } else {
        setSelectedCreatorName(null);
      }
    } catch (err: any) {
      setError(err.message);
      setData([]); // Em caso de erro, define data como array vazio
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  useEffect(() => {
    fetchData();
  }, [bimestre, selectedCreator, studentId]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg dark:bg-[#141414]">
      <div className="mb-4 flex justify-end items-center gap-4">
        <Select onValueChange={(value) => {
          const selectedId = Number(value);
          const selectedCreator = creators.find((creator) => creator.id === selectedId);
          setSelectedCreator(selectedId);
          setSelectedCreatorName(selectedCreator ? selectedCreator.nomeDocente : null);
        }}>
          <SelectTrigger>
            <SelectValue placeholder=" Docente">
              {selectedCreatorName || "Selecione o Criador"} {/* Exibe o nome do docente selecionado */}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {creators.map((creator) => (
              <SelectItem key={creator.id} value={String(creator.id)}>
                {creator.nomeDocente} {/* Exibe o nome do docente no dropdown */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <SmallSelect
          aria-label="Selecione o Bimestre"
          selectedType={selectedType}
          setSelectedType={valorVindoDoSelect}
          placeholder="Selecione o Bimestre"
          items={types}
        />
      </div>

      {/* Exibe o nome do docente selecionado */}
      {selectedCreatorName && (
        <div className="mb-4 text-gray-700 dark:text-white">
          Docente: <strong>{selectedCreatorName}</strong>
        </div>
      )}

      {error ? (
        <div className="text-red-500 mb-4 flex items-center">
          <span className="material-icons mr-2">error</span>
          {error}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      )}
      {data.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-4">
          Nenhum feedback disponível para o bimestre selecionado.
        </div>
      )}
    </div>
  );
};

export default EngagementChart;
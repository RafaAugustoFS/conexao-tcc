import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ valorAtual }: { valorAtual: number }) => {
  const maxValor = 100; // Valor máximo

  const data = {
    datasets: [
      {
        data: [valorAtual, maxValor - valorAtual], // Divide o gráfico entre o valor atual e o restante
        backgroundColor: ["#3F51B5", "#90CAF9"], // Azul escuro e azul claro
        borderWidth: 0,
        cutout: "80%", // Faz um gráfico de anel (doughnut)
        circumference: 180, // Define um arco de 180º
        rotation: 270, // Começa do lado esquerdo
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="w-full h-40 flex flex-col items-center mt-3">
      <Doughnut data={data} options={options} />
      <div className="text-center mt-[-40px]">
        <p className="text-sm">Valor atual</p>
        <p className="text-xl font-bold">{valorAtual.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Chart;

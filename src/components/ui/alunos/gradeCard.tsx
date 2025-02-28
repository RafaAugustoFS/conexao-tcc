"use client";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SmallSelect from "@/components/ui/smallSelect";
import { useState } from "react";
interface Subject {
  name: string;
  teacher: string;
  grade: number;
  color: string;
  textColor: string;
}

const subjects: Subject[] = [
  {
    name: "Português",
    teacher: "Arthur",
    grade: 75,
    color: "text-purple-500",
    textColor: "text-purple-500",
  },
  {
    name: "Matemática",
    teacher: "Samuel",
    grade: 91,
    color: "text-blue-500",
    textColor: "text-blue-500",
  },
  {
    name: "Inglês",
    teacher: "Giovanni",
    grade: 97,
    color: "text-green-500",
    textColor: "text-green-500",
  },
];

export default function GradeCard() {
  const [selectedType, setSelectedType] = useState("Todas");
  return (
    <div className="w-96 overflow-auto ">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-lg font-bold">Notas</h2>
          <SmallSelect
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            placeholder="Selecione o Bimestre"
            items={["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"]}
          />
        </div>
      </div>

      <div className="space-y-6">
        {subjects.map((subject, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-bold">{subject.name}</h3>
              <p className="text-gray-500 text-sm">{subject.teacher}</p>
            </div>

            <div className="relative w-14 h-14">
              <CircularProgressbar
                value={subject.grade}
                styles={buildStyles({
                  textSize: "32px",
                  pathColor: "#0077FF",
                  trailColor: "#E5E7EB",
                })}
              />
              <span
                className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-[#000] dark:text-[#fff]`}
              >
                {subject.grade}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

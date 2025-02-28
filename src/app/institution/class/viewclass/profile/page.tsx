"use client";
import Sidebar from "@/components/layout/sidebarInstitution";
import { ProfileInfo } from "@/components/ui/teacher/profile";
import { Button } from "@/components/ui/alunos/button";
import { useEffect, useState } from "react";
import { Moon, Pencil, Sun, Trash } from "lucide-react";
import Link from "next/link";
import DeleteModal from "@/components/modals/modelDelete";

export default function User({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-end mb-8 w-full">
            <Button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          <div className="bg-white dark:bg-black rounded-lg shadow-sm p-3">
            <ProfileInfo
              name="Renato de Souza"
              email="renatoa@gmail.com"
              birthDate="07/01/1990"
              phone="(11) 99952-8203"
              registrationNumber="810693449-1"
              classes={""}
              password={""}
            />
            <div className="w-full flex flex-row justify-end space-x-4 pr-8">
              <Link href="profile/editprofile">
                <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                  <Pencil size={20} />
                </button>
              </Link>
              <button
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => setIsModalOpen(true)}
              >
                <Trash size={20} />
              </button>
            </div>
            <div className="flex justify-center w-full">
            <Link className="text-[#4184ff] hover:underline" href="profile/feedback">Ver Mais</Link>
            </div>
          </div>
        </div>
      </main>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          console.log("Item excluído");
        }}
      />
    </div>
  );
}
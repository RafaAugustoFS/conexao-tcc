import { useState } from "react";

import Image from "next/image";

import Notification from "../../../assets/images/Notification.png";

export function User({ className }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8">
          <Image
            src={Notification}
            alt="Notification bell"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-medium">Ativar notificações?</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Você deseja receber notificações sobre atualizações e novidades?
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sim
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

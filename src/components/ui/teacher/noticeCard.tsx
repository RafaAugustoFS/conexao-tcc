'use client';

export function NoticeCard() {
  return (
    <div>
      
      <textarea
        className="w-full h-40 p-3 border border-[#F0F7FF] rounded-lg resize-none border-none focus:outline-none bg-[#F0F7FF] dark:bg-[#141414] text-[#8A8A8A]"
      />
      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Enviar
      </button>
    </div>
  );
}

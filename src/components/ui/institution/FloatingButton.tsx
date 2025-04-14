"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

interface Button{
  rote?: string;
}
export default function FloatingButton({ rote = "/" }: Button) {
  return (
    <Link href={rote}
      className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
    >
      <Plus size={24} />
    </Link>
  );
}


"use client"; // Indicates this is a Client Component in Next.js

// Importing components and libraries
import Table from "@/components/ui/teacher/gradeTableStudents"; // Component for displaying grades table
import Sidebar from "@/components/layout/sidebarTeacher"; // Teacher sidebar navigation component
import { Button } from "@/components/ui/alunos/button"; // Custom button component
import { Moon, Sun } from "lucide-react"; // Icons for dark/light theme toggle
import { useTheme } from "@/components/ThemeProvider"; // Theme context provider

// Main component for the Notes page
export default function Notes({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  // Using theme context to manage dark/light mode
  const { darkMode, toggleTheme } = useTheme();

  return (
    // Main container with dark mode support
    <div className="flex min-h-screen bg-[#F0F7FF] dark:bg-[#141414]">
      {/* Sidebar navigation */}
      <Sidebar />
      
      {/* Main content area */}
      <main className="flex-1">
        {/* Content container with padding */}
        <div className="p-8">
          {/* Theme toggle button positioned at top-right */}
          <div className="w-full flex justify-end mb-8 mr-28">
            <Button onClick={toggleTheme}>
              {/* Shows Sun icon in dark mode, Moon icon in light mode */}
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          
          {/* Grades table component */}
          <Table />
        </div>
      </main>
    </div>
  );
}
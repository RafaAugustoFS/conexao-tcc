"use client";
// Importing necessary components and libraries
import MessageList from "@/components/ui/institution/messageList";
import SidebarInstitution from "@/components/layout/sidebarInstitution";
import { Button } from "@/components/ui/alunos/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import WelcomeMessage from "@/components/ui/welcomeMessage";
import { NoticeCard } from "@/components/ui/institution/noticeCard";
import LateralCalendar from "@/components/ui/lateralCalendar";
import { useTheme } from "@/components/ThemeProvider";

// Main dashboard component for Institution
export default function DashboardTeacher() {
  // Theme management using custom hook
  const { darkMode, toggleTheme } = useTheme();
  
  // State for refreshing message list
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to trigger refresh of message list
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Effect to apply dark mode theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    // Main container with dynamic background based on theme
    <div className={`flex ${darkMode ? "bg-[#141414] text-white" : "bg-[#F0F7FF] text-black"}`}>
      {/* Institution sidebar */}
      <SidebarInstitution />
      
      {/* Main content area */}
      <main className="flex-1 pl-6 pb-6 pr-6 pt-2">
        {/* Theme toggle button positioned at the top right */}
        <div className="flex flex-col items-end">
          <Button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Welcome message section */}
        <div className="flex flex-row items-center">
          <WelcomeMessage name="Instituição" />
        </div>

        {/* Notice card component with refresh capability */}
        <NoticeCard onRefresh={handleRefresh}/>

        {/* Message list section */}
        <div className="mt-6 w-full">
          <div className="rounded-xl mt-14">
            {/* Message list with refresh key to force updates */}
            <MessageList key={refreshKey}/>
          </div>
        </div>
      </main>
      
      {/* Right sidebar with calendar */}
      <LateralCalendar />
    </div>
  );
}
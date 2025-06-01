import * as React from "react";
import { Navbar } from "../dashboard/Navbar";
import { Sidebar } from "../dashboard/Sidebar";
import { useTheme } from "../theme-provider";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { theme } = useTheme();
  const isBlueTheme = theme === 'blue';

  return (
    <div className={`flex flex-col h-screen text-white overflow-hidden ${
      isBlueTheme ? 'gradient-box' : 'bg-background'
    }`}>
      <Navbar />
      <div className={`flex flex-1 overflow-hidden ${
        isBlueTheme ? 'blur-box' : ''
      }`}>
        <Sidebar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

import * as React from "react";
import { Navbar } from "../dashboard/Navbar";
import { Sidebar } from "../dashboard/Sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col h-screen text-white gradient-box overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden blur-box">
        <Sidebar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

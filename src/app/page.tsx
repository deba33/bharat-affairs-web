"use client";
import Sidebar from "./components/sidebar";
import Appbar from "./components/appbar";
import { useState } from "react";
import PostsContainer from "./components/posts";
import { CurrentKeyProvider } from "./components/currentkey_provider";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <CurrentKeyProvider>
      <div className="w-full h-full bg-slate-950">
        <Appbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-row gap-4 m-4">
          <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
          <PostsContainer isSidebarOpen={isSidebarOpen}/>
        </div>
      </div>
    </CurrentKeyProvider>
  );
}

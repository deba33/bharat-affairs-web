import React, { useEffect, useState, useContext } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import { CurrentKeyContext } from "./currentkey_provider";

initializeApp(firebaseConfig);

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isSidebarOpen, closeSidebar }: SidebarProps) {
  const [dates, setDates] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const database = getDatabase();
    const refToData = ref(database, "dailyCA");

    get(refToData)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const datesArray = Object.values(data).map((item: any) => item.date);
          setDates(datesArray.slice().reverse());
          const keysArray = Object.keys(data);
          setKeys(keysArray.slice().reverse());
        }
      })
      .catch((error) => {
        console.error("Error reading data(sidebar):", error);
      });
  }, []);

  return (
    <>
      <div className="max-md:hidden">
        <SidebarElements
          dates={dates}
          keys={keys}
          closeSidebar={closeSidebar}
        />
      </div>
      {isSidebarOpen && (
        <div className="md:hidden max-md:w-2/3 max-sm:w-full">
          <SidebarElements
            dates={dates}
            keys={keys}
            closeSidebar={closeSidebar}
          />
        </div>
      )}
    </>
  );
}

interface SidebarElementsProps {
  dates: string[];
  keys: string[];
  closeSidebar: () => void;
}

function SidebarElements({ dates, keys, closeSidebar }: SidebarElementsProps) {
  const currentKeyContext = useContext(CurrentKeyContext);

  const updateCurrentKey = (newKey: string) => {
    currentKeyContext.setCurrentkey(newKey);
    closeSidebar();
  };
  return (
    <div className="w-auto bg-slate-800 p-4 rounded flex flex-col gap-4 justify-center items-center">
      <p className="text-xl text-slate-300">Read Current Affairs</p>
      {dates.length > 0 && typeof dates[0] === "string" && (
        <div className="w-full border-2 p-2 rounded grid place-content-center border-yellow-500">
          <p className="text-xl text-slate-300">
            📖 {new Date(dates[0]).toLocaleString("en-US", { month: "long" })}
          </p>
        </div>
      )}

      {dates.map((date, index) => (
        <div
          key={keys[index]}
          className="w-full bg-slate-950 hover:bg-slate-900 p-2 rounded grid place-content-center transition-shadow duration-300 shadow-md cursor-pointer"
          onClick={() => {
            updateCurrentKey(keys[index]);
          }}
        >
          <p className="text-slate-300">{date}</p>
        </div>
      ))}
      {/* <div className="w-full bg-blue-500 hover:bg-blue-700 p-2 rounded grid place-content-center transition-shadow duration-300 shadow-md cursor-pointer">
        <p className="text-slate-100">Archive</p>
      </div> */}
    </div>
  );
}

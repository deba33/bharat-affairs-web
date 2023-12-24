import React, { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";

initializeApp(firebaseConfig);

export interface CurrentKeyContextType {
  currentkey: string;
  setCurrentkey: React.Dispatch<React.SetStateAction<string>>;
}


export const CurrentKeyContext = createContext<CurrentKeyContextType>({
  currentkey: "",
  setCurrentkey: () => {},
});

export function CurrentKeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentkey, setCurrentkey] = useState<string>("00");

  useEffect(() => {
    const database = getDatabase();
    const refToData = ref(database, "dailyCA");

    get(refToData)
      .then((snapshot) => {
        const data = snapshot.val();
        const keysArray = Object.keys(data).slice().reverse();
        setCurrentkey(keysArray[0]);
      })
      .catch((error) => {
        console.error("Error reading data:", error);
      });
  }, []);

  return (
    <CurrentKeyContext.Provider value={{ currentkey, setCurrentkey }}>
      {children}
    </CurrentKeyContext.Provider>
  );
}

export function useCurrentKey() {
  return useContext(CurrentKeyContext);
}

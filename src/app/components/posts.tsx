import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import ReactMarkdown from "react-markdown";
import { firebaseConfig } from "../firebase";
import { useCurrentKey } from "./currentkey_provider";

import "../scss/posts.scss";

initializeApp(firebaseConfig);

interface PostsContainerProps {
  isSidebarOpen: boolean;
}

export default function PostsContainer({ isSidebarOpen }: PostsContainerProps) {
  const currentkey = useCurrentKey().currentkey;
  const [currentdate, setCurrentDate] = useState<String>();
  const [caData, setCAData] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const refToData = ref(database, `dailyCA/${currentkey}`);

    try {
      get(refToData)
        .then((snapshot) => {
          const data = snapshot.val();
          setCurrentDate(data.date);
          const extractedData = data.ca.map((item: any) => {
            const { source, imgurl, header, body } = item;
            return {
              source,
              imgurl,
              header,
              body,
            };
          });
          setCAData(extractedData);
        })
        .catch((error) => {
          console.error("Error reading data(posts):", error);
        });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }, [currentkey]);
  return (
    <>
      {currentdate && (
        <>
          <div className="max-sm:hidden w-full">
            <PostElements currentdate={currentdate} caData={caData} />
          </div>
          {!isSidebarOpen && (
            <div className="sm:hidden w-full">
              <PostElements currentdate={currentdate} caData={caData} />
            </div>
          )}
        </>
      )}
    </>
  );
}

interface PostElementsProps {
  currentdate: String;
  caData: never[];
}

function PostElements({ currentdate, caData }: PostElementsProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-slate-800 p-4 rounded">
        <p className="text-xl text-slate-300">{currentdate}</p>
      </div>

      {caData.map((item, index) => (
        <div
          key={index}
          className="w-full bg-slate-800 p-4 my-2 rounded flex flex-row max-md:flex-col justify-between max-md:items-center"
        >
          <div className="flex flex-col gap-2 pr-2">
            <p className="text-xl text-slate-300">
              {index + 1}. {item["header"]}
            </p>
            <ReactMarkdown className="prose prose-li:text-slate-300 prose-strong:text-yellow-600">
              {item["body"]}
            </ReactMarkdown>
          </div>
          <div className="post-image max-md:order-first max-md:py-4 max-md:grid max-md:place-content-center flex flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={item["imgurl"]} src={item["imgurl"]} />
            <p className="text-xs italic text-slate-300 mt-1">
              source: {item["source"]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

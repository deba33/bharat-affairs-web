import Image from "next/image";

export default function PrimaryAppbar() {
  return (
    <div className="bg-slate-800 flex flex-row items-center rounded">
      <div className="grow"></div>
      <div className="w-12 h-12 m-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}  
        <img alt="logo" src="/icon-512.png" width={50} height={50} />
      </div>

      <p className="text-2xl m-4 text-slate-300">
        Bharat Affairs
      </p>
      <div className="grow"></div>
      
    </div>
  );
}

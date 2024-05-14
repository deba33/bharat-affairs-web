import Image from "next/image";

export default function PrimaryAppbar() {
  return (
    <div className="w-full bg-slate-800 flex flex-col md:flex-row items-center">
      <div className="w-12 h-12 m-4  max-md:hidden">
        <Image alt="logo" src="/icon-512.png" width={50} height={50} />
      </div>

      <p className="text-2xl m-4 max-md:mt-4 max-md:mb-0 text-slate-300">
        Bharat Affairs
      </p>
      <div className="grow max-md:hidden"></div>
      <div className="m-4">
        <a
          href="https://github.com/deba33/bharat-affairs-web/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Android App
        </a>
      </div>
    </div>
  );
}

import { Menu } from "react-feather";

interface SecondaryAppbarProps {
  toggleSidebar: () => void;
}

export default function SecondaryAppbar({
  toggleSidebar,
}: SecondaryAppbarProps) {
  return (
    <div className="w-full h-auto md:hidden my-1 p-2 bg-slate-800 rounded">
      <div onClick={toggleSidebar} className="cursor-pointer w-min p-2">
        <Menu color="white"/>
      </div>
    </div>
  );
}

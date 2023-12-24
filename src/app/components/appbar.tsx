import PrimaryAppbar from "./primaryAppbar";
import SecondaryAppbar from "./secondaryAppbar";

interface AppBarProps {
  toggleSidebar: () => void;
}

export default function Appbar({ toggleSidebar }: AppBarProps) {
  return (
    <div className="w-full flex flex-col">
      <PrimaryAppbar />
      <SecondaryAppbar toggleSidebar={toggleSidebar} />
    </div>
  );
}

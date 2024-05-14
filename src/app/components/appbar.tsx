import PrimaryAppbar from "./primaryAppbar";
import SecondaryAppbar from "./secondaryAppbar";

interface AppBarProps {
  toggleSidebar: () => void;
}

export default function Appbar({ toggleSidebar }: AppBarProps) {
  return (
    <div className="flex flex-col mx-2 mt-2">
      <PrimaryAppbar />
      <SecondaryAppbar toggleSidebar={toggleSidebar} />
    </div>
  );
}

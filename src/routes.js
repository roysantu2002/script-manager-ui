import { FaServer, FaCode, FaPlay, FaHistory } from 'react-icons/fa';
import { IoHomeOutline, IoGridOutline } from 'react-icons/io5';

const routes = [
  {
    to: "/",
    name: "Home",
    Icon: IoHomeOutline,
    role: ["admin", "user"],
  },
  {
    to: "/devices",
    name: "Network Devices",
    Icon: FaServer,
    role: ["admin"],
  },
  {
    to: "/scripts",
    name: "Scripts",
    Icon: FaCode,
    role: ["admin"],
  },
  {
    to: "/execute-script",
    name: "Execute Script",
    Icon: FaPlay,
    role: ["admin"],
  },
  {
    to: "/logs",
    name: "Logs",
    Icon: FaHistory,
    role: ["admin"],
  },
  {
    to: "/dashboard",
    name: "Dashboard",
    Icon: IoGridOutline,
    role: ["user"],
  },
  {
    to: "/devices",
    name: "Device Status",
    Icon: FaServer,
    role: ["user"],
  },
  {
    to: "/scripts",
    name: "Script Library",
    Icon: FaCode,
    role: ["user"],
  },
  {
    to: "/execute-script",
    name: "Execute Script",
    Icon: FaPlay,
    role: ["user"],
  },
  {
    to: "/logs",
    name: "Activity Logs",
    Icon: FaHistory,
    role: ["user"],
  },
];

export default routes;

import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { IoMdAlert, IoMdSettings } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";


export const sidebarItems = [
    {
        key: "/dashboard",
        icon: <MdDashboard />,
        title: "Dashboard",
    },
    // {
    //   key: "",
    //   icon: <FaRegEnvelope />,
    //   title: "Transaction",
    //   children: [
    //     {
    //       key: "/transaction/overview",
    //       title: "Overview",
    //     },
    //     {
    //       key: "/transaction/refunds",
    //       title: "Refunds",
    //     },
    //   ],
    // },
    {
        key: "/dashboard/users",
        icon: <FaUserFriends />,
        title: "Users",
    },
    {
        key: "/dashboard/settings",
        icon: <IoMdSettings />,
        title: "Settings",
    },
    {
        key: "/dashboard/alerts",
        icon: <IoMdAlert />,
        title: "Alerts",
    },

    {
        key: "/login",
        icon: <FiLogOut />,
        title: "Log Out",
    },
];

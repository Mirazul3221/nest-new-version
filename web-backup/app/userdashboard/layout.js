import { Children } from "react";
import Navbar from "./components/Navbar";
import Profile from "../components/Profile";


export default function DashboardLayout ({children}) {
return (
    <div>
    {children}
    </div>
)
}
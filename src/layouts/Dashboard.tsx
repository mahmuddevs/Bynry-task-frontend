import { Outlet } from "react-router"
import Sidebar from "../components/Sidebar"

const Dashboard = () => {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2 bg-stone-500 h-screen sticky top-0">
                <Sidebar />
            </div>
            <div className="col-span-10">
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard
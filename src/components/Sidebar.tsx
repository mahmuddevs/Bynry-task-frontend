import { FaPlus, FaUser } from "react-icons/fa"
import { Link, NavLink } from "react-router"

const Sidebar = () => {
    return (
        <aside className="text-white">
            <h3 className="text-xl md:text-3xl mb-3 md:mb-0 p-3 md:p-6"><Link to='/'>Logo</Link></h3>
            <ul className="dash-nav">
                <li className="hover:bg-black/70 transition-colors duration-300"><NavLink className="flex gap-4 items-center py-4 px-6" to='/dashboard' end><FaUser /> <span className="hidden sm:inline">Users</span></NavLink></li>
                <li className="hover:bg-black/70 transition-colors duration-300"><NavLink className="flex gap-4 items-center py-4 px-6" to='/dashboard/add-user'><FaPlus /> <span className="hidden sm:inline">Add User</span></NavLink></li>
            </ul>
        </aside>
    )
}
export default Sidebar
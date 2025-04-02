import { createBrowserRouter } from "react-router";
import App from "../layouts/App";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import Dashboard from "../layouts/Dashboard";
import Users from "../pages/Dashboard/Users/Users";
import AddUsers from "../pages/Dashboard/Add-Users/AddUsers";
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/users/:id',
                element: <Details />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Users />
            },
            {
                path: '/dashboard/add-user',
                element: <AddUsers />
            }
        ]
    }
])

export default router
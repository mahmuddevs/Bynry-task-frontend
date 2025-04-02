import { createBrowserRouter } from "react-router";
import App from "../layouts/App";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
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
])

export default router
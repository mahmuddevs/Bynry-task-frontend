import { Outlet } from "react-router"
import Header from "../components/Header"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { setUsers } from "../app/slices/usersSlice/usersSlice"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/users/`)
      .then((res) => {
        dispatch(setUsers(res.data.users))
      })
  }, [])

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
export default App
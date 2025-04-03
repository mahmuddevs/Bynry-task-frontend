import { useDispatch } from "react-redux"
import { ReactNode, useEffect } from "react"
import axios from "axios"
import { setUsers } from "../app/slices/usersSlice/usersSlice"

const UserStateProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/users/`)
            .then((res) => {
                dispatch(setUsers(res.data.users))
            })
    }, [dispatch])
    return (
        <div>{children}</div>
    )
}
export default UserStateProvider
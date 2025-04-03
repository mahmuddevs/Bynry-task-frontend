import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import Spinner from "../../../components/Spinner"
import UsersTable from "../../../components/UsersTable"

const Users = () => {
    const users = useSelector((state: RootState) => state.users)


    return (
        <div>
            {
                users ? (
                    <UsersTable users={users} />
                ) : (
                    <Spinner small={false} />
                )
            }
        </div>
    )
}
export default Users
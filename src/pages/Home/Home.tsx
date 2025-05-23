import { useSelector } from "react-redux"
import { RootState } from "../../app/store";
import UserCard from "../../components/UserCard";


const Home = () => {
    const users = useSelector((state: RootState) => state.users);

    return (
        <div className="global-margin my-24">
            <div>
                <h1 className="text-3xl font-semibold">All Users</h1>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                {
                    users.map((user) => (
                        <UserCard key={user._id} {...user} />
                    ))
                }
            </div>
        </div>
    )
}
export default Home
import { useSelector } from "react-redux"
import { RootState } from "../../app/store";
import UserCard from "../../components/UserCard";


const Home = () => {
    const users = useSelector((state: RootState) => state.users);

    return (
        <div className="global-margin my-24">
            {
                users.map((user) => (
                    <UserCard key={user._id} {...user} />
                ))
            }
        </div>
    )
}
export default Home
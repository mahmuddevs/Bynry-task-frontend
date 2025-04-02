import { useSelector } from "react-redux"
import { RootState } from "../../app/store";


const Home = () => {
    const users = useSelector((state: RootState) => state.users);

    console.log(users)

    return (
        <div>Home</div>
    )
}
export default Home
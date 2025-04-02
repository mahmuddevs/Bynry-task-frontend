import { Link } from "react-router";


interface User {
    _id: string;
    name: string;
    photo: string;
    email: string;
    description: string;
    location: {
        address: string;
    };
}

const UserCard = ({ _id, name, photo, email, description, location }: User) => {
    return (
        <Link to={`/users/${_id}`} className="bg-white shadow-md rounded-lg p-4 w-72 flex flex-col items-center text-center">
            <img
                src={import.meta.env.VITE_SERVER_URL + photo}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <h2 className="text-lg font-semibold mt-2">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
            <p className="text-xs text-gray-500 mt-2">{location.address}</p>
        </Link>
    )
}
export default UserCard
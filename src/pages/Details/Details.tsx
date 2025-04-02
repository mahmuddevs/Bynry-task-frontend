import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { User } from "../../app/slices/usersSlice/usersSlice"
import { FaLinkedin, FaTwitter, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import MapComponent from "../../components/MapComponent";

const Details = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${id}`)
            .then(res => {
                setUser(res?.data);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Spinner small={false} />;
    }

    return (
        <div className="global-margin my-24">
            {user && (
                <>
                    <div className="mx-auto bg-white shadow-lg rounded-lg p-8 mb-4">
                        <div className="flex items-center space-x-8">
                            <img
                                src={import.meta.env.VITE_SERVER_URL + user.photo}
                                alt={user.name}
                                className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                            />
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-lg text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <p className="mt-6 text-lg text-gray-700">{user.description}</p>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center text-gray-700 space-x-3">
                                <FaMapMarkerAlt className="text-red-500 text-xl" />
                                <p className="text-lg">{user.location.address}</p>
                            </div>
                            <div className="flex items-center text-gray-700 space-x-3">
                                <FaPhone className="text-green-500 text-xl" />
                                <p className="text-lg">{user.contact.phone}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex space-x-6">
                            {user.contact.social.linkedin && (
                                <a href={user.contact.social.linkedin} target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="text-blue-600 text-3xl hover:text-blue-800" />
                                </a>
                            )}
                            {user.contact.social.twitter && (
                                <a href={user.contact.social.twitter} target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="text-blue-400 text-3xl hover:text-blue-600" />
                                </a>
                            )}
                        </div>
                    </div>
                    <MapComponent {...user.location} />
                </>
            )}
        </div>
    );
};

export default Details;

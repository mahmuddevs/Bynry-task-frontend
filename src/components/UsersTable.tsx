import { FaNoteSticky, FaPencil } from "react-icons/fa6"
import { FaTrash } from "react-icons/fa"
import { Link } from "react-router"
import axios from "axios"
import Swal from "sweetalert2"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { removeUser, User } from "../app/slices/usersSlice/usersSlice"
import UpdateModal from "./UpdateModal"
import { selectUser } from "../app/slices/userSelectSlice/userSelectSlice"

const UsersTable = ({ users }: { users: User[] }) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const dispatch = useDispatch()


    const handleEdit = (user: User) => {
        dispatch(selectUser(user))
        setTimeout(() => {
            if (modalRef.current) {
                modalRef.current.showModal();
            }
        }, 0)
    }

    const handleModalClose = () => {
        if (modalRef.current) {
            modalRef.current.close()
        }
    }

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/delete/${id}`)
                    .then((res) => {
                        if (res.data.success) {
                            const { message } = res.data
                            Swal.fire({
                                title: "Deleted!",
                                text: `${message}`,
                                icon: "success"
                            });
                            dispatch(removeUser(id))
                        }
                    })
            }
        });
    }

    return (
        <div className="overflow-x-auto">
            <UpdateModal ref={modalRef} closeModal={handleModalClose} />
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="hidden md:table-cell">Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td><img className="h-10 w-10" src={import.meta.env.VITE_SERVER_URL + `/${user.photo}`} alt={user.name} /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="hidden md:table-cell">{user.location.address}</td>
                                <td className="flex mt-2 text-2xl gap-2">
                                    <Link to={`/users/${user._id}`}><FaNoteSticky className="text-primary cursor-pointer" /></Link>
                                    <FaPencil onClick={() => { handleEdit(user) }} className="text-success cursor-pointer" />
                                    <FaTrash onClick={() => { handleDelete(user._id) }} className="text-error cursor-pointer" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default UsersTable
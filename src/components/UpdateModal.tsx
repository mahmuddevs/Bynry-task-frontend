import { forwardRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Swal from "sweetalert2";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserFormValues } from "./AddUserForm";
import { updateUser, User } from "../app/slices/usersSlice/usersSlice";

interface ModalProps {
    closeModal: () => void;
}

const UpdateModal = forwardRef<HTMLDialogElement, ModalProps>(({ closeModal }, ref) => {
    const user = useSelector((state: RootState) => state.selectedUser) as User | null;
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<UserFormValues>();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.contact?.phone || "",
                address: user.location.address || "",
                linkedin: user.contact?.social?.linkedin || "",
                twitter: user.contact?.social?.twitter || "",
                description: user.description || "",
                photo: undefined,
            });
        }
    }, [user, reset]);

    const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
        const { name, photo, description, email, address, phone, linkedin, twitter } = data;

        const contact = {
            phone,
            social: {
                linkedin,
                twitter,
            },
        };

        const payload = {
            name,
            photo: selectedImage ? selectedImage : (user?.photo || photo[0]),
            description,
            email,
            address,
            contact,
        };

        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/users/update/${user?._id}`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const { message } = res.data;
            if (res.data?.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(updateUser(res.data.user));
                reset();
                closeModal();
            }
        } catch (err: any) {
            console.log(err.message);
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `Something Went Wrong`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (!user) {
        return null;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    return (
        <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box !max-w-4xl">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="max-w-4xl mx-auto bg-base-200 p-6 rounded-lg shadow-lg space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <h2 className="text-2xl font-bold text-center text-neutral sm:col-span-2">Update User</h2>

                    <div className="sm:col-span-1">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" className="input input-bordered w-full" placeholder="John Doe" {...register("name", { required: "Name is required" })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="sm:col-span-1">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" className="input input-bordered w-full" placeholder="abc@xyz.com" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="sm:col-span-1">
                        <label className="label"><span className="label-text">Phone (With Country Code)</span></label>
                        <input type="text" className="input input-bordered w-full" placeholder="+123456789" {...register("phone", { required: "Phone number is required" })} />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div className="sm:col-span-1">
                        <label className="label"><span className="label-text">Address</span></label>
                        <input type="text" className="input input-bordered w-full" placeholder="221B Baker Street, London, UK" {...register("address", { required: "Address is required" })} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div className="sm:col-span-1">
                        <label className="label"><span className="label-text">LinkedIn</span></label>
                        <input type="text" className="input input-bordered w-full" placeholder="https://linkedin.com/in/your-profile" {...register("linkedin", { required: "LinkedIn profile is required", pattern: { value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/, message: "Enter a valid LinkedIn URL" } })} />
                        {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
                    </div>

                    <div className="sm:col-span-1">
                        <label className="label"><span className="label-text">Twitter</span></label>
                        <input type="text" className="input input-bordered w-full" placeholder="https://x.com/yourprofile" {...register("twitter", { required: "Twitter profile is required", pattern: { value: /^(https?:\/\/)?(www\.)?x\.com\/.*$/, message: "Enter a valid Twitter URL" } })} />
                        {errors.twitter && <p className="text-red-500 text-sm">{errors.twitter.message}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Short bio..." {...register("description", { required: "Description is required" })}></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="label"><span className="label-text">Photo</span></label>
                        <div>
                            <img className="h-20 w-20 my-4" src={selectedImage ? URL.createObjectURL(selectedImage) : `${import.meta.env.VITE_SERVER_URL}/${user?.photo}`} alt="User Photo" />
                        </div>
                        <input type="file" className="file-input" {...register("photo")} onChange={handleImageChange} />
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-neutral w-full mt-4 sm:col-span-2" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update User"}
                    </button>
                </form>

                <div className="sm:col-span-2 mt-4">
                    <button onClick={closeModal} className="btn w-full">Close</button>
                </div>
            </div>
        </dialog>
    );
});

export default UpdateModal;

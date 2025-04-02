import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface UserFormValues {
    name: string;
    photo: FileList;
    description: string;
    email: string;
    address: string;
    phone: string;
    linkedin: string;
    twitter: string;
}

const AddUserForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<UserFormValues>();

    const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
        const { name, photo, description, email, address, phone, linkedin, twitter } = data

        const contact = {
            phone,
            social: {
                linkedin,
                twitter
            }
        }

        const payload = {
            name, photo: data.photo[0], description, email, address, contact
        }

        console.log(payload)

        axios.post(`${import.meta.env.VITE_SERVER_URL}/users/create`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((res) => {
                const { message } = res.data
                if (res.data.sucess) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // reset();
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: `Something Went Wrong`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((err) => { console.log(err.message) })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="max-w-2xl mx-auto bg-base-200 p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-center text-neutral">Add User</h2>

            <div>
                <label className="label"><span className="label-text">Name</span></label>
                <input type="text" className="input input-bordered w-full"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <label className="label"><span className="label-text">Email</span></label>
                <input type="email" className="input input-bordered w-full"
                    placeholder="abc@xyz.com"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                        }
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <label className="label"><span className="label-text">Phone (With Country Code)</span></label>
                <input type="text" className="input input-bordered w-full"
                    placeholder="+123456789"
                    {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
                <label className="label"><span className="label-text">Address (Example: 221B Baker Street, London, UK)</span></label>
                <input type="text" className="input input-bordered w-full"
                    placeholder="221B Baker Street, London, UK"
                    {...register("address", { required: "Address is required" })}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

            <div>
                <label className="label"><span className="label-text">LinkedIn</span></label>
                <input type="text" className="input input-bordered w-full"
                    placeholder="https://linkedin.com/in/your-profile"
                    {...register("linkedin", {
                        required: "LinkedIn profile is required",
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                            message: "Enter a valid LinkedIn URL"
                        }
                    })}
                />
                {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
            </div>

            <div>
                <label className="label"><span className="label-text">Twitter</span></label>
                <input type="text" className="input input-bordered w-full"
                    placeholder="https://x.com/yourprofile"
                    {...register("twitter", {
                        required: "Twitter profile is required",
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?x\.com\/.*$/,
                            message: "Enter a valid Twitter URL"
                        }
                    })}
                />
                {errors.twitter && <p className="text-red-500 text-sm">{errors.twitter.message}</p>}
            </div>

            <div>
                <label className="label"><span className="label-text">Description</span></label>
                <textarea className="textarea textarea-bordered w-full"
                    placeholder="Short bio..."
                    {...register("description", { required: "Description is required" })}
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div>
                <label className="label"><span className="label-text">Photo</span></label>
                <div>
                    <input type="file" className="file-input"
                        {...register("photo", { required: "Photo is required" })}
                    />
                </div>
                {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add User"}
            </button>
        </form>
    );
};

export default AddUserForm;

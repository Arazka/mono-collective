import AuthDashboardLayout from "@/Layouts/AuthDashboard";
import { useState } from "react";
import ProfileInformation from "./ProfileInformation";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { usePage } from "@inertiajs/react";

export default function AccountInfoPage() {
    const [isEditDetail, setIsEditDetail] = useState(false);
    const user = usePage().props.auth.user;

    return (
        <AuthDashboardLayout title="Account Info">
            {/* header content */}
            <div className="hidden lg:flex lg:mb-4">
                <h1 className="w-full text-start text-xl font-semibold text-dark-green">
                    Account Info
                </h1>
            </div>

            {/* content */}
            <div>
                {/* my detail */}
                <div className="w-full border border-gray-300 rounded-3xl p-6 mb-4">
                    <div className="w-full flex justify-between items-start">
                        <p className="font-medium">My Details</p>
                        <button
                            onClick={() => setIsEditDetail((prev) => !prev)}
                            type="button"
                            className="underline underline-offset-4 tracking-wider"
                        >
                            {isEditDetail ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    <hr className="mb-6 mt-4" />

                    {isEditDetail ? (
                        <UpdateProfileInformationForm user={user} />
                    ) : (
                        <ProfileInformation user={user} />
                    )}
                </div>

                {/* change password */}
                <div className="w-full border border-gray-300 rounded-3xl p-6">
                    <div className="w-full flex justify-between items-start">
                        <p className="font-medium">Change Password</p>
                    </div>

                    <hr className="my-4" />

                    <UpdatePasswordForm />
                </div>
            </div>
        </AuthDashboardLayout>
    );
}

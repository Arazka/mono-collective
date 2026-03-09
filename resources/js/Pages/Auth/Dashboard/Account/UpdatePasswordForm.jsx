import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/ui/Button";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            showProgress: false,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className="mt-6 space-y-6">
            <div>
                <InputLabel
                    htmlFor="current_password"
                    value="Current Password"
                />

                <TextInput
                    id="current_password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) =>
                        setData("current_password", e.target.value)
                    }
                    type="password"
                    placeholder="Enter your current password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                />

                <InputError
                    message={errors.current_password}
                    className="mt-2"
                />
            </div>

            <div>
                <InputLabel htmlFor="password" value="New Password" />

                <TextInput
                    id="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    type="password"
                    placeholder="Enter your new password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                />

                <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    type="password"
                    placeholder="Confirm your new password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                />

                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="flex items-center gap-4 text-end w-full justify-end">
                <Button
                    type="submit"
                    loading={processing}
                    variant="primary"
                    className="w-full sm:w-[10rem]"
                >
                    Save
                </Button>
            </div>
        </form>
    );
}

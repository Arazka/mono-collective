import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/ui/Button";
import { useForm } from "@inertiajs/react";

export default function UpdateProfileInformationForm({ user }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const hanldeSubmit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            showProgress: false,
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={hanldeSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Enter your name"
                    required
                    isFocused
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="text-end">
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

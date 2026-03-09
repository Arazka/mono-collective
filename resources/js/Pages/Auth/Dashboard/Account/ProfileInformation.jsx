export default function ProfileInformation({ user }) {
    return (
        <div>
            <div className="mb-4">
                <p className="text-gray-400 uppercase font-medium text-xs tracking-wider mb-1">
                    name
                </p>
                <p className="text-base text-gray-900 font-semibold leading-relaxed max-w-[18rem]">
                    {user.name}
                </p>
            </div>

            <div className="mb-4">
                <p className="text-gray-400 uppercase font-medium text-xs tracking-wider mb-1">
                    email
                </p>
                <p className="text-base text-gray-900 font-semibold leading-relaxed max-w-[18rem]">
                    {user.email}
                </p>
            </div>
        </div>
    );
}

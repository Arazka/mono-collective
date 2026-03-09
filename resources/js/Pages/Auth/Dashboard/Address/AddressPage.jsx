import AddressItem from "@/Components/AuthDashboard/Address/AddressItem";
import AuthDashboardLayout from "@/Layouts/AuthDashboard";
import LinkButton from "@/Components/ui/LinkButton";

export default function AddressPage({ addresses }) {
    return (
        <AuthDashboardLayout title="My Address">
            {/* header content */}
            <div className="hidden lg:flex lg:mb-4">
                <h1 className="w-full text-start text-xl font-semibold text-dark-green">
                    My Address
                </h1>
            </div>
            {/* content */}
            <div className="flex flex-col space-y-3 max-h-[30rem] overflow-y-auto scrollbar-hide mb-6">
                {addresses.length > 0 ? (
                    addresses.map((data, index) => (
                        <AddressItem key={index} address={data} />
                    ))
                ) : (
                    <span className="h-[12.5rem] text-center flex flex-col justify-center items-center text-sm tracking-wide capitalize text-gray-400">
                        address not found
                    </span>
                )}
            </div>
            {/* button add new address */}
            <div className="w-full text-center">
                <LinkButton href={`/account/address/create`} variant="primary">
                    Add New Address
                </LinkButton>
            </div>
        </AuthDashboardLayout>
    );
}

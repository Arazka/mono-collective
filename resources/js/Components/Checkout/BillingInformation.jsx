export default function BillingInformation() {
    return (
        <div className="p-6 bg-white shadow-sm rounded-2xl">
            <p className="pb-1 text-base font-medium tracking-tight border-b border-gray-300">
                Billing Information
            </p>
            <div className="flex flex-col mt-4 space-y-4 tracking-tight">
                <div>
                    <p className="text-xs tracking-wider text-gray-500 uppercase">
                        Billing Name
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                        John Doe
                    </p>
                </div>
                <div>
                    <p className="text-xs tracking-wider text-gray-500 uppercase">
                        Billing Email
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                        johndoe11@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
}

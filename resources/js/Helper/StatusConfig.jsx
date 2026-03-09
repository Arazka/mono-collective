export default function StatusConfig({ value }) {
    const statuses = {
        1: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
        2: { label: "Processing", className: "bg-blue-100 text-blue-700" },
        3: { label: "Shipped", className: "bg-purple-100 text-purple-700" },
        4: { label: "Completed", className: "bg-green-100 text-green-700" },
        5: { label: "Cancelled", className: "bg-red-100 text-red-700" },
    };

    const status = statuses[value] || {
        label: "Unknown",
        className: "bg-gray-100 text-gray-700",
    };

    return (
        <div
            className={`flex items-center space-x-1 px-4 py-1.5 rounded-md text-xs font-medium ${status.className}`}
        >
            {status.label}
        </div>
    );
}

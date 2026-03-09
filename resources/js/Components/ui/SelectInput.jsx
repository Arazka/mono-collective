export default function SelectInput({
    id,
    value,
    onChange,
    defaultOption,
    items,
    disabled = false,
}) {
    return (
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`appearance-none outline-none rounded-full mt-1 px-4 pr-8 py-3.5 font-semibold text-gray-900 text-sm border-gray-300 shadow-sm focus:border-light-green focus:ring-light-green w-full transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-500`}
        >
            <option value="" className="text-gray-400">
                {defaultOption}
            </option>
            {items?.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
}

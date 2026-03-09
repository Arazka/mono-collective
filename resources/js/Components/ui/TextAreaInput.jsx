export default function TextAreaInput({
    id,
    name,
    value,
    onChange,
    className = "",
}) {
    return (
        <textarea
            rows={4}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={
                "appearance-none outline-none rounded-3xl px-5 py-3.5 font-semibold text-sm border-gray-300 focus:border-light-green focus:ring-light-green transition-all duration-300 shadow-sm " +
                className
            }
        />
    );
}

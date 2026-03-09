import toast from "react-hot-toast";

export default function customToast(message) {
    return toast.custom((t) => (
        <div
            className={`${
                t.visible ? "animate-enter" : "animate-leave"
            } bg-gray-900 text-white rounded-lg p-5 font-light shadow-lg max-w-2xl w-full text-start text-sm`}
        >
            {message}
        </div>
    ));
}

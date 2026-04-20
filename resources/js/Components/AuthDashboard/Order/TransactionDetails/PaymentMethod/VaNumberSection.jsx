import {
    ClipboardDocumentCheckIcon,
    ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function VaNumberSection({ vaNumber }) {
    const [isCopiedVA, setIsCopiedVA] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setIsCopiedVA(true);
        setTimeout(() => {
            setIsCopiedVA(false);
        }, 2000);
    };

    return (
        <div className="py-4 bg-indigo-50 rounded-lg px-4 border-l-4 border-indigo-500">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">
                    Virtual Account Number
                </span>
                <CopyButton
                    text={vaNumber}
                    isCopiedVA={isCopiedVA}
                    handleCopy={handleCopy}
                    className={`hidden sm:flex`}
                />
            </div>
            <div className="">
                <div className="text-xl font-bold text-indigo-700 break-words">
                    {vaNumber}
                </div>
                <CopyButton
                    text={vaNumber}
                    isCopiedVA={isCopiedVA}
                    handleCopy={handleCopy}
                    className={`flex sm:hidden`}
                />
            </div>
            <ul className="mt-3 text-xs text-gray-600 list-disc ml-4">
                <li>Transfer sesuai dengan nominal total pembayaran</li>
                <li>
                    Pembayaran akan otomatis terkonfirmasi setelah transfer
                    berhasil
                </li>
            </ul>
        </div>
    );
}

const CopyButton = ({ text, isCopiedVA, handleCopy, className }) => {
    return (
        <button
            onClick={() => handleCopy(text)}
            className={`${className} flex items-center gap-2 px-3 py-1.5 bg-indigo-500 text-white rounded text-xs hover:bg-indigo-600 transition-colors`}
        >
            {isCopiedVA ? (
                <ClipboardDocumentCheckIcon className="size-4" />
            ) : (
                <ClipboardDocumentIcon className="size-4" />
            )}
            <span>{isCopiedVA ? "Copied!" : "Copy"}</span>
        </button>
    );
};

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Drawer({
    children,
    position = "right",
    open,
    setOpen,
    title = "menu",
}) {
    const translateFrom =
        position === "right" ? "translate-x-full" : "-translate-x-full";

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            {/* Backdrop */}
            <TransitionChild
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            </TransitionChild>

            {/* Wrapper */}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`pointer-events-none fixed inset-y-0 ${
                            position === "right" ? "right-0" : "left-0"
                        } flex max-w-full`}
                    >
                        {/* Panel */}
                        <TransitionChild
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom={translateFrom}
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo={translateFrom}
                        >
                            <DialogPanel className="pointer-events-auto relative w-screen max-w-[26rem] bg-white shadow-xl">
                                <div className="relative flex h-full flex-col overflow-y-auto py-6">
                                    {/* Header */}
                                    <div className="px-4 sm:px-6 flex items-center justify-between">
                                        <DialogTitle className="text-lg font-semibold text-gray-900 capitalize">
                                            {title}
                                        </DialogTitle>

                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="rounded-full p-2 text-gray-400 hover:text-dark-green hover:bg-light-green/30 focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2 transition-colors"
                                        >
                                            <span className="sr-only">
                                                Close panel
                                            </span>
                                            <XMarkIcon className="size-6" />
                                        </button>
                                    </div>

                                    {/* Body */}
                                    <div className="relative mt-8 flex-1 px-4 sm:px-6">
                                        {children}
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

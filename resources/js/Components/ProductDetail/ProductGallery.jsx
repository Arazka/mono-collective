import { useState } from "react";

export default function ProductGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0].image);

    return (
        <div className="flex flex-col-reverse items-start justify-start lg:h-full lg:w-full gap-2 lg:flex-row">
            {/* thumb list */}
            <div className="h-full">
                <div className="flex flex-row items-center space-x-1.5 overflow-x-auto lg:space-x-0 lg:space-y-1.5 lg:flex-col lg:overflow-y-auto scrollbar-hide h-full">
                    {images.map((data, index) => {
                        return (
                            <img
                                key={index}
                                src={`/storage/${data.image}`}
                                onClick={() => setSelectedImage(data.image)}
                                alt=""
                                className={`w-[5rem] h-auto object-cover object-top rounded-lg cursor-pointer border ${
                                    selectedImage === data.image
                                        ? "border-dark-green"
                                        : " border-white"
                                } `}
                            />
                        );
                    })}
                </div>
            </div>

            {/* main image */}
            <div className="w-full h-auto">
                <img
                    src={`/storage/${selectedImage}`}
                    alt=""
                    className="rounded-lg object-cover w-full h-auto"
                />
            </div>
        </div>
    );
}

export default function SizeSelector({ sizes, selectedSize, onSelectedSize }) {
    return (
        <div className="mt-8">
            {/* <p className="text-sm">Select size: {selectedSize}</p> */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
                {sizes.map((data, index) => {
                    const isSelected = selectedSize === data.id;
                    const isOutOfStock = data.stock === 0;

                    return (
                        <div key={index}>
                            <button
                                onClick={() => onSelectedSize(data.id)}
                                disabled={isOutOfStock}
                                className={`h-12 w-16 rounded-lg border text-sm uppercase
                                  ${
                                      isSelected
                                          ? "border-2 border-dark-green bg-white text-dark-green font-bold"
                                          : isOutOfStock
                                          ? "border-gray-200 bg-gray-200 text-gray-400 cursor-not-allowed"
                                          : "border-dark-green bg-white text-dark-green hover:border-2 hover:border-dark-green hover:font-bold hover:text-dark-green"
                                  }
                                `}
                            >
                                {data.size}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

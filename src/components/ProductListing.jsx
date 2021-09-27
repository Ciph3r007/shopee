import React, { useContext } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import { Context } from "../context/ContextProvider";

const ProductListing = () => {
  const {
    products,
    inCart,
    handleIncrement: onIncrement,
    handleDecrement: onDecrement,
  } = useContext(Context);

  return (
    <div className="bg-white max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative flex-col flex justify-between"
          >
            <div className="group">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none shadow-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="bg-white w-full h-full object-center object-contain lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category.toUpperCase()}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900">
              {inCart[product.id] ? (
                <>
                  <button
                    onClick={() => onDecrement(product)}
                    className="bg-blue-700 text-white mx-2 my-2 px-6 py-2 rounded-lg shadow-sm cursor-pointer hover:bg-blue-400"
                  >
                    <MinusIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                  <span className="mx-5 text-xl">
                    {inCart[product.id] || 0}
                  </span>
                  <button
                    onClick={() => onIncrement(product)}
                    className="bg-blue-700 text-white mx-2 my-3 px-6 py-2 rounded-lg shadow-sm cursor-pointer hover:bg-blue-400"
                  >
                    <PlusIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onIncrement(product)}
                  className="flex justify-center items-center mx-2 my-2 px-6 py-2 border border-transparent w-full rounded-md shadow-sm text-base font-medium text-white cursor-pointer bg-indigo-700 hover:bg-indigo-800"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;

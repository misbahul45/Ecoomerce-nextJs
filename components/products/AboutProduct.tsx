'use client'
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface Props {
  product: Product;
  categoryProduct: Category;
}

const AboutProduct = ({ product, categoryProduct }: Props) => {
  const [quantity, setQuantity] = useState<number>(1); // State to manage the quantity

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent decreasing below 1
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="space-y-2">
      <h1 className="text-lg text-slate-600">{product.name}</h1>
      <div>
        <p>
          <span>{product.purchesed}</span>
          <span className="ml-2 text-gray-300">purchased</span>
        </p>
        <p className="font-semibold text-2xl">
          {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
        <p className="text-gray-500 text-[18px] capitalize">category: {categoryProduct?.category}</p>
        <p className="text-gray-500 text-[18px] capitalize">
          stock: {product.purchesed && product.stock - product.purchesed}
        </p>
        <p className="text-gray-500 text-[18px] capitalize">brand: {product.brand}</p>

        <p className="text-gray-500 capitalize text-[18px]">Product Colors</p>
        <div className="flex flex-wrap">
          {product.colors?.map((color, index) => (
            <Button key={index} className="m-1" variant="outline" color={color}>
              {color}
            </Button>
          ))}
        </div>
        {product.size && product.size.length > 0 && (
          <>
            <p className="text-gray-500 capitalize text-[18px]">Product Sizes</p>
            <div className="flex flex-wrap">
              {product.size.map((size, index) => (
                <Button key={index} className="m-1" variant="outline" color={size}>
                  {size}
                </Button>
              ))}
            </div>
          </>
        )}
        <div className="p-4 rounded-md border-2 shadow-slate-800/40 shadow-xl mt-3 flex flex-col justify-center items-center">
          <p className="text-gray-500">Set amount and notes</p>
          <div className="flex gap-3 items-center">
            <Button variant="outline" className="rounded-full" onClick={increaseQuantity}>
              +
            </Button>
            <input
              value={quantity}
              onChange={handleInputChange}
              className="px-4 w-12 text-center rounded text-black border-[1px]"
              type="text"
              inputMode='numeric'
              min="1"
            />
            <Button variant="outline" className="rounded-full" onClick={decreaseQuantity}>
              -
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;

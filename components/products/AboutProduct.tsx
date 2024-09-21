'use client'
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

interface Props {
  product: Product;
  categoryProduct: Category;
}

const AboutProduct = ({ product, categoryProduct }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectColor, setSelectColor] = useState<string>(''); 
  const [selectSize, setSelectSize] = useState<string>('');
  const { toast }=useToast()


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

  const handleBuyProduct = () => {
    if(product.size && (product.size?.length>0)){
      if(!selectColor && !selectSize){
        toast({
          title: 'Error',
          description: !selectColor?'Please select color':'Please select size',
          variant: 'destructive',
        })
      }
    }
    if(!selectColor){
      toast({
        title: 'Error',
        description: !selectColor?'Please select color':'Please select size',
        variant: 'destructive',
      })
    }

  }

  return (
    <div className="space-y-2">
      <h1 className="text-lg text-slate-600">{product.name}</h1>
      <div>
        <p>
          <span className='font-semibold'>{product.purchesed}</span>
          <span className="ml-2 text-gray-300">purchased</span>
        </p>
        <p className="font-semibold text-2xl">
          {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
        <p className="text-gray-500 text-[18px] capitalize">category : <span className="font-semibold">{categoryProduct.category}</span></p>
        <p className="text-gray-500 text-[18px] capitalize">
          stock: <span className="font-semibold">{(product.stock - product.purchesed)}</span>
        </p>
        <p className="text-gray-500 text-[18px] capitalize">brand: <span className="font-semibold">{product.brand}</span></p>

        <p className="text-gray-500 capitalize text-[16px] mt-2">Product Colors</p>
        <div className="flex flex-wrap">
          {product.colors?.map((color, index) => (
            <Button key={index} onClick={() => setSelectColor(color)} className="m-1" variant={selectColor===color ? 'default' : 'outline'} color={color}>
              {color}
            </Button>
          ))}
        </div>
        {product.size && product.size.length > 0 && (
          <>
            <p className="text-gray-500 capitalize text-[16px] mt-2">Product Sizes</p>
            <div className="flex flex-wrap">
              {product.size.map((size, index) => (
                <Button key={index} onClick={() => setSelectSize(size)} className="m-1" variant={selectSize===size ? 'default' : 'outline'} color={size}>
                  {size}
                </Button>
              ))}
            </div>
          </>
        )}
        <div className="p-4 rounded-md border-2 shadow-slate-800/40 shadow-xl mt-3 flex flex-col justify-center items-center">
          <p className="text-gray-500">Set amount and notes</p>
          <div className="flex gap-3 items-center">
            <Button disabled={quantity >= product.stock} className="rounded-full font-bold" onClick={increaseQuantity}>
              +
            </Button>
            <input
              value={quantity}
              onChange={handleInputChange}
              className="px-4 py-2 w-24 text-center rounded text-black border-[1px]"
              type="text"
              inputMode='numeric'
              min="1"
            />
            <Button disabled={quantity === 1}  className="rounded-full font-bold disabled:hover:opacity-70" onClick={decreaseQuantity}>
              -
            </Button>
          </div>
          <p className='text-xl text-gray-700 font-bold my-4'>Total: {(product.price * quantity).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
          <div className="space-y-2 mt-2 w-[80%]">
            <Button onClick={handleBuyProduct} className="w-full bg-blue-600 hover:bg-blue-800 font-semibold">Buy Now</Button>
            <Button className="w-full bg-violet-600 hover:bg-violet-700 font-semibold">Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;

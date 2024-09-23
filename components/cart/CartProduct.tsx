import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { updateCartProduct } from '@/actions/products.actions';

interface CartProductProps {
  cartOnProduct: {
    id: string;
    product: Product;
    size?: string;
    color?: string;
    quantity: number;
    cartId: string;
  };
}

const CartProduct: React.FC<CartProductProps> = ({ cartOnProduct }) => {
    const [quantity, setQuantity] = React.useState(cartOnProduct.quantity);
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
      const updateProduct=async(cartId:string,productId:string, quantity:number)=>{
        await updateCartProduct(cartId, productId, quantity)
    }
      React.useEffect(()=>{
        updateProduct(cartOnProduct.cartId, cartOnProduct.product.id, quantity)
      },[quantity])

  return (
    <div className="flex justify-between ">
      <div className="flex gap-4">
        <input type="checkbox" className="cursor-pointer" />
        <Image
          src={cartOnProduct.product.images[0]}
          alt={cartOnProduct.product.name}
          width={100}
          height={100}
          className="size-36 object-cover rounded-xl"
        />
        <div>
          <p className="mb-1 font-semibold">{cartOnProduct.product.name}</p>
          <button className="block px-2 py-1.5 rounded-md text-sm bg-slate-200 mb-1">
            {cartOnProduct.product.location}
          </button>
          {cartOnProduct.size && (
            <button className="block px-2 py-1.5 rounded-md text-sm bg-slate-200 mb-1">
              {cartOnProduct.size}
            </button>
          )}
          {cartOnProduct.color && (
            <button className="block px-2 py-1.5 rounded-md text-sm bg-slate-200 mb-1">
              {cartOnProduct.color}
            </button>
          )}
        </div>
      </div>
      <div className='flex flex-col items-center space-y-2'>
        <p>
          <span className="font-semibold">
            {(
              cartOnProduct.product.price * quantity
            ).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
          </span>{' '}
          <span className="text-sm text-slate-500">x{cartOnProduct.quantity}</span>
        </p>
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-3 items-center">
            <Button disabled={quantity >= cartOnProduct.product.stock} className="rounded-full font-bold" onClick={increaseQuantity}>
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
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

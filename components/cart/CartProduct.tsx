import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { updateCartProduct } from '@/actions/carts.actions';
import DeleteProduct from './DeleteProduct';
import { useRouter } from 'next/navigation';

interface CartProductProps {
  cartProduct:CartProduct
  productChechout: CartProduct[];
  setProductCheckout: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

const CartProduct: React.FC<CartProductProps> = ({ cartProduct, productChechout, setProductCheckout  }) => {
    const [quantity, setQuantity] = React.useState(cartProduct.quantity);
    const router=useRouter()

    const isCheckout=React.useMemo(()=>{
      return productChechout.some((product)=>product.id===cartProduct.id)   
    },[productChechout])


    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
        router.refresh()
      };
    
      const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
        router.refresh
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
        updateProduct(cartProduct.cartId, cartProduct.product.id, quantity)
      },[quantity])

      React.useEffect(()=>{
        setProductCheckout(productChechout.map((product)=>product.id===cartProduct.id?{...product, quantity}:product))  
      },[quantity])

  return (
    <div className="w-full flex justify-between md:flex-row flex-col">
      <div className="flex gap-4">
        <input type="checkbox"  checked={isCheckout} onChange={()=>isCheckout?setProductCheckout(productChechout.filter((product)=>product.id!==cartProduct.id)):setProductCheckout([...productChechout, cartProduct])} className="cursor-pointer" />
        <Image
          src={cartProduct.product.images[0]}
          alt={cartProduct.product.name}
          width={100}
          height={100}
          className="lg:size-36 md:size-28 size-16 object-cover lg:rounded-xl rounded-lg"
        />
        <div>
          <p className="mb-1 font-semibold text-[10px] md:text-lg">{cartProduct.product.name}</p>
          <button className="block px-2 py-1.5 rounded-md md:text-sm text-[8px] bg-slate-200 mb-1">
            {cartProduct.product.location}
          </button>
          {cartProduct.size && (
            <button className="block px-2 py-1.5 rounded-md md:text-sm text-[8px] bg-slate-200 mb-1">
              {cartProduct.size}
            </button>
          )}
          {cartProduct.color && (
            <button className="block px-2 py-1.5 rounded-md md:text-sm text-[8px] bg-slate-200 mb-1">
              {cartProduct.color}
            </button>
          )}
        </div>
      </div>
      <div className='flex flex-col items-center space-y-2'>
        <div className="flex gap-4">
          <p>
            <span className="font-semibold">
              {(
                cartProduct.product.price * quantity
              ).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </span>{' '}
            <span className="text-sm text-slate-500">x{cartProduct.quantity}</span>
          </p>
          <DeleteProduct productId={cartProduct.product.id} cartId={cartProduct.cartId} setProductCheckout={setProductCheckout} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-3 items-center">
            <Button disabled={quantity >= cartProduct.product.stock} className="rounded-full font-bold " onClick={increaseQuantity}>
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

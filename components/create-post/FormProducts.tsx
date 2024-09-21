'use client'
import React, { useReducer } from 'react'
import Editor from '../editor/Editor'
import FormImage from './FormImage'
import SelectCategory from './SelectCategory';
import { Button } from '../ui/button';
import InputList from './InputList';
import SelectProductType from './SelectProductType';
import { createNewProducts } from '@/actions/products.actions';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import Loader from '../ui/Loader';


interface Props{
  categories:Category[]
}

// Define the initial state
const initialState = {
  name: '',
  description: '',
  price: 0.0,
  stock: 0,
  categoryId: '',
  images: [],
  brand: '',
  material: '',
  style: '',
  size: [],
  model: '',
  colors: [],
  location: '',
  type: '',
};

const ACTIONS = {
  SET_NAME: 'SET_NAME',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_PRICE: 'SET_PRICE',
  SET_STOCK: 'SET_STOCK',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_IMAGES: 'SET_IMAGES',
  SET_BRAND: 'SET_BRAND',
  SET_MATERIAL: 'SET_MATERIAL',
  SET_STYLE: 'SET_STYLE',
  SET_SIZE: 'SET_SIZE',
  SET_MODEL: 'SET_MODEL',
  SET_COLORS: 'SET_COLORS',
  SET_LOCATION: 'SET_LOCATION',
  SET_TYPE: 'SET_TYPE',
};

export const sleep = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload };
    case ACTIONS.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case ACTIONS.SET_PRICE:
      return { ...state, price: action.payload };
    case ACTIONS.SET_STOCK:
      return { ...state, stock: action.payload };
    case ACTIONS.SET_CATEGORY:
      return { ...state, categoryId: action.payload };
    case ACTIONS.SET_IMAGES:
      return { ...state, images: action.payload };
    case ACTIONS.SET_BRAND:
      return { ...state, brand: action.payload };
    case ACTIONS.SET_MATERIAL:
      return { ...state, material: action.payload };
    case ACTIONS.SET_STYLE:
      return { ...state, style: action.payload };
    case ACTIONS.SET_SIZE:
      return { ...state, size: action.payload };
    case ACTIONS.SET_MODEL:
      return { ...state, model: action.payload };
    case ACTIONS.SET_COLORS:
      return { ...state, colors: action.payload };
    case ACTIONS.SET_LOCATION:
      return { ...state, location: action.payload };
    case ACTIONS.SET_TYPE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
};



const FormProducts = ({ categories }:Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = React.useState(false);
  const router=useRouter()

  const { toast }=useToast()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    sleep()
    const message = await createNewProducts(state)
    toast({
      title:'',
      description: message.message,
      variant: message.success?'default':'destructive'
    })
    if(message.success){
      dispatch({ type: ACTIONS.SET_NAME, payload: '' });
      dispatch({ type: ACTIONS.SET_DESCRIPTION, payload: '' });
      dispatch({ type: ACTIONS.SET_PRICE, payload: 0.0 });
      dispatch({ type: ACTIONS.SET_STOCK, payload: 0 });
      dispatch({ type: ACTIONS.SET_CATEGORY, payload: '' });
      dispatch({ type: ACTIONS.SET_IMAGES, payload: [] });
      dispatch({ type: ACTIONS.SET_BRAND, payload: '' });
      dispatch({ type: ACTIONS.SET_MATERIAL, payload: '' });
      dispatch({ type: ACTIONS.SET_STYLE, payload: '' });
      dispatch({ type: ACTIONS.SET_SIZE, payload: [] });
      dispatch({ type: ACTIONS.SET_MODEL, payload: '' });
      dispatch({ type: ACTIONS.SET_COLORS, payload: [] });
      dispatch({ type: ACTIONS.SET_LOCATION, payload: '' });
      dispatch({ type: ACTIONS.SET_TYPE, payload: '' });
      router.push('/store')
    }
    setLoading(false);
    router.refresh()
  };



  return (
    <div className='lg:px-4'>
      <form onSubmit={onSubmit}>
        <FormImage images={state.images} dispatch={dispatch} />
        <label htmlFor='name'>
           <span className="relative pr-2">
            <span>Name</span>
            <span className={`absolute right-0 top-0 ${state.name.length > 3 ? 'text-green-500' : 'text-red-600'}`}>*</span>
           </span>
          <input
            id="name"
            type="text"
            placeholder="Product Name"
            className="w-full pl-4 py-2.5 rounded mb-4 border-b-2 capitalize"
            value={state.name}
            onChange={(e) => dispatch({ type: ACTIONS.SET_NAME, payload: e.target.value })}
          />
        </label>
        <span className="relative pr-2">
          <span className='text-slate-500 font-semibold mb-2'>Description</span>
          <span className={`absolute right-0 top-0 ${state.description.length > 3 ? 'text-green-500' : 'text-red-600'}`}>*</span>
        </span>
        <Editor dispacth={dispatch} />
        <SelectCategory value={state.categoryId} dispatch={dispatch} categories={categories} />
        <div className='flex gap-2 md:flex-row flex-col'>
          <label htmlFor="price" className='flex-1'>
            <p className='text-slate-500 font-semibold mb-1'>Price</p>
            <input
              type="number"
              inputMode='numeric'
              id='price'
              placeholder="Price"
              className="w-full pl-4 py-2.5 rounded mb-4 border-b-2"
              value={state.price}
              onChange={(e) => dispatch({ type: ACTIONS.SET_PRICE, payload: Number(e.target.value) })}
            />
          </label>
          <label htmlFor="stock" className='flex-1'>
            <p className='text-slate-500 font-semibold mb-1'>Stock</p>
            <input
              type="text"
              inputMode='numeric'
              id='stock'
              placeholder="Stock"
              className="w-full pl-4 py-2.5 rounded mb-4 border-b-2"
              value={state.stock}
              onChange={(e) => dispatch({ type: ACTIONS.SET_STOCK, payload: Number(e.target.value) })}
            />
          </label>
        </div>
        <div className='flex gap-2 md:flex-row flex-col'>
          <label htmlFor="brand" className='flex-1'>
            <p className='text-slate-500 font-semibold mb-1'>Brand</p>
            <input
              type="text"
              id='brand'
              placeholder="brand"
              className="w-full pl-4 py-2.5 rounded mb-4 border-b-2"
              value={state.brand}
              onChange={(e) => dispatch({ type: ACTIONS.SET_BRAND, payload: e.target.value })}
            />
          </label>
          <label htmlFor="material" className='flex-1'>
            <p className='text-slate-500 font-semibold mb-1'>material</p>
            <input
              type="text"
              id='material'
              placeholder="material"
              className="w-full pl-4 py-2.5 rounded mb-4 border-b-2"
              value={state.material}
              onChange={(e) => dispatch({ type: ACTIONS.SET_MATERIAL, payload: e.target.value })}
            />
          </label>
        </div>
        <label htmlFor="style">
          <p className='text-slate-500 font-semibold mb-1'>Style</p>
          <input
            type="text"
            id='style'
            placeholder="Style"
            className="w-full pl-4 py-2.5 rounded mb-4 border-b-2"
            value={state.style}
            onChange={(e) => dispatch({ type: ACTIONS.SET_STYLE, payload: e.target.value })}
          />
        </label>
        <label htmlFor="model">
          <p className='text-slate-500 font-semibold mb-1'>Model</p>
          <input
            type="text"
            id='model'
            placeholder="Model"
            className="w-full pl-4 py-2.5 rounded mb-4 border-b-2"
            value={state.model}
            onChange={(e) => dispatch({ type: ACTIONS.SET_MODEL, payload: e.target.value })}
          />
        </label>
        <div className="flex gap-2 md:flex-row flex-col mb-4">
          <InputList title='Colors' dispatch={dispatch} />
          <InputList title='Sizes' dispatch={dispatch} />
        </div>
        <label htmlFor="location">
          <p className='text-slate-500 font-semibold mb-1'>Location</p>
          <input
            type="text"
            id='location'
            placeholder="Location"
            className="w-full pl-4 py-2.5 rounded mb-4 border-b-2"
            value={state.location}
            onChange={(e) => dispatch({ type: ACTIONS.SET_LOCATION, payload: e.target.value })}
          />
        </label>
        <SelectProductType dispatch={dispatch} value={state.type} />
        <Button type='submit' className='w-full'>
          {loading?
            <div className='flex items-center gap-2'>
              <p>Creating Product</p>
              <Loader size='4' color='white' />
            </div>
            :
            "Create Product"
          }
        </Button>
      </form>
    </div>
  );
}

export default FormProducts;

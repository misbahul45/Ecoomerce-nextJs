'use client'
import React, { useReducer } from 'react'
import Editor from '../editor/Editor'
import FormImage from './FormImage'

// Define the initial state
const initialState = {
  title: '',
  description: '',
  price: '',
  stock: 0,
  category: '',
  subCategory: '',
  images: [],
};

const ACTIONS = {
  SET_TITLE: 'SET_TITLE',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_PRICE: 'SET_PRICE',
  SET_STOCK: 'SET_STOCK',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_SUBCATEGORY: 'SET_SUBCATEGORY',
  SET_IMAGES: 'SET_IMAGES',
  SET_DYNAMIC: 'SET_DYNAMIC',
};

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case ACTIONS.SET_TITLE:
      return { ...state, title: action.payload };
    case ACTIONS.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case ACTIONS.SET_PRICE:
      return { ...state, price: action.payload };
    case ACTIONS.SET_STOCK:
      return { ...state, stock: action.payload };
    case ACTIONS.SET_CATEGORY:
      return { ...state, category: action.payload };
    case ACTIONS.SET_SUBCATEGORY:
      return { ...state, subCategory: action.payload };
    case ACTIONS.SET_IMAGES:
      return { ...state, images: action.payload };
    case ACTIONS.SET_DYNAMIC:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const FormProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <form>
        <FormImage images={state.images} dispatch={dispatch} />
        <input
          type="text"
          placeholder="Product Title"
          className="input-bordered input w-full pl-4 py-2.5 rounded mb-4 border-b-2"
          value={state.title}
          onChange={(e) => dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value })}
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder=''
          />
        </div>
        <Editor />
      </form>
    </div>
  );
}

export default FormProducts;

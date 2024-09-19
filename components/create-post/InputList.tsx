import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../ui/button';
import { MdInvertColors, MdOutlineDeleteSweep } from "react-icons/md";
import { CgSize } from "react-icons/cg";


interface Props {
  title: string;
  dispatch: React.Dispatch<any>;
}

const InputList = ({ title, dispatch }: Props) => {
  const [lists, setLists] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const handleAddColor = useCallback(() => {
    const trimmedValue = value.trim().toUpperCase();
    if (trimmedValue && !lists.includes(trimmedValue)) {
      setLists((prevLists) => [...prevLists, trimmedValue]);
      setValue('');
    }
  }, [value, lists]);

  const handleDelete = useCallback((item: string) => {
    setLists((prevLists) => prevLists.filter(listItem => listItem !== item));
  }, []);


  useEffect(() => {
    dispatch({ type: title==="Colors"?"SET_COLORS":"SET_SIZE", payload: lists });
  }, [lists, value, dispatch]);

  return (
    <div className="w-full">
      <label htmlFor={title} className='w-full space-y-2'>
        <p className='text-slate-500 font-semibold mb-1 capitalize'>{title}</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id={title}
            placeholder={title}
            className="flex-1 pl-4 py-2.5 rounded border-b-2"
          />
          <Button type='button' onClick={handleAddColor} className="w-10 h-10 rounded-full text-slate-100 p-1">
            {title === 'Colors' ? <MdInvertColors className='w-full h-full' /> : <CgSize className='w-full h-full' />}
          </Button>
        </div>
      </label>
      {lists.length > 0 && (
        <div className="w-full flex gap-2 flex-wrap my-4">
          {lists.map((item, index) => (
            <div
              key={index}
              className="relative px-2 py-1 rounded-lg shadow-lg shadow-slate-600/50 bg-blue-500 text-slate-100"
            >
              <p>{item}</p>
              <MdOutlineDeleteSweep 
                className='w-6 h-6 cursor-pointer absolute -top-2 -right-3 text-red-800 hover:scale-105' 
                onClick={() => handleDelete(item)} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputList;

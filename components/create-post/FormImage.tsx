import { UploadButton } from '@/utils/uploadthing';
import React from 'react';
import { useToast } from '../ui/use-toast';
import Image from 'next/image';
import { FaImages } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  images: string[];
  dispatch?: React.Dispatch<any>
  setImages?:React.Dispatch<React.SetStateAction<string[]>>
}

const FormImage: React.FC<Props> = ({ images, dispatch, setImages }) => {
  const { toast } = useToast();
  const [showImageIndex, setShowImageIndex] = React.useState(0);

  const handleClientUploadComplete = (res: any) => {
    const newImageUrls = res.map((image: any) => image.appUrl);
    if(dispatch){
      dispatch({ type: 'SET_IMAGES', payload: [...images, ...newImageUrls] });
    }else if(setImages){
      setImages(prev=>[...prev, ...newImageUrls])
    }
  };

  const removeImage=(index:number)=>{
    const newImages=images.filter((_,i)=>i!==index)
    if(dispatch){
      dispatch({ type: 'SET_IMAGES', payload: newImages });
    }else if(setImages){
      setImages(newImages)
    }
  }

  const handleUploadError = (error: Error) => {
    toast({
      title: 'Error',
      description: 'Cannot upload image',
      variant: 'destructive',
    });
  };

  React.useEffect(() => {
    setShowImageIndex(0);
  }, [images]);

  return (
    <div>
      <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 mb-4">
        <div className="flex-1 relative border-2 border-t-slate-200 rounded-xl flex justify-center items-center">
          {images.length > 0 ? (
            <Image
              src={images[showImageIndex]}
              alt="Selected image"
              width={500}
              height={500}
              className="w-full lg:h-[75vh] md:h-[50vh] h-[30vh] object-cover rounded-xl shadow-xl shadow-slate-500/20"
            />
          ) : (
            <FaImages className="w-[70%] h-[70%] text-slate-200 hover:text-slate-500" />
          )}
        </div>
        {images.length > 0 && (
          <div className="flex lg:flex-col flex-row gap-2 max-h-[75vh] overflow-auto">
            {images.map((image, index) => (
              <div
                onClick={() => setShowImageIndex(index)}
                key={index}
                className="lg:w-64 md:w-48 w-28 lg:h-48 md:h-32 h-16 relative cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center rounded-lg shadow-lg shadow-slate-500/20"
                />
                <button type='button' onClick={()=>removeImage(index)} className='absolute top-2 md:right-4 right-1 text-slate-100 bg-red-500 p-2 rounded-full shadow-xl shadow-slate-500/20 hover:scale-105 transition-all duration-100'>
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={handleClientUploadComplete}
        onUploadError={handleUploadError}
      />
    </div>
  );
};

export default FormImage;

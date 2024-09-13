import { UploadButton } from '@/utils/uploadthing';
import React from 'react';
import { useToast } from '../ui/use-toast';
import Image from 'next/image';
import { FaImages } from 'react-icons/fa';

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
      dispatch({ type: 'SET_IMAGES', payload: newImageUrls });
    }else if(setImages){
      setImages(prev=>[...prev, ...newImageUrls])
    }
  };

  console.log(images)
  const handleUploadError = (error: Error) => {
    toast({
      title: 'Error',
      description: 'Cannot upload image',
      variant: 'destructive',
    });
  };

  return (
    <div>
      <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 mb-4">
        <div className="flex-1 h-[75vh] relative border-2 border-t-slate-200 rounded-xl flex justify-center items-center">
          {images.length > 0 ? (
            <Image
              src={images[showImageIndex]}
              alt="Selected image"
              width={500}
              height={500}
              className="w-full h-full object-cover object-center rounded-xl shadow-xl shadow-slate-500/20"
            />
          ) : (
            <FaImages className="w-full h-[70%] text-slate-200 hover:text-slate-500" />
          )}
        </div>
        {images.length > 1 && (
          <div className="flex lg:flex-col flex-row gap-2 max-h-[75vh] overflow-auto">
            {images.map((image, index) => (
              <div
                onClick={() => setShowImageIndex(index)}
                key={index}
                className="w-64 h-48 relative cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center rounded-lg shadow-lg shadow-slate-500/20"
                />
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

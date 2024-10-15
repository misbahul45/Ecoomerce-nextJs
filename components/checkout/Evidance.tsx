'use client'
import React from 'react'
import { FaImage } from 'react-icons/fa'
import { Button } from '../ui/button'
import { UploadButton } from '@/utils/uploadthing'
import { useToast } from '../ui/use-toast'
import Image from 'next/image'
import { sleep } from '../create-post/FormProducts'
import Loader from '../ui/Loader'
import { createOrderEvidence } from '@/actions/evidence.actions'

interface Props {
    orderId:string
}

const Evidance = ({ orderId }:Props) => {
    const [loading,setLoading]=React.useState(false)
    const [image,setImage]=React.useState("")
    const { toast }=useToast()

    const handleUpload=async(res:any)=>{
        setImage(res[0].appUrl)
    }

    const handleUploadError = (error: Error) => {
        toast({
          title: 'Error',
          description: 'Cannot upload image',
          variant: 'destructive',
        });
      };

      const sumbitEvidance=async()=>{
        try {
            setLoading(true)
            await sleep()
            const re=await createOrderEvidence(orderId,image)
            console.log(re)
            toast({
                title: 'Success',
                description: 'Evidance sent',
                variant: 'default',
            })
            setLoading(false)
            setImage("")
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Cannot upload image',
                variant: 'destructive',
            })
        }
      }

  return (
    <div>
        <h3 className='text-center font-semibold'>You have to pay for this order</h3>
        <div className='w-full max-w-sm my-2 rounded-md h-auto mx-auto border-2 border-slate-300 flex justify-center items-center'>
            {image?
                <Image src={image} alt="" width={500} height={500} className='object-cover' />
                :
                <FaImage className='w-[90%] h-auto' />
            }
        </div>
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUpload}
            onUploadError={handleUploadError}
        />
        <Button onClick={sumbitEvidance} className='w-full font-semibold uppercase flex justify-center items-center'>
            {loading?
                <>
                    <Loader size="4" color="white" />
                    <span className='ml-2'>Uploading....</span>
                </>
            :"Submit"}
        </Button>
    </div>
  )
}

export default Evidance

'use client'
import React from "react"
import FormImage from "./FormImage"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { createNewPoster } from "@/actions/poster.actions"

const FormPoster = () => {
    const [images,setImages]=React.useState<string[]>([])
    const { toast }=useToast()

    const onSubmit=async(e:React.FormEvent)=>{
      e.preventDefault()
      const res=await createNewPoster(images.map(image=>({image})))
      toast({
        description:res ? 'Poster created successfully' : 'Poster already exists',
        variant:res ?'default':'destructive'
      })
    }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormImage images={images} setImages={setImages} />
      {images.length>0 && (<Button type='submit' className="w-full">Upload New Poster</Button>)}
    </form>
  )
}

export default FormPoster

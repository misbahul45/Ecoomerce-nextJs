'use client'
import React from "react"
import FormImage from "./FormImage"

const FormPoster = () => {
    const [images,setImages]=React.useState<string[]>([])
  return (
    <div>
      <FormImage images={images} setImages={setImages} />
    </div>
  )
}

export default FormPoster

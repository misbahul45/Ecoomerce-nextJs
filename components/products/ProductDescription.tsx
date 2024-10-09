import React from 'react'
import Parse from 'html-react-parser'

interface Props {
    description: string
}

const ProductDescription = ({ description }: Props) => {
    return (
        <div className="relative overflow-hidden shadow-inner shadow-slate-100">
            <div className={`transition-all duration-200`}>
                {Parse(description as string)}
            </div>
        </div>
    )
}

export default ProductDescription;

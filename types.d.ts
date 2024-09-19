interface User{
    id:string
    name:string
    email:string
    image?:string
    role:'admin'|'user'
    password?:string
}

interface Category{
    id:string
    category:string
    createdAt:Date
    updatedAt:Date
}


interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    purchased?: number;
    brand?: string;
    material?: string;
    style?: string;
    size?: string[];
    model?: string;
    colors?: string[];
    location?: string;
    type?: string;
    categoryId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
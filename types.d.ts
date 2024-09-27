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
    purchesed: number;
    brand?: string;
    material?: string;
    style?: string;
    size: string[];
    model?: string;
    colors: string[];
    location?: string;
    type?: string;
    categoryId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

  interface CartOnProduct{
    id?:string
    productId:string
    quantity:number
    size?:string
    color?:string,
    userId:string
}

    interface CartProduct {
        id?: string;
        product: Product;
        size?: string;
        color?: string;
        quantity: number;
        cartId: string;
      };

    interface ProductOnOrder{
        id: string;
        product: Product;
        size?: string;
        color?: string;
        quantity: number;
        orderId?: string;
        product:Product
    }

    interface Order{
        id: string;
        userId: string;
        address: string;
        city: string;
        country: string;
        postal: string;
        methode: string;
        status: string;
        products:ProductOnOrder[]
    }
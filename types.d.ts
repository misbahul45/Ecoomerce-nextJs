interface User{
    id:string
    name:string
    email:string
    image?:string
    role:'admin'|'user'
    password?:string
}
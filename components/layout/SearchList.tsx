'use client'
import React, { useMemo } from "react"
import { Context } from "./Provider"
import FormSearch from "./FormSearch"
import ProductList from "./ProductList"
import { sleep } from "../create-post/FormProducts"
import Loader from "../ui/Loader"
import { getProducts } from "@/actions/products.actions"

interface Props {
  categories: Category[]
}

const SearchList = ({ categories }: Props) => {
  const { showSearch, search, toggleSearch } = React.useContext(Context)
  const [loading, setLoading] = React.useState(false)
  const [productsShow, setProductsShow] = React.useState<Product[]>([])

  React.useEffect(() => {
    const getShowProucts = async () => {
      setLoading(true)
      const products = await getProducts(search)
      setProductsShow(products as Product[])
      setLoading(false)
    }
    getShowProucts()
  }, [search]);

  React.useEffect(() => {
    if (showSearch) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showSearch]);

  return (
    <section className={`absolute left-1/2 top-2 -translate-x-1/2 ${showSearch ? 'scale-100' : 'scale-0'} lg:p-4 md:p-2 p-1.5 w-full max-w-4xl h-[80vh] z-30 bg-slate-100/90 backdrop-blur-md shadow-xl shadow-slate-700/20 rounded-lg transition-all duration-100`}>
      <FormSearch />
      <div className="overflow-y-auto overflow-x-hidden h-[90%] mt-2 space-y-4">
        {loading ? (
          <Loader size='8' color="black" />
        ) : (
          productsShow.map((product) => (
            <ProductList key={product.id} {...product} toggleSearch={toggleSearch} categories={categories} />
          ))
        )}
      </div>
    </section>
  );
}

export default SearchList;

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import ProductItem from '../Components/ProductItem'

const Collection = () => {

  const {products, search, showSearch } = useContext(ShopContext)
  const [showFilter,setShowFilter] = useState(false)
  const [filterProducts,setFilterProducts] = useState([])
  const [category,setCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item=> item !== e.target.value))      
    }
    else{
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item=> item !== e.target.value))
    }
    else{
      setSubCategory(prev=> [...prev,e.target.value])
    }
  }

  const applyFilters = ()=>{
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;

        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
          break;
      default:
      applyFilters()
        break;
    }
    
  }

  useEffect(()=>{
    applyFilters()
  },[category,subCategory, search, showSearch, products])


  useEffect(()=>{
    sortProduct()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      
    {/* Filter Options */}
<div className="min-w-60">

  <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
    FILTERS
    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} src={assets.dropdown_icon} alt="" />
  </p>

  {/* Category Filter */}
  <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
    
    <p className="mb-3 text-sm font-medium">
      CATEGORIES
    </p>

    <div className="flex flex-col gap-2 text-sm text-gray-700">

      <p className="flex gap-2">
        <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} />
        Men
      </p>

      <p className="flex gap-2">
        <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} />
        Women
      </p>

      <p className="flex gap-2">
        <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} />
        Kids
      </p>

    </div>

  </div>
 {/* sub category filter */}

    <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
      <p className='mb-3 text-sm font-medium'>TYPE</p>
      <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
        <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Topwear'}onChange={toggleSubCategory} /> Topwear</p>
        <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear </p>
        <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> WinterWear
        </p>
      </div>
    </div>
  </div>
        {/* Right side  */}
      <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-gray-500'>ALL
              <span className='text-gray-700 font-medium'>COLLECTIONS</span>
            </p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
        </div>
        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relavent">Sort by: Relavent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>
      {/* map products */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default Collection

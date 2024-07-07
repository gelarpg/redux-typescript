import AddProduct from '@/components/AddProduct'
import React from 'react'

const Add = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 py-10'>
        <h1 className='font-semibold text-lg'>Add Product</h1>
        <AddProduct/>
    </div>
  )
}

export default Add
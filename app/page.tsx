import EditProduct from '@/components/EditProduct'
import ShowProduct from '@/components/ShowProduct'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col items-center gap-5 justify-center py-10'>
      <h1 className='text-xl font-semibold'>Redux - Typescript</h1>
      <ShowProduct/>
    </div>
  )
}

export default Page
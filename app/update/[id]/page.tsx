import EditProduct from '@/components/EditProduct'

const Page = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 py-10'>
        <h1 className='font-semibold text-lg'>Edit Product</h1>
        <EditProduct/>
    </div>
  )
}

export default Page
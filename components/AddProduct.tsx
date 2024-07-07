"use client";
import { SyntheticEvent, useState } from "react";
import { createProduct } from "@/redux/features/productSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await dispatch(createProduct({title, price})).unwrap()
      console.log(data)
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleAdd} className="border p-3 rounded-lg shadow-md">
      <div className="my-4 flex flex-col">
        <label className="font-semibold">Title</label>
        <input
          type="text"
          placeholder="enter title in here.."
          className="border rounded-md p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-4 flex flex-col">
        <label className="font-semibold">Price</label>
        <input
          type="text"
          placeholder="enter price in here.."
          className="border rounded-md p-2"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-1 w-full rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default AddProduct;

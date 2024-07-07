"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, productSelectors, updateProduct } from "@/redux/features/productSlice";
import { useRouter, useParams } from "next/navigation";
import { RootState, AppDispatch } from "@/redux/store";

function EditProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams<{ id: any }>();

  const product = useSelector((state: RootState) =>
    productSelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProduct({ id, title, price }));
      router.push("/"); // Mengarahkan ke halaman produk setelah update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="border p-3 rounded-lg shadow-md">
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
          type="number"
          placeholder="enter price in here.."
          className="border rounded-md p-2"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <button
        className="bg-yellow-500 text-white p-1 w-full rounded-md"
        type="submit"
      >
        Update
      </button>
    </form>
  );
}

export default EditProduct;

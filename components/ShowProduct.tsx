"use client";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, productSelectors, deleteProduct } from "@/redux/features/productSlice";
import Link from "next/link";
const ShowProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(productSelectors.selectAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="border shadow-md rounded-md p-2 w-1/2">
      <Link
      href={'/add'}
      className="p-2 bg-blue-500 text-white rounded-md">
        Add Product
      </Link>
      <table className="table w-full mt-5">
        <thead className="border-y font-bold">
          <tr>
            <td>No</td>
            <td>Title</td>
            <td>Price</td>
            <td className="text-center">Actions</td>
          </tr>
        </thead>
        <tbody className="border-y">
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="flex justify-center items-center gap-4">
                <Link
                  href={`/update/${product.id}`}
                  className="p-2 rounded-md bg-yellow-500 text-white w-1/2 text-center"
                >
                  Edit
                </Link>
                <button
                  type="submit"
                  className="text-white bg-red-500 p-2 rounded-md w-1/2"
                  onClick={() => dispatch(deleteProduct(product.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProduct;

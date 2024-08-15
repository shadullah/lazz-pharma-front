"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";

interface Product {
  _id: string;
  productImage: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: boolean;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
}

interface ApiResponse {
  statusCode: number;
  data: Product;
  message: string;
}

const ProductDetails = ({ params }: any) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [cat, setCat] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          `http://localhost:8000/api/v1/products/list/${id}`
        );
        console.log(res.data);
        setProduct(res.data?.data);
      } catch (err) {
        console.log(err);
        toast.error("Details could not fetched", { duration: 3000 });
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const cursorControl = product?.stock;

  useEffect(() => {
    const getCategory = async () => {
      if (product?.category) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/v1/category/all/${product.category}`
          );
          setCat(res.data?.data);
        } catch (error) {
          console.log(error);
          toast.error("Category could not fetched");
        }
      }
    };
    getCategory();
  }, [product?.category]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const token = localStorage.getItem("accessToken"); // Get the user's access token
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/v1/carts/create",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mt-36 mb-12 text-center">
        Details page
      </h1>
      <div>
        <div className="flex justify-center items-center mx-3 md:mx-12">
          {loading ? (
            <div>
              <Audio
                height="80"
                width="80"
                //   radius="9"
                color="gray"
                ariaLabel="loading"
              />
            </div>
          ) : (
            <>
              <div className="w-full md:w-1/2 p-2 md:p-6">
                {product?.productImage && (
                  <Image
                    src={product.productImage}
                    alt="img"
                    height={600}
                    width={600}
                    className="object-contain rounded-2xl "
                    priority
                  />
                )}
              </div>
              <div className="w-full md:w-1/2 p-2 md:p-6">
                <h1 className="text-2xl font-extrabold my-3">
                  {product?.name}
                </h1>
                <p className="text-md">{product?.description}</p>
                <div className="flex items-center space-x-2 mt-3">
                  {cat?.thumbnail && (
                    <Image
                      src={cat?.thumbnail}
                      alt="img"
                      height={200}
                      width={200}
                    />
                  )}
                  <p className="text-sm">Category: {cat?.name}</p>
                </div>
                <p>
                  Stock:{" "}
                  {product?.stock ? (
                    <span className="text-green-400">Available</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
                <div className="flex items-center space-x-2">
                  <h3 className="text-orange-600 text-3xl font-bold my-3">
                    ৳ {product?.price}
                  </h3>
                  <div className="bg-pink-400 w-10 text-center rounded-full">
                    <span>{product?.discount} %</span>
                  </div>
                </div>
                <button
                  className={`bg-gray-900 w-full font-bold py-2 rounded-lg my-3 ${
                    cursorControl ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  disabled={!cursorControl}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

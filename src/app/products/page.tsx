"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import Image from "next/image";
import Link from "next/link";
import { Audio } from "react-loader-spinner";

interface Product {
  _id: string;
  productImage: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: boolean;
}

interface ApiResponse {
  statusCode: number;
  data: Product[];
  message: string;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "http://localhost:8000/api/v1/products/list"
        );
        console.log(res?.data);
        setProducts(res?.data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="py-12 bg-gray-900">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            Featured Products
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            {" "}
            Get Best products here
          </p>
        </div>
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center">
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
            {products?.length === 0 ? (
              <div className="text-3xl bg-red-600 text-center py-2 my-24 w-full md:w-1/2 mx-auto rounded-lg">
                <p>No Products Found or server error</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center m-12">
                  {products?.map((product: Product) => (
                    <div className="flex justify-center" key={product?._id}>
                      <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                        <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                          <Image
                            src={product.productImage}
                            alt="productImage"
                            height="400"
                            width="400"
                            className="object-contain rounded-2xl mb-2"
                          />
                          <p className="text-3xl font-bold">{product.name}</p>

                          {/* <p className="text-justify my-2">{product.description}</p> */}
                          <p className="my-3">৳ {product.price}</p>
                          <Link
                            href={`/products/${product._id}`}
                            className="bg-slate-700 w-full py-2 rounded-2xl text-sm"
                          >
                            Details
                          </Link>
                        </div>
                      </BackgroundGradient>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;

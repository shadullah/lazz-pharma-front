"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";

const PortalComponent = ({ children, onClose }: any) => {
  return ReactDOM.createPortal(<div>{children}</div>, document.body);
};
interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    discount: string;
  };
  quantity: number;
  customer: string;
  name: string;
}

interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("User not authenticated");
          return;
        }

        const id = localStorage.getItem("id");
        if (!id) {
          toast.error("User id not found");
        }

        const res = await axios.get<ApiResponse<CartItem[]>>(
          `http://localhost:8000/api/v1/carts/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data?.data);
        setCartItems(res.data?.data);
      } catch (err) {
        toast.error("Failed to fetch cart items", { duration: 3000 });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handlePlus = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleMinus = (id: string) => {
    setCartItems((pre) =>
      pre.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCartUpdate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("user not authenticated");
        return;
      }
      // {{server}}/carts/66be0c2639a62d3bf11ff0f1
      await cartItems.map((item) => {
        axios.patch(
          `http://localhost:8000/api/v1/carts/${item._id}`,
          {
            quantity: item?.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      });
      router.push("/order");
      toast.success("Cart updated success");
    } catch (err) {
      console.log(err);
      toast.error("error in update", { duration: 3000 });
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      axios.delete(
        `http://localhost:8000/api/v1/carts/user/${itemId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: {
            customerId: cartItems?.find((item) => item?._id === itemId)
              ?.customer,
          },
        }
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
      toast.success("deleted successfully!!");
    } catch (error) {
      toast.error("Couldn't Delete the item");
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-36 mb-12">
        <button
          className="bg-gray-800 py-3 px-4 text-center mx-auto w-1/2 rounded-lg flex justify-center"
          onClick={() => setIsOpen(true)}
        >
          Open Cart
        </button>
      </div>
      {isOpen && (
        <PortalComponent
          className="flex justify-center bg-gray-600"
          onClose={() => setIsOpen(false)}
        >
          <div className="mx-auto flex justify-center">
            <div className="bg-gray-500 w-1/2 p-6 rounded-md">
              <div>
                <div className="flex justify-between">
                  <h1 className="text-3xl">Cart</h1>
                  <button
                    className="text-center py-3 px-2 bg-gray-600 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    X
                  </button>
                </div>
                {loading ? (
                  <div className="flex justify-center">
                    <Audio
                      height="80"
                      width="80"
                      //   radius="9"
                      color="white"
                      ariaLabel="loading"
                    />
                  </div>
                ) : (
                  <>
                    <div className="my-6">
                      {cartItems.map((item) => (
                        <div key={item._id} className="">
                          <div className="flex justify-between items-center my-2 space-y-3">
                            <div className="w-1/4 mx-auto">
                              <h3>Product Name</h3>
                              <p>{item.productId.name}</p>
                            </div>
                            <div className="w-1/4 mx-auto">
                              <h1>Quantity</h1>
                              <p className="mt-3 space-x-2">
                                <span
                                  onClick={() => handleMinus(item._id)}
                                  className="text-sm font-extrabold bg-gray-700 px-2 py-1 rounded-md cursor-pointer"
                                >
                                  -
                                </span>
                                <span className="text-xl">{item.quantity}</span>
                                <span
                                  onClick={() => handlePlus(item._id)}
                                  className="text-sm font-extrabold bg-gray-700 px-2 py-1 rounded-md cursor-pointer"
                                >
                                  +
                                </span>
                              </p>
                            </div>
                            <div className="w-1/4 mx-auto">
                              <h3>Discount</h3>
                              <p>{item.productId.discount}</p>
                            </div>
                            <div className="w-1/4 mx-auto">
                              <h3>Action</h3>
                              <button
                                onClick={() => handleDelete(item?._id)}
                                className="px-3 py-2 bg-red-600 rounded-lg"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-center mt-12">
                        <button
                          onClick={handleCartUpdate}
                          className="px-3 py-2 bg-gray-900 rounded-lg"
                        >
                          Checkout &rarr;
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </PortalComponent>
      )}
    </>
  );
};

export default CartPage;

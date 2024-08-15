"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // const handleLogout = async () => {
  //   setLoading(true);
  //   try {
  //     axios.post("http://localhost:8000/api/v1/users/logout", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     });

  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("refreshToken");

  //     toast.success("Logout successfully", { duration: 3000 });

  //     router.push("/login");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Logout Failed", { duration: 3000 });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogout = () => {
    setLoading(true);
    try {
      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("logout failed", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Our Products">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/products">All Products</HoveredLink>
            {/* <HoveredLink href="/courses">BAsic Courses</HoveredLink>
            <HoveredLink href="/courses">Song writing</HoveredLink> */}
          </div>
        </MenuItem>
        {loading ? (
          <div>
            <ColorRing
              visible={true}
              height="20"
              width="20"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : (
          <>
            {localStorage.getItem("accessToken") ? (
              <>
                <Link href={"/cart"}>
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Cart"
                  ></MenuItem>
                </Link>
                <Link href={"/contact"}>
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Dashboard"
                  ></MenuItem>
                </Link>
                <div>
                  <button
                    // setActive={setActive}
                    // active={active}
                    // item="Logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div>
                <Link href={"/login"}>
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Login"
                  ></MenuItem>
                </Link>
              </div>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;

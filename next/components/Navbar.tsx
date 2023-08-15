import Image from "next/image";
import React from "react";
import icons from "../icons";
import Link from "next/link";
const { DownArrow, SearchIcon } = icons;
const Navbar = () => {
  return (
    <nav className="flex w-full justify-center items-center py-8 mb-16">
      <div className="flex justify-between w-[90%] gap-12 items-center">
        <Link href="/">
          <Image src="/tempLogo.png" alt="logo" width={75} height={75} />
        </Link>
        <div className="flex items-center gap-4 cursor-pointer">
          <span className="text-[26px] font-normal">Categories </span>
          <DownArrow className="text-[26px] text-gray-600" />
        </div>
        <span className="text-[26px] font-normal flex items-center cursor-pointer">
          What's New
        </span>
        <div className="relative h-[44px] flex items-center bg-gray-200 w-[450px] px-6 rounded-full">
          <input
            className="font-normal text-xl bg-inherit outline-none text-gray-600 focus:text-gray-600"
            placeholder="Search for anything you need"
          />
          <SearchIcon className="text-lg text-gray-600 absolute right-6" />
        </div>
        <div className="flex w-[150px] h-fit bg-gray-200 rounded-full cursor-pointer">
          <Image
            src="/tempProfile.png"
            alt="tempprofile"
            height={50}
            width={50}
            className="rounded-full"
          />
          <div className="flex flex-col items-start p-2">
            <span className="text-[8px] font-normal">Hello</span>
            <span className="text-xl font-semibold">Sign In</span>
          </div>
        </div>
        <Image
          src="/cart.png"
          alt="cart"
          width={32}
          height={32}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;

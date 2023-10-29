"use client";
import { Product } from "@/common.types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import icons from "@/icons";
import { productsData } from "@/constants";

const { HeartIcon, PlusIcon } = icons;

type TopProductsProps = {
  name: string;
  price: number;
  image: string;
};

const TopProductsCard = ({ name, price, image }: TopProductsProps) => {
  return (
    <div className="flex flex-col gap-2 w-fit h-fit p-8 cursor-pointer rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="flex relative">
        <Image src={image} alt={name} height={190} width={180} />
        <div className="absolute top-2 right-2">
          <HeartIcon className="text-2xl stroke-red-600 cursor-pointer" />
        </div>
      </div>
      <span className="font-bold text-2xl">${price}</span>
      <span className="text-normal font-normal w-[230px] text-[#6D6D6D] text-clip-2">
        {name}
      </span>
      <button className="h-[30px] w-fit rounded-full border-2 mt-2 border-black flex gap-2 cursor-pointer items-center p-4 hover:bg-black hover:text-white transition duration-300">
        <PlusIcon />
        Add
      </button>
    </div>
  );
};

export default function TopProducts() {
  // const [topProducts, setTopProducts] = useState([]);

  // useEffect(() => {
  //   const fetchTopProducts = async () => {
  //     const res = await fetch(
  //       "http://localhost:3000/api/products/top-products"
  //     );

  //     console.log(res);
  //     const products = await res.json();
  //     setTopProducts(products.products);
  //   };

  //   fetchTopProducts();
  // }, []);

  return (
    <div className="flex flex-col gap-10 items-center w-4/5">
      <span className="text-2xl font-normal tracking-widest mb-6">
        TOP PRODUCTS
      </span>
      <div className="grid grid-cols-4 gap-14 gap-x-20">
        {productsData &&
          productsData.map((product: Product, ind: Number) => { 
            return (
              <TopProductsCard
                key={product.name + ind}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            );
          })}
        {/* {topProducts &&
          topProducts.map((product: Product, ind: Number) => { 
            return (
              <TopProductsCard
                key={product.name + ind}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            );
          })} */}
      </div>
    </div>
  );
}

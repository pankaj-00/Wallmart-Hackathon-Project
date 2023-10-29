import { categoryData } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CategoryCardProps = {
  name: string;
  bgImage: string;
  bgColor: string;
};

const CategoryCard = ({ name, bgImage, bgColor }: CategoryCardProps) => {
  return (
    // <Link href={`/${name}`}>
      <div
        className={`flex flex-col bg-${bgColor} rounded-2xl cursor-pointer p-4 gap-2 border hover:scale-110 duration-500`}
      >
        <Image src={bgImage} alt="category-image" width={150} height={150} />
        <span className="text-lg text-center font-normal">{name}</span>
      </div>
    // </Link>
  );
};

const Categories = () => {
  return (
    <div className="flex flex-col gap-8 items-center w-[80%]">
      <span className="text-2xl font-normal tracking-widest mb-6">
        CATEGORIES
      </span>
      <div className="flex justify-between w-full">
        {categoryData.map((category, index) => {
          const { name, bgColor, bgImage } = category;
          return (
          <div key={index}>
            <CategoryCard name={name} bgColor={bgColor} bgImage={bgImage} />
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/common.types";

export async function GET(req: NextRequest) {
  /*GET PRODUCT DATA HERE*/
  const dummyData: Array<Product> = [
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
    {
      name: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancel...",
      image:
        "https://drive.google.com/uc?export=view&id=1NncPHggwXicvijwH5EqCulVLHSY69X4-",
      price: 499.99,
    },
  ];

  return NextResponse.json({
    message: "Returning Top Products",
    products: dummyData,
  });
}

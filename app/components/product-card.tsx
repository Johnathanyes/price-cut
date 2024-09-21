import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const ProductCard = ({
  product
}: {
  product: Doc<"products">
}) => {

  const getProduct = useQuery(api.documents.getProduct, {
    productId: product._id,
  })

  const Button = () => {
    
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="max-h-[180px] text-md">{product.productTitle}</CardTitle>
        <CardDescription>Price: ${product.productPrice}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={product.imageSrc} width={100} height={100} alt="image of product"/>
        <div>
          <Link href={`dashboard/${product._id}`}>
            <Button className="mt-10">
                View Product
            </Button>
          </Link>
          <button onClick={Button}>Get</button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

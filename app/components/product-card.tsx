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

const ProductCard = ({
  title,
  price,
  link,
  image,
}: {
  title: string;
  price: number;
  link: string;
  image: string;
}) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="max-h-[180px] text-md">{title}</CardTitle>
        <CardDescription>Price: ${price}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} width={50} height={50} alt="image of product"/>
        <Button>
            View Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

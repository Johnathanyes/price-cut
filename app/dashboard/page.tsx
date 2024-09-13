"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import UploadDocumentForm from "../components/upload-document-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductCard from "../components/product-card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const page = () => {
  const scrapedProducts = useQuery(api.documents.getProducts);
  return (
    <main>
      <div className="m-10 flex flex-row justify-around gap-[600px]">
        <div>
          <h2 className="text-4xl font-bold">Saved Products</h2>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <ShoppingCart />
                Upload Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="my-5">Upload Amazon or Bestbuy Product</DialogTitle>
                <DialogDescription>
                  <UploadDocumentForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-row gap-6 px-20">
        {scrapedProducts?.map((product) => (
          <ProductCard
            title={product.productTitle}
            price={product.productPrice}
            link={product.productLink}
            image={product.imageSrc}
          />
        ))}
        {scrapedProducts?.length == 0 && <div>No products</div>}
      </div>
    </main>
  );
};

export default page;

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

const page = () => {
  const scrapedProducts = useQuery(api.documents.getProducts);
  return (
    <main>
      <div>
        <Dialog>
          <DialogTrigger>Upload Product</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Amazon or Bestbuy Product</DialogTitle>
              <DialogDescription>
                <UploadDocumentForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {scrapedProducts?.map((product) => (
        <div>
          {product.productTitle} {product.productPrice} {product.productLink}
        </div>
      ))}
      {scrapedProducts?.length == 0 && <div>No products</div>}
    </main>
  );
};

export default page;

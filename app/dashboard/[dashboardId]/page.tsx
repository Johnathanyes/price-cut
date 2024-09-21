"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQueries, useQuery } from "convex/react";
import { v } from "convex/values";
import Image from "next/image";
import React from "react";

const page = ({
  params,
}: {
  params: {
    productId: Id<"products">;
  };
}) => {
  if (!params.productId) {
    return <div>Error</div>
  }
  
  const product = useQuery(api.documents.getProduct, {
    productId: params.productId,
  });

  if (!product) {
    return <div>You do not have access to this document</div>
  }

  return (
    <div>
      <div>
        {product.productPrice}

      </div>
      <div></div>
    </div>
  );
};

export default page;

import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const storeProduct = mutation({
  args: {
    productTitle: v.string(),
    productPrice: v.number(),
    productLink: v.string(),
    imageSrc: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("User not found");
    }

    const productDocument = await ctx.db.insert("products", {
      productTitle: args.productTitle,
      productPrice: args.productPrice,
      productLink: args.productLink,
      tokenIdentifier: userId,
      imageSrc: args.imageSrc,
    });
  },
});

export const getProducts = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("products")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getProduct = query({
    args: {
      productId: v.id("products"),
    },
    handler: async (ctx, args) => {
      const product = ctx.db.get(args.productId);

      if (!product) {
          console.log("could not get product");
          
      }

      return product
    },
  });

import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"


export const storeProduct = mutation({
    args: {
        productTitle: v.string(),
        productPrice: v.number(),
        productLink: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError("User not found")
        }

        const productDocument = await ctx.db.insert("products", {
            productTitle: args.productTitle,
            productPrice: args.productPrice,
            productLink: args.productLink,
            tokenIdentifier: userId,
        });
    },
})

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
    }
})
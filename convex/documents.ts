import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"

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
            throw new ConvexError("User not found")
        }
        
        const items = await ctx.db
        .query("products")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
        .collect();

        items.forEach((item) => {
            if (item.productLink == args.productLink) {
                
            }
        })

        const productDocument = await ctx.db.insert("products", {
            productTitle: args.productTitle,
            productPrice: args.productPrice,
            productLink: args.productLink,
            tokenIdentifier: userId,
            imageSrc: args.imageSrc,
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


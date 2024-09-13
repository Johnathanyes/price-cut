"use server"

import axios from "axios";
import * as cheerio from "cheerio";

interface Product {
    title: string,
    price: number,
    link: string,
    imageSrc: string,
}

export const scrapeProduct = async (productLink: string): Promise<Product> => {
    const page = await axios.get(productLink);
    const html = page.data;
        if (!html) {
            throw new Error("Could not find data")
        }
        const $ = cheerio.load(html);
        const title = $("#title");
        const price = Number($("#apex_offerDisplay_desktop #corePrice_feature_div .a-price span.a-offscreen").first().text().slice(1));
        const imageURL = $('#imgTagWrapperId img').attr('src');

        if (!title || !price || !imageURL) {
            throw new Error("Product could not be scraped")
        }

        return (
            {
                title: title.text(),
                price: price,
                link: productLink,
                imageSrc: imageURL,
            }
        )
        

    
}
"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { scrapeProduct } from "../lib/scrapeProduct"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";
import LoadingButton from "./loading-button"

const formSchema = z.object({
    link: z.string().regex(/amazon|bestbuy/i, { message: "Must contain either 'amazon' or 'bestbuy'" }),
})

const UploadDocumentForm = () => {
    const scrapeAndStore = useMutation(api.documents.storeProduct);
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        link: "",
      },
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const scrapedProduct = await scrapeProduct(values.link);

        await scrapeAndStore({
            productTitle: scrapedProduct.title,
            productPrice: scrapedProduct.price,
            productLink: scrapedProduct.link,
            imageSrc: scrapedProduct.imageSrc,
        });
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter a link from either amazon or bestbuy" {...field} autoComplete="off"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            loadingText="Uploading..."
          >
            Upload
          </LoadingButton>
        </form>
      </Form>
    );
  };

export default UploadDocumentForm

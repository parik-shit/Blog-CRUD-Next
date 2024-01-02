"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSession } from "next-auth/react"

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
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from '@/components/ui/toast';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  })

})

export function InputForm() {
  
  const {data} = useSession()
  const router = useRouter();
  console.log(data?.user)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "", content: ""
    },
  })
  

  async function onSubmit(FormData: z.infer<typeof FormSchema>) {
   
    console.log({ FormData })
    try {
      const response = await axios.post('api/posts', FormData);

      if (response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`);
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(FormData, null, 2)}</code>
            </pre>
          ),
        }
        )
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Your are not Logged In.",
        description: "Login and try again.",
        
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="blog title" {...field} />

              </FormControl>
              <FormDescription>
                This is your blogs title.
              </FormDescription>
              <FormMessage />
            </FormItem>


          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write your heart out"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can type anything here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    
  )
}

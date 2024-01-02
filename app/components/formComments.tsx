"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from "react"
import { FC } from 'react';

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

import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
const FormSchema = z.object({
  
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  })

})
interface FormCommentsProps {
  postId: string;
}
 const FormComment: FC<FormCommentsProps> = ({postId})=> {
  const router = useRouter();
  const { data } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
       content: ""
    },
  })

 async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    }
    )

    console.log({ data })
    if (data.content.trim() !== '') {
      try {
        const newComment = await axios.post('/api/comments', {
          postId,
          text: data.content,
        });
        if (newComment.status === 200) {
          form.reset()
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>leave a comment</FormLabel>
              <FormControl>
                
                <div className="grid w-full gap-2">
      <Textarea placeholder="Type your comment here." {...field} />
    
    </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  className="w-full" type="submit">Comment</Button>
      </form>
    </Form>
    
  )
}
export default FormComment;

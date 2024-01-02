
import React from 'react'
import prisma from '@/lib/db';
import { format } from 'date-fns';
import { FC } from 'react';


interface CommentsProps {
  postId: string;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator';
const Comments: FC<CommentsProps> = async ({ postId }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
  });
  


  return (


    <Card className='mb-6 overflow-auto  max-h-45'>
      <CardHeader>


        <h2 className='text-4xl font-bold'>Comments</h2>
        <Separator />

      </CardHeader>


      <ul>
        {comments.map((comment) => (

          <li key={comment.id} className='mb-4  '>

            <div className='flex items-center mb-2'>
              <CardHeader className='font-bold text-s'>


                {comment.author?.name}
                <div className='text-gray-500'>
                  {format(comment.createdAt, 'MMMM d, yyyy')}
                </div>

              </CardHeader>
              <CardContent>
                <Card className='p-2 bg-slate-50 '>

                  <p>{comment.text}</p>
                </Card>
              </CardContent>


            </div>



          </li>

        ))}

      </ul>

    </Card>


  )
}

export default Comments

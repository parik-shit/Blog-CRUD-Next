import React from 'react'
import prisma from '@/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'

import { posts } from '@/app/data/posts'



const BlogsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-8 pt-20 ">
      <h1 className='text-3xl font-bold mb-4'>Blogs</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'> 
        { posts.map((post) => (

          <Link key={post.id}
            href={`/blogs/${post.id}`}
           >
            <Card>
              <CardHeader>
                <CardTitle>{post.title} </CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Written by: {post.author?.name}</p>
              </CardContent>
              <CardFooter>
                <p>Comments:  </p>
              </CardFooter>
            </Card>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default BlogsPage

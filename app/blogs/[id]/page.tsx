import React, { FC } from 'react'
import Comments from '../../components/comments';
import FormComment from '../../components/formComments';
import prisma from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import ReadMore from '@/app/components/toggle-readmore';
import generateTexts from '@/app/components/generate-texts';
interface BlogDetailPageProps {
    params: {
      id: string;
    };
  }
  


  const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
    const post: any = await prisma.post.findFirst({
      where: {
        id: params.id,
      },
      include: {
        author: true,
      },
    });
  
    const maxLength = 300;
    const [initialText, expandedText] = generateTexts(post?.content, maxLength); 
    //number of posts can be null. Therefore write the logic when it is null (no data received)
   
  
    return (
      <div className='max-w-4xl mx-auto pt-4 '>
     

        <CardTitle>
          

        <h1 className='text-3xl font-bold'>
            {post?.title}
            </h1>
        </CardTitle>
        <CardDescription>

        <p>Written by: 
            {post?.author?.name}
        </p>
        </CardDescription>
       
        

 
{/* ToDO - Need to write logic for handling text < maxLength */}
        
{/*       

       { if(post.content.length < 300) {
 <div className="container mx-auto py-8 text-l">{post?.content} </div>

}else{<div className="container mx-auto py-8 text-l">

  <ReadMore initialText={initialText} expandedText={expandedText} />
</div>
    
}} */}


<div className="container mx-auto py-8 text-l">

<ReadMore initialText={initialText} expandedText={expandedText} />
</div>
            
          
           

        
        

        <Comments postId= {params.id} />
        {/* <Comments postId={params.id} /> */}
        <FormComment postId= {params.id}  />
        {/* <FormComment postId={params.id} /> */}
      </div>
    );
  };
  
  export default BlogDetailPage;

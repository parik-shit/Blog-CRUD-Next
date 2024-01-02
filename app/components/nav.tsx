import React from 'react'
import { MoonStarIcon } from 'lucide-react'
import { getCurrentUser } from '@/lib/session';

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ButtonLogout from './logout-button';




const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <div className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
      <Link href='/'>
              
              <MoonStarIcon   />
            </Link>
            
    
      <div className='md:max-w-screen-3xl mx-auto flex items-center w-full justify-between '>

        <div className='right-4 space-x-4 md:block md:w-auto flex items-center justify-between w-full absolute  '>
        {user?.name ? (
            <ButtonLogout />
          ) : ( 
          <Button size="sm" variant='outline' asChild>
            <Link href='/api/auth/signin'>
              Login
            </Link>
          </Button>)}
          <Button size="sm" asChild><Link href='/blogs'>blogs</Link></Button>
        </div>
      </div>

    </div>
  )
}

export default Navbar


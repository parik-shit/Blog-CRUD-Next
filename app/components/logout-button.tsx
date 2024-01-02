'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const ButtonLogout = () => {
  return (
    <Button size='sm' onClick={() => signOut()} className='text-white hover:underline'>
      Logout
    </Button>
  );
};

export default ButtonLogout;
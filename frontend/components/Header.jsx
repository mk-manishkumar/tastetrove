import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        Logo

        <div> Nav Links </div>
        
        <div className='flex items-center space-x-4'>
          {/* Show the user button when the user is signed in */}
        <SignedIn>
          <UserButton />  
        </SignedIn>
        {/* Show the sign in and sign up buttons when the user is signed out */}
            <SignedOut>
                <SignInButton mode="modal">
                    <button variant="ghost" className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium">
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button variant="primary" className="rounded-full px-6">
                        Get Started
                    </Button>
                </SignUpButton>
            </SignedOut>
        
        </div>
      
        </nav>
    </header>
  )
}

export default Header
'use client';
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { Brain, Sparkles } from 'lucide-react'

const MenuOption: { name: string; path: string }[] = []

function AppHeader() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-slate-200/20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white/40 to-purple-50/30 pointer-events-none"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-0 right-20 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-pulse animation-delay-2000 pointer-events-none"></div>
      
      <div className="relative flex w-full items-center justify-between px-6 py-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Enhanced Logo with Multiple Elements */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            
            {/* Main logo container */}
            <div className="relative flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-pink-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Brain className="w-5 h-5 text-white drop-shadow-lg" />
              
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Brand Name */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-violet-700 to-pink-700 bg-clip-text text-transparent group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-300">
              PrepMind
            </h1>
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300 rounded-full"></div>
          </div>
        </div>

        {/* Center Section - Navigation (Empty for now but styled for future use) */}
        <div className="hidden md:flex items-center gap-8">
          {/* Future navigation items can go here */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            AI-Powered
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {/* Enhanced UserButton Container */}
          <div className="relative group">
            {/* Subtle glow around user button */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            
            {/* Glass morphism container */}
            <div className="relative bg-white/60 backdrop-blur-sm rounded-full p-1 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-white/50 hover:ring-violet-400/50 transition-all duration-300",
                    userButtonPopoverCard: "backdrop-blur-xl bg-white/80 border border-white/30 shadow-2xl",
                    userButtonPopoverActionButton: "hover:bg-violet-50 transition-colors duration-200"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent"></div>
      
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </nav>
  )
}

export default AppHeader
// import { UserButton } from '@clerk/nextjs'
// import React from 'react'
// import Dashboard from '../dashboard/page'

// const MenuOption: { name: string; path: string }[] = []

// function AppHeader() {
//   return (
//     <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
//       <div className="flex items-center gap-2">
//         <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
//         <h1 className="text-base font-bold md:text-2xl">PerpMind</h1>
//       </div>
//       <div />
//       <UserButton/>
     
//     </nav>
//   )
// }

// export default AppHeader
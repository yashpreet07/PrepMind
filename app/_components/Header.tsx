'use client';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { motion } from "motion/react"

function Header() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex w-full items-center justify-between border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl px-6 py-5 dark:border-neutral-800/50 dark:bg-neutral-900/80"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5"></div>
      
      {/* Enhanced Logo Section - Matching Dashboard */}
      <motion.div 
        className="flex items-center gap-3 group cursor-pointer relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Enhanced Logo with Multiple Elements */}
        <div className="relative">
          {/* Outer glow */}
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50"
            animate={{ 
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Main logo container */}
          <div className="relative flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-pink-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
            {/* Brain icon using lucide-react style */}
            <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1">
              <motion.svg 
                className="w-3 h-3 text-yellow-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.835-.822 1.18-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.009-.767-.581-.64-1.89-.387-4.506l.066-.677c.072-.743.108-1.115.001-1.46-.107-.345-.346-.623-.822-1.18l-.434-.507c-1.677-1.96-2.515-2.941-2.223-3.882.293-.941 1.523-1.219 3.982-1.776l.636-.144c.7-.158 1.05-.237 1.33-.45.28-.213.46-.536.82-1.182l.328-.588z"/>
              </motion.svg>
            </div>
          </div>
        </div>
        
        {/* Brand Name */}
        <div className="flex flex-col">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-violet-700 to-pink-700 bg-clip-text text-transparent group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            PrepMind
          </motion.h1>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300 rounded-full"></div>
        </div>
      </motion.div>

      {/* Enhanced CTA Button */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/dashboard">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
            
            <Button 
              size="lg" 
              className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-xl px-6 py-3 text-base font-semibold border-0"
            >
              <span className="flex items-center gap-2">
                Get Started
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-sm"
                >
                  →
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 h-px w-32 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      <div className="absolute top-0 right-1/4 h-px w-32 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      {/* Bottom decorative line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.nav>
  )
}

export default Header

// "use client";
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import React from 'react'
// import { motion } from "motion/react"

// function Header() {
//   return (
//     <motion.nav 
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="relative flex w-full items-center justify-between border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl px-6 py-5 dark:border-neutral-800/50 dark:bg-neutral-900/80"
//     >
//       {/* Animated background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5"></div>
      
//       {/* Enhanced Logo Section */}
//       <motion.div 
//         className="flex items-center gap-3 relative z-10"
//         whileHover={{ scale: 1.05 }}
//         transition={{ duration: 0.2 }}
//       >
//         <div className="relative">
//           {/* Animated background glow */}
//           <motion.div 
//             className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 blur-sm"
//             animate={{ 
//               scale: [1, 1.1, 1],
//               opacity: [0.7, 0.9, 0.7]
//             }}
//             transition={{ 
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//           <div className="relative size-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg">
//             <div className="absolute inset-1 rounded-full bg-white/20"></div>
//           </div>
//         </div>
        
//         <motion.h1 
//           className="text-xl font-black md:text-3xl bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 bg-clip-text text-transparent dark:from-slate-100 dark:via-purple-300 dark:to-slate-100"
//           whileHover={{ 
//             scale: 1.02,
//             transition: { duration: 0.2 }
//           }}
//         >
//           PerpMind
//         </motion.h1>
        
//         {/* Floating sparkle animation */}
//         <motion.div
//           className="absolute -top-1 -right-1 text-xs"
//           animate={{ 
//             rotate: [0, 360],
//             scale: [0.8, 1.2, 0.8]
//           }}
//           transition={{ 
//             duration: 3,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         >
//           ✨
//         </motion.div>
//       </motion.div>

//       {/* Enhanced CTA Button */}
//       <motion.div
//         className="relative z-10"
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         <Link href="/dashboard">
//           <motion.div
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//             className="relative group"
//           >
//             {/* Animated glow effect */}
//             <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
            
//             <Button 
//               size="lg" 
//               className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-xl px-6 py-3 text-base font-semibold border-0"
//             >
//               <span className="flex items-center gap-2">
//                 Get Started
//                 <motion.span
//                   animate={{ x: [0, 3, 0] }}
//                   transition={{ 
//                     duration: 1.5, 
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   className="text-sm"
//                 >
//                   →
//                 </motion.span>
//               </span>
//             </Button>
//           </motion.div>
//         </Link>
//       </motion.div>

//       {/* Decorative elements */}
//       <div className="absolute top-0 left-1/4 h-px w-32 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
//       <div className="absolute top-0 right-1/4 h-px w-32 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
//       {/* Bottom decorative line */}
//       <motion.div 
//         className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
//         initial={{ width: "0%" }}
//         animate={{ width: "100%" }}
//         transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
//       />
//     </motion.nav>
//   )
// }

// export default Header

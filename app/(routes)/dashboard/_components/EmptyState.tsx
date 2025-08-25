import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import CreateInterviewDialog from '../../_components/CreateInterviewDialog';

function EmptyState() {
  return (
    <div className='mt-14 relative'>
      {/* Background blur elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      
      <div className='relative flex flex-col items-center gap-8 p-16 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/30 shadow-2xl overflow-hidden'>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        {/* Image container with glow effect */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/60 p-6 rounded-full backdrop-blur-sm border border-white/40 shadow-lg">
            <Image 
              src='/interview.png' 
              alt='emptystate'
              width={130}
              height={130}
              className="relative z-10 drop-shadow-lg"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center space-y-4 relative z-10">
          <h2 className='text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent'>
            No Interviews Yet
          </h2>
          <p className='text-slate-600 max-w-md leading-relaxed'>
            Start your journey by creating your first AI-powered interview. 
            Get personalized questions and detailed feedback to ace your next job interview.
          </p>
        </div>
        
        {/* Enhanced button container */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
          <div className="relative">
            <CreateInterviewDialog/>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-8 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-12 w-1 h-8 bg-gradient-to-b from-transparent via-blue-300 to-transparent opacity-50"></div>
        <div className="absolute bottom-1/3 left-12 w-8 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50"></div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

export default EmptyState;
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React from 'react'
//   import CreateInterviewDialog from '../../_components/CreateInterviewDialog';

//   function EmptyState() {
//   return (
//     <div className='mt-14 flex flex-col items-center gap-5 border-dashed p-10 border-4 rounded-2xl bg-gray-50'>
//         <Image src = {'/interview.png'} alt = 'emptystate'
//         width={130}
//         height={130}
//         />
//         <h2 className='mt-2 text-lg text-gray-500'>You Do Not Have Any Interview Created</h2>
//         <CreateInterviewDialog/>
//     </div>
//   )
// }

// export default EmptyState;
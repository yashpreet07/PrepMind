"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState';
import CreateInterviewDialog from '../_components/CreateInterviewDialog';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import InterviewCard from './_components/InterviewCard';
import { Skeleton } from "@/components/ui/skeleton"
import { FeedbackInfo } from './_components/FeedbackDialog';
import { UserDetailContext } from '@/context/UserDetailContext';

export type InterviewData = {
  _id: string;
  _creationTime: number;
  interviewQuestions: any;
  resumeUrl: string | null;
  userId: string;
  jobTitle: string | null;
  jobDesciption: string | null;
  status: string;
  feedback?: string | FeedbackInfo | null;
}

function Dashboard() {
const {user} = useUser();
const [interviewList,setInterviewList] = useState<InterviewData[]>([]);
const convex = useConvex();
const { userDetail } = useContext(UserDetailContext);
const [loading,setLoading] = useState(true);

useEffect(()=>{
  if(!user) return;
  if(userDetail?._id){
    GetInterviewList();
  }
},[user, userDetail]);

const GetInterviewList = async () => {
  setLoading(true);
  const result = await convex.query(api.Interview.GetInterviewList,{
    userId: userDetail?._id
  });
  // Normalize feedback shape for card/dialog
  const normalized = result.map((it:any)=> ({
    ...it,
    _id: String(it._id),
    userId: String(it.userId),
    feedback: typeof it.feedback === 'string' ? { feedback: it.feedback } : it.feedback ?? undefined
  }));
  setInterviewList(normalized);
  setLoading(false);
}

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className='relative z-10 py-20 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-40'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12'>
          <div className='space-y-2'>
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h2 className='text-lg font-medium text-slate-600 tracking-wide'>My Dashboard</h2>
            </div>
            <div className="pl-5">
              <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight'>
                Welcome, <span className="text-blue-600">{user?.fullName}</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
            </div>
          </div>
          
          {/* Enhanced Create Button Container */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative">
              <CreateInterviewDialog/>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {!loading && interviewList.length === 0 ? (
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl"></div>
            <div className="relative z-10">
              <EmptyState/>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Bar */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800">{interviewList.length}</div>
                    <div className="text-sm text-slate-600">Total Interviews</div>
                  </div>
                  <div className="w-px h-12 bg-slate-300"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {interviewList.filter(i => i.status === 'completed').length}
                    </div>
                    <div className="text-sm text-slate-600">Completed</div>
                  </div>
                  <div className="w-px h-12 bg-slate-300"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {interviewList.filter(i => i.status === 'pending').length}
                    </div>
                    <div className="text-sm text-slate-600">Pending</div>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Live Dashboard
                </div>
              </div>
            </div>

            {/* Interview Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {interviewList.map((interview, index) => (
                <div 
                  key={interview._id} 
                  className="group transform transition-all duration-300 hover:scale-105"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <InterviewCard interviewInfo={interview} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            {/* Loading Stats */}
            <div className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-6">
                <Skeleton className="h-16 w-20 rounded-lg" />
                <div className="w-px h-12 bg-slate-300"></div>
                <Skeleton className="h-16 w-20 rounded-lg" />
                <div className="w-px h-12 bg-slate-300"></div>
                <Skeleton className="h-16 w-20 rounded-lg" />
              </div>
            </div>

            {/* Loading Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[1,2,3,4,5,6].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4"
                >
                  <Skeleton className="h-32 w-full rounded-xl bg-slate-200" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-3/4 bg-slate-200" />
                    <Skeleton className="h-4 w-1/2 bg-slate-200" />
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-8 w-20 rounded-full bg-slate-200" />
                      <Skeleton className="h-8 w-24 rounded-full bg-slate-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
// "use client"
// import { Button } from '@/components/ui/button';
// import { useUser } from '@clerk/nextjs';
// import React, { useContext, useEffect, useState } from 'react'
// import EmptyState from './_components/EmptyState';
// import CreateInterviewDialog from '../_components/CreateInterviewDialog';
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import InterviewCard from './_components/InterviewCard';
// import { Skeleton } from "@/components/ui/skeleton"
// import { FeedbackInfo } from './_components/FeedbackDialog';
// import { UserDetailContext } from '@/context/UserDetailContext';

// export type InterviewData = {
//   _id: string;
//   _creationTime: number;
//   interviewQuestions: any;
//   resumeUrl: string | null;
//   userId: string;
//   jobTitle: string | null;
//   jobDesciption: string | null;
//   status: string;
//   feedback?: string | FeedbackInfo | null;
// }


// function Dashboard() {
// const {user} = useUser();
// const [interviewList,setInterviewList] = useState<InterviewData[]>([]);
// const convex = useConvex();
// const { userDetail } = useContext(UserDetailContext);
// const [loading,setLoading] = useState(true);

// useEffect(()=>{
//   if(!user) return;
//   if(userDetail?._id){
//     GetInterviewList();
//   }
// },[user, userDetail]);

// const GetInterviewList = async () => {
//   setLoading(true);
//   const result = await convex.query(api.Interview.GetInterviewList,{
//     userId: userDetail?._id
//   });
//   // Normalize feedback shape for card/dialog
//   const normalized = result.map((it:any)=> ({
//     ...it,
//     _id: String(it._id),
//     userId: String(it.userId),
//     feedback: typeof it.feedback === 'string' ? { feedback: it.feedback } : it.feedback ?? undefined
//   }));
//   setInterviewList(normalized);
//   setLoading(false);
// }


//   return (
//     <div className='py-20 px-10 md:px-28 lg:px-44 xl:px-56'>
//         <div className='flex justify-between items-center'>
//             <div>
//                 <h2 className='text-lg text-gray-500' >My Dashboard</h2>
//                 <h2 className='text-3xl font-bold '>Welcome,{user?.fullName}</h2>
//             </div>
//             <CreateInterviewDialog/>
//         </div>
//         {!loading && interviewList.length == 0 ?
//         <EmptyState/>
//         :
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 '>
//           {interviewList.map((interview,index)=>(
//             <div key={interview._id}>
//               <InterviewCard interviewInfo={interview} key={index}/>
//             </div>
//           ))}
//           </div>
//         }
//           {loading && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
//           {
//             [1,2,3,4,5,6].map((item,index) => (
//               <div className="flex flex-col space-y-3" key = {index}>
//               <Skeleton className="h-[125px] w-full rounded-xl" />
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-[250px]" />
//                 <Skeleton className="h-4 w-[200px]" />
//               </div>
//             </div>
//           ))
//           }
//         </div>
// }
//     </div>
//   )
// }

// export default Dashboard
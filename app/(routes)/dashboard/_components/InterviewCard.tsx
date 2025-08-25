import React from 'react'
import { InterviewData } from '../page'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { ArrowRight, Link, FileText, Briefcase } from 'lucide-react'
import FeedbackDialog from './FeedbackDialog'

type props = {
  interviewInfo: InterviewData
}

function InterviewCard({interviewInfo}: props) {
  const isResumeInterview = interviewInfo.resumeUrl;
  const statusColors = {
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const statusColor = statusColors[interviewInfo.status as keyof typeof statusColors] || statusColors.default;

  return (
    <div className='group relative h-full'>
      {/* Subtle background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className='relative h-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'>
        {/* Header gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
        
        {/* Icon and Title Section */}
        <div className='relative z-10 mb-4'>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Icon with gradient background */}
              <div className={`p-2 rounded-lg ${isResumeInterview ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 'bg-gradient-to-br from-purple-100 to-purple-200'}`}>
                {isResumeInterview ? (
                  <FileText className="w-5 h-5 text-blue-600" />
                ) : (
                  <Briefcase className="w-5 h-5 text-purple-600" />
                )}
              </div>
              
              {/* Title */}
              <h2 className='text-lg font-bold text-slate-800 truncate'>
                {isResumeInterview ? 'Resume Interview' : interviewInfo.jobTitle}
              </h2>
            </div>

            {/* Enhanced Status Badge */}
            <Badge 
              variant='outline' 
              className={`${statusColor} font-medium px-3 py-1 text-xs border shadow-sm`}
            >
              {interviewInfo.status}
            </Badge>
          </div>
          
          {/* Description */}
          <p className='text-slate-600 text-sm leading-relaxed line-clamp-2 pl-11'>
            {isResumeInterview 
              ? 'AI-powered interview questions generated based on your resume and experience'
              : `Practice interview for ${interviewInfo.jobTitle} position with tailored questions`
            }
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4"></div>

        {/* Action Section */}
        <div className='flex justify-between items-center gap-3'>
          {/* Feedback Dialog */}
          {interviewInfo?.feedback && (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg blur opacity-60"></div>
              <div className="relative">
                <FeedbackDialog feedbackInfo={interviewInfo.feedback} />
              </div>
            </div>
          )}

          {/* Start Interview Button */}
          <Link href={'/interview/' + interviewInfo?._id} className="flex-1">
            <Button 
              variant='outline' 
              className="w-full group/btn bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300 hover:bg-blue-50/80 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="font-medium">Start Interview</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-full"></div>
        
        {/* Subtle border highlight on hover */}
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:via-transparent group-hover:to-purple-500/20 transition-all duration-500 pointer-events-none"></div>
      </div>
    </div>
  )
}

export default InterviewCard
// import React from 'react'
// import { InterviewData } from '../page'
// import { Badge } from "@/components/ui/badge"
// import { Button } from '@/components/ui/button'
// import { ArrowRight, Link } from 'lucide-react'
// import FeedbackDialog from './FeedbackDialog'
// type props = {
// interviewInfo : InterviewData
// }

// function InterviewCard({interviewInfo}:props) {
//   return (
//     <div className='border-2 border-gray-200 rounded-lg p-4'>
//         <h2 className='text-lg font-semibold flex justify-between items-center gap-2'>
//             {interviewInfo.resumeUrl ? 'resumeInterview' : interviewInfo.jobTitle}
//             <Badge variant='outline'>{interviewInfo.status}</Badge>
//         </h2>
//         <p className='line-clamp-2 text-gray-500'>{interviewInfo.resumeUrl ? 'We generated this Interview based on your resume' : interviewInfo.jobTitle}</p>

//         <div className='mt-5 flex justify-between items-center'>
//                 {interviewInfo?.feedback && <FeedbackDialog feedbackInfo={interviewInfo.feedback} />}
//                 <Link href={'/interview/'+interviewInfo?._id}>
//                     <Button variant={'outline'}>StartInterview <ArrowRight/></Button>
//                 </Link>
//         </div>
//     </div>
//   )
// }

// export default InterviewCard
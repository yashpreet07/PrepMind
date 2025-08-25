"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import { Lightbulb, WebcamIcon, Video, VideoOff, Mic, MicOff } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

type interviewData = {
    jobTitile : String | null,
    jobDescription : String| null,
    interviewQuestion : [InterviewQuestions],
    userId : string| null,
    _id : string
}

type InterviewQuestions = {
    answer : string,
    question : string
}

function Interview() {
    const { interviewId } =  useParams();
    const convex = useConvex();
    const [interviewData,setInterviewData] = useState<interviewData>();
    const [webCamEnanbled,setWebCamEnabled] = useState(false);
    const [keepWebcam, setKeepWebcam] = useState<boolean>(false);

    useEffect(() => {
        // Restore user preference
        if (typeof window === 'undefined') return;
        const saved = window.localStorage.getItem('pm_keep_webcam');
        if (saved === '1') setKeepWebcam(true);
    }, []);

    const toggleKeepWebcam = () => {
        setKeepWebcam((prev) => {
            const next = !prev;
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('pm_keep_webcam', next ? '1' : '0');
            }
            return next;
        });
    };


    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6'>
            <div className='max-w-6xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3'>
                        Let's Start The Interview
                    </h1>
                    <p className='text-gray-600 text-lg'>
                        Prepare yourself for an AI-powered mock interview experience
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    {/* Information Panel */}
                    <div className='space-y-6'>
                        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                            <div className='bg-gradient-to-r from-amber-400 to-orange-400 p-4'>
                                <h2 className='flex gap-3 items-center text-white font-semibold text-lg'>
                                    <div className='bg-white/20 rounded-full p-2'>
                                        <Lightbulb className='h-5 w-5'/>
                                    </div>
                                    Interview Information
                                </h2>
                            </div>
                            <div className='p-6'>
                                <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
                                    <p className='text-amber-800 leading-relaxed'>
                                        {process.env.NEXT_PUBLIC_INFORMATION || 
                                         "Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview. It has 5 questions which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interview Details Card */}
                        {interviewData && (
                            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
                                <h3 className='text-xl font-semibold text-gray-800 mb-4'>Interview Details</h3>
                                <div className='space-y-3'>
                                    {interviewData.jobTitile && (
                                        <div>
                                            <span className='text-sm font-medium text-gray-500'>Position:</span>
                                            <p className='text-gray-800'>{interviewData.jobTitile}</p>
                                        </div>
                                    )}
                                    <div>
                                        <span className='text-sm font-medium text-gray-500'>Questions:</span>
                                        <p className='text-gray-800'>{interviewData.interviewQuestion?.length || 5} questions prepared</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Camera Section */}
                    <div className='flex flex-col'>
                        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex-1'>
                            <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-4'>
                                <h3 className='text-white font-semibold text-lg flex items-center gap-3'>
                                    <div className='bg-white/20 rounded-full p-2'>
                                        <Video className='h-5 w-5'/>
                                    </div>
                                    Camera Preview
                                </h3>
                            </div>
                            
                            <div className='p-6'>
                                <div className='relative bg-gray-900 rounded-xl overflow-hidden aspect-video'>
                                    {webCamEnanbled ? (
                                        <div className='relative w-full h-full'>
                                            <Webcam
                                                onUserMedia={()=>setWebCamEnabled(true)}
                                                onUserMediaError={()=>setWebCamEnabled(false)}
                                                mirrored={true}
                                                className='w-full h-full object-cover rounded-xl'
                                            />
                                            <div className='absolute top-4 right-4 flex gap-2'>
                                                <div className='bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1'>
                                                    <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                                                    LIVE
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col items-center justify-center h-full text-gray-400'>
                                            <div className='bg-gray-800 rounded-full p-8 mb-4'>
                                                <WebcamIcon className='h-16 w-16'/>
                                            </div>
                                            <h4 className='text-lg font-medium mb-2'>Camera Disabled</h4>
                                            <p className='text-sm text-center max-w-xs'>
                                                Enable your camera and microphone to begin the interview
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Camera Controls */}
                                <div className='mt-6 flex justify-center'>
                                    {!webCamEnanbled ? (
                                        <Button 
                                            onClick={()=>{setWebCamEnabled(true)}}
                                            className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2'
                                        >
                                            <Video className='h-5 w-5'/>
                                            Enable Camera & Microphone
                                        </Button>
                                    ) : (
                                        <div className='flex gap-3'>
                                            <Button 
                                                variant='outline'
                                                onClick={()=>{setWebCamEnabled(false)}}
                                                className='border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2'
                                            >
                                                <VideoOff className='h-4 w-4'/>
                                                Disable Camera
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Start Interview Section */}
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                        <div className='text-center md:text-left'>
                            <h3 className='text-2xl font-bold text-gray-800 mb-2'>Ready to Begin?</h3>
                            <p className='text-gray-600'>
                                Make sure your camera and microphone are working properly before starting.
                            </p>
                            <div className='flex flex-wrap gap-2 mt-3'>
                                <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
                                    ✓ AI-Powered Questions
                                </span>
                                <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                                    ✓ Instant Feedback
                                </span>
                                <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'>
                                    ✓ Detailed Report
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 mb-3'>
                            <label className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={keepWebcam}
                                    onChange={toggleKeepWebcam}
                                    className='h-4 w-4 rounded border-gray-300'
                                />
                                Keep webcam active during interview
                            </label>
                        </div>
                        <Link href={`/interview/${interviewId}/start?cam=${keepWebcam ? '1' : '0'}`}>
                            <Button 
                                disabled={!webCamEnanbled}
                                className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 min-w-[200px]'
                            >
                                {webCamEnanbled ? 'Start Interview' : 'Enable Camera First'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interview;




// "use client";
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { ArrowRight, Send } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'
// import React from 'react'

// function Interview() {
//     const {interviewId} = useParams();
//   return (
//     <div className='flex flex-col items-center justify-center mt-10'>
//         <div className='max-w-3xl w-full'>
//             <Image src ={'/sInterview.png'} alt = 'interviewImage'
//             width = {400}
//             height = {200}
//             className='w-full h-[390px] object-cover'
//             />
//             <div className='p-6 flex flex-col items-center space-y-5'>
//                 <h2 className='font-bold text-3xl text-center'>Ready To Start The Interview?</h2>
//                 <p className='text-grey-500 text-center'>
//                     This Interview Wil Last 30 Minutes.Are You Ready?
//                 </p>
//                 <Link href={'/interview/'+interviewId+'/start'}>
//                 <Button>Start Interview <ArrowRight/></Button>
//                 </Link>


//                 <hr />
//                 <div className='p-6 bg-gray-50 rounded-2xl'>
//                     <h2 className='font-semibold text-2xl'>Want To Send The Interview Link To Someone?</h2>
//                     <div className='flex gap-5 w-full max-w-xl mt-2'>
//                         <Input placeholder='Enter Email Address' className='w-full'/>
//                         <Button><Send/></Button>
//                     </div>
//                 </div>
                

//             </div>
//         </div>
//     </div>
    
//   )
// }

// export default Interview
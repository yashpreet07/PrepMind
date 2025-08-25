"use client";
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import dynamic from 'next/dynamic';
const RecordAnswer = dynamic(() => import('./_components/RecordAnswer'), { ssr: false });
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

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

function StartInterview() {
    const { interviewId } =  useParams();
    const convex = useConvex();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [interviewData,setInterviewData] = useState<interviewData>();
    const [interviewQuestion,setInterviewQuestion] = useState<InterviewQuestions[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [ending, setEnding] = useState<boolean>(false);
    useEffect(() => {
        GetInterviewQuestions();
    },[interviewId]);

    /*
    Used to get the interview questions from the database using the interviewId
    */
    const GetInterviewQuestions = async() => {
        const result = await convex.query(api.Interview.GetInterviewQuestion,{
            // @ts-ignore
            interviewRecordId : interviewId
        })
        if(!result || result.length===0) return;
        const record: any = result[0];
        const raw = record?.interviewQuestions;
        let questions: any[] = [];
        if(typeof raw === 'string'){
            try { questions = JSON.parse(raw); } catch { questions = []; }
        } else if (Array.isArray(raw)) {
            questions = raw;
        } else if (raw && Array.isArray(raw?.questions)) {
            questions = raw.questions;
        }
        setInterviewQuestion(questions as any);
        // store top-level interview data if needed
        // @ts-ignore
        setInterviewData(record);
    }

    const onEndInterview = async () => {
        if(!interviewId) return;
        try{
            setEnding(true);
            // 1) get all answers/messages
            const messages = await convex.query(api.Interview.ListInterviewAnswers, {
                // @ts-ignore
                interviewId
            });
            // 2) request feedback from n8n api route
            const res = await axios.post('/api/interview-feedback', { messages });
            const feedback = res?.data ?? null;
            // 3) store feedback on interview record only after we successfully get it
            if (feedback) {
                await convex.mutation(api.Interview.UpdateFeedback, {
                    // @ts-ignore
                    recordId: interviewId,
                    feedback
                });
            }
            // 4) toast + redirect
            if (typeof window !== 'undefined') {
                // minimal inline toast without external dep
                const div = document.createElement('div');
                div.textContent = 'Interview feedback is ready!';
                div.style.cssText = 'position:fixed;top:20px;right:20px;background:#16a34a;color:white;padding:10px 12px;border-radius:8px;z-index:9999;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,.2)';
                document.body.appendChild(div);
                setTimeout(()=>{div.remove();}, 2000);
            }
            router.push('/dashboard');
        }catch(e){
            console.error(e);
        } finally {
            setEnding(false);
        }
    }
    

 return (
<div className='p-6 space-y-4'>
        <div className='space-y-3'>
            {/* Header with all 5 questions for navigation */}
            <div className='flex gap-2 overflow-x-auto pb-1'>
                {interviewQuestion?.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`px-3 py-2 rounded-full text-xs font-medium border whitespace-nowrap ${idx===currentIndex? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700'}`}
                        title={q.question}
                    >
                        {`Q${idx+1}: ${q.question}`}
                    </button>
                ))}
            </div>
            <div className='flex gap-2'>
                <Button
                    variant='outline'
                    disabled={currentIndex===0}
                    onClick={()=> setCurrentIndex((i)=> Math.max(0,i-1))}
                >Prev</Button>
                <Button
                    disabled={currentIndex>=interviewQuestion.length-1}
                    onClick={()=> setCurrentIndex((i)=> Math.min(interviewQuestion.length-1,i+1))}
                >Next</Button>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Question */}
            <QuestionSection 
                interviewQuestion = {interviewQuestion}
                currentIndex={currentIndex}
            />
            {/* Audio Recording */}
            <RecordAnswer 
                currentIndex={currentIndex}
                question={interviewQuestion[currentIndex]?.question || ''}
            />
        </div>

        <div className='flex justify-end'>
            <Button onClick={onEndInterview} disabled={ending} className='bg-red-600 hover:bg-red-700'>
                {ending && <Loader2Icon className='animate-spin'/>} End Interview
            </Button>
        </div>
    </div>
  )
}

export default StartInterview
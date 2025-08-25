"use client";
import React, { useMemo } from 'react'
import { Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
type InterviewQuestions = {
    answer: string
    question: string
}

type InterviewQuestionProps = {
    interviewQuestion: InterviewQuestions[]
    currentIndex?: number
}

function QuestionSection({ interviewQuestion, currentIndex = 0 }: InterviewQuestionProps) {
  const current = useMemo(()=> interviewQuestion?.[currentIndex]?.question || '', [interviewQuestion, currentIndex]);

  const speak = () => {
    if (typeof window === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(current);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className='p-5 border rounded-lg'>
      <div className='bg-white rounded-xl p-4 shadow-sm border'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs uppercase tracking-wide text-gray-500 mb-1'>Current Question</p>
            <h2 className='text-lg font-semibold text-gray-800'>{current || '...'}</h2>
          </div>
          <Button variant='outline' onClick={speak} className='shrink-0'>
            <Volume2 className='h-4 w-4'/> Speak
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionSection
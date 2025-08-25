"use client";
import React, { useEffect, useMemo, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import { Button } from '@/components/ui/button'
import { Mic, Square, Save } from 'lucide-react'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'

type Props = {
  currentIndex: number
  question: string
}

function RecordAnswer({ currentIndex, question }: Props) {
  const convex = useConvex();
  const { interviewId } = useParams();
  const [transcript, setTranscript] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  useEffect(() => {
    const text = results
      .map((r: any) => (typeof r === 'string' ? r : r?.transcript || ''))
      .join(' ');
    setTranscript(text);
  }, [results]);

  useEffect(() => {
    // Reset transcript when question changes
    setResults([]);
    setTranscript('');
  }, [currentIndex, setResults]);

  const onSave = async () => {
    if (!question || !transcript.trim()) return;
    setIsSaving(true);
    try {
      // @ts-ignore
      await convex.mutation(api.Interview.SaveInterviewAnswer, {
        // @ts-ignore
        interviewId,
        questionIndex: currentIndex,
        question,
        answer: transcript.trim(),
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className='p-5 border rounded-lg space-y-4'>
      <div className='bg-white rounded-xl p-4 border shadow-sm'>
        <p className='text-sm text-gray-600 mb-2'>Your Answer (speech-to-text)</p>
        <div className='min-h-[120px] bg-gray-50 rounded-lg p-3 text-gray-800'>
          {transcript || (interimResult ? `${interimResult}…` : 'Press Record and start speaking...')}
        </div>
        {error && <p className='text-xs text-red-600 mt-2'>Speech recognition error: {String(error)}</p>}
      </div>

      <div className='flex gap-3'>
        {!isRecording ? (
          <Button onClick={startSpeechToText} className='bg-green-600 hover:bg-green-700'>
            <Mic className='h-4 w-4'/> Record
          </Button>
        ) : (
          <Button onClick={stopSpeechToText} variant='destructive'>
            <Square className='h-4 w-4'/> Stop
          </Button>
        )}
        <Button onClick={onSave} disabled={!transcript.trim() || isSaving} variant='outline'>
          <Save className='h-4 w-4'/> Save Answer
        </Button>
      </div>
    </div>
  )
}

export default RecordAnswer
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'


function JobDesciption({onHandleInputChange} : any) {
  return (
    <div className='border rounded-2xl'>
        <div>
            <label>Job Title</label>
            <Input placeholder = 'FullStack Developer'
            onChange={(event) => onHandleInputChange('jobTitle',event.target.value)}
            />
        </div>
        <div className='mt-6'>
            <label>Job Description</label>
            <Textarea placeholder='Enter or paste job Description' className='h-[200px]'
            onChange={(event) => onHandleInputChange('jobDescription',event.target.value)}
            />
        </div>
        
    </div>
  )
}

export default JobDesciption
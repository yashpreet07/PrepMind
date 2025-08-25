import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeUpload from './ResumeUpload'
import JobDesciption from './JobDesciption'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'


function CreateInterviewDialog() {
    const [formData,setFormData] = useState<any>();
    const [file,setFile] = useState<File|null>();
    const [loading,setLoading] = useState(false);

    const {userDetail,setUserDetail} = useContext(UserDetailContext);

    const saveInterviewQuestion = useMutation(api.Interview.SaveInterviewQuestion);
    const router = useRouter();

    const onHandleInputChange = (filed:string,value:string) => {
            setFormData((prev : any) => ({
                ...prev,
                [filed] : value,
                
            }))
    }



   const onSubmit = async() => {
      setLoading(true);
      const Form_Data = new FormData();
      Form_Data.append('file', file ?? '');
      Form_Data?.append('jobTitle', formData?.jobtitle);
      Form_Data?.append('jobDescription', formData?.jobDescription);
      
  try {
    const res = await axios.post('api/generate-interview-question', Form_Data);
    console.log("API Response:", res.data);

    // Log the context user detail here
    console.log("userDeatil:", userDetail);

    // Save to database
    const interviewId = await saveInterviewQuestion({
      questions: res.data?.questions,
      resumeUrl: res?.data.resumeUrl ?? '',
      jobTitle : formData?.jobTitle ?? '',
      jobDesciption : formData?.jobDescription ?? '',
      uid: userDetail?._id 
    });
    // console.log("Convex Save Response:", interviewId);

    router.push('interview/' + interviewId);

  } catch (e) {
    console.log("Submit Error:", e);
  } finally {
    setLoading(false);
  }
}

  return (
   <Dialog>
  <DialogTrigger>
  <Button>+ Create Interview</Button>
  </DialogTrigger>
  <DialogContent className='min-w-3xl'>
    <DialogHeader>
      <DialogTitle>Please Submit The Following Details.</DialogTitle>
      <DialogDescription>
            <Tabs defaultValue="account" className="w-full mt-5">
                <TabsList>
                    <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
                    <TabsTrigger value="job-description">Job Description</TabsTrigger>
                </TabsList>
                <TabsContent value="resume-upload"><ResumeUpload setFiles={(file:File) => {setFile(file)}} /></TabsContent>
                <TabsContent value="job-description"><JobDesciption onHandleInputChange = {onHandleInputChange}/></TabsContent>
            </Tabs>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className='flex gap-6'>
        <DialogClose>
            <Button variant={'ghost'}>Cancel</Button>
        </DialogClose>
            <Button 
              onClick = {onSubmit} 
              disabled = {loading || ( !file && (!formData?.jobTitle || !formData?.jobDescription) )}
            >
              {loading && <Loader2Icon className='animate-spin'/>}Submit
            </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default CreateInterviewDialog
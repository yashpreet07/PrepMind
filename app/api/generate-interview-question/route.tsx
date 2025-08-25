import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";

var imagekit = new ImageKit({
    publicKey : "public_Wb94+PH7Q9beuepl7P45yrfutRY=",
    privateKey : "private_NqIy7SiAekLiz3JxiJsswS9C9wk=",
    urlEndpoint : "https://ik.imagekit.io/buic1td3r"
});

export async function POST(req : NextRequest) {
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const jobTitle = formData.get('jobTitle') as File;
    const jobDescription = formData.get('jobDescription') as File;



    if(file){
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    try{
        const uploadResponse = await imagekit.upload({
            file: buffer, // PDF buffer
            fileName: `${Date.now()}.pdf`,
            isPublished: true,
        });
        // Call n8n WebHook
        const result = await axios.post('https://n8n-production-ed42.up.railway.app/webhook/generate-interview-question',{
            resumeUrl : uploadResponse?.url
        });

        // console.log(result.data?.content?.parts[0]?.text);

        return NextResponse.json({
            questions : JSON.parse(result.data?.content?.parts[0]?.text || "{}"),
            resumeUrl : uploadResponse?.url
        });    
    }catch(error : any){
        console.log("upload error" ,error);
        return NextResponse.json({error : error.message},{status:500});
    }
}else{
    const result = await axios.post('https://n8n-production-ed42.up.railway.app/webhook/generate-interview-question',{
            resumeUrl : null,
            jobTitle : jobTitle,
            jobDescription : jobDescription
        });

        // console.log(result.data?.content?.parts[0]?.text);

        return NextResponse.json({
            questions : JSON.parse(result.data?.content?.parts[0]?.text || "{}"),
            resumeUrl : null
        });
}
}
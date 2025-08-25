import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest) {
    const {messages}=await req.json();
    const result=await axios.post( 'https://n8n-production-ed42.up.railway.app/webhook/feedback',{
        messages: JSON.stringify(messages)
    });
    return NextResponse.json(result.data?.content?.parts[0]?.text);
}



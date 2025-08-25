import React, { useMemo } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { MessageSquare, Lightbulb, Star, TrendingUp } from "lucide-react";

type Props = {
    feedbackInfo : FeedbackInfo | string | null | undefined
}
export type FeedbackInfo = {
    feedback : string
}

function FeedbackDialog({feedbackInfo} : Props){
    const parsed = useMemo(() => {
        const raw = typeof feedbackInfo === 'string' ? feedbackInfo : feedbackInfo?.feedback;
        if (!raw) return { overallFeedback: '', suggestions: '', rating: '' } as any;
        try {
            const obj = JSON.parse(raw);
            return {
                overallFeedback: obj?.overallFeedback ?? obj?.feedback ?? '',
                suggestions: obj?.suggestions ?? '',
                rating: obj?.rating ?? ''
            };
        } catch {
            return { overallFeedback: raw, suggestions: '', rating: '' } as any;
        }
    }, [feedbackInfo]);

    const getRatingDisplay = (rating: string) => {
        const numRating = parseFloat(rating);
        if (!isNaN(numRating)) {
            const stars = Math.min(5, Math.max(0, Math.round(numRating)));
            return (
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                        ))}
                    </div>
                    <span className="text-lg font-semibold text-slate-800">{numRating}/5</span>
                </div>
            );
        }
        return <span className="text-slate-600">{rating || '—'}</span>;
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button 
                        variant="outline"
                        className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300 hover:from-green-100 hover:to-emerald-100 text-green-700 hover:text-green-800 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        View Feedback
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    {/* Background elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 pointer-events-none"></div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <DialogHeader className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                </div>
                                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    Interview Feedback
                                </DialogTitle>
                            </div>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </DialogHeader>

                        <DialogDescription asChild>
                            <div className="space-y-6">
                                {/* Overall Feedback Section */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-50"></div>
                                    <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                                                <MessageSquare className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h3 className='text-xl font-bold text-slate-800'>Overall Feedback</h3>
                                        </div>
                                        <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-4 border border-slate-200/50">
                                            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">
                                                {parsed.overallFeedback || (
                                                    <span className="text-slate-400 italic">No feedback available</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Suggestions Section */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl blur opacity-50"></div>
                                    <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg">
                                                <Lightbulb className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <h3 className='text-xl font-bold text-slate-800'>Improvement Suggestions</h3>
                                        </div>
                                        <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl p-4 border border-amber-200/50">
                                            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">
                                                {parsed.suggestions || (
                                                    <span className="text-slate-400 italic">No suggestions available</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating Section */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-2xl blur opacity-50"></div>
                                    <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-lg">
                                                <Star className="w-5 h-5 text-yellow-600" />
                                            </div>
                                            <h3 className='text-xl font-bold text-slate-800'>Performance Rating</h3>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-50/50 to-amber-50/50 rounded-xl p-4 border border-yellow-200/50">
                                            <div className="flex items-center justify-center">
                                                {getRatingDisplay(parsed.rating)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FeedbackDialog;
// import React, { useMemo } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button";


// type Props = {
//     feedbackInfo : FeedbackInfo | string | null | undefined
// }
// export type FeedbackInfo = {
//     feedback : string
// }

// function FeedbackDialog({feedbackInfo} : Props){
//     const parsed = useMemo(() => {
//         const raw = typeof feedbackInfo === 'string' ? feedbackInfo : feedbackInfo?.feedback;
//         if (!raw) return { overallFeedback: '', suggestions: '', rating: '' } as any;
//         try {
//             const obj = JSON.parse(raw);
//             return {
//                 overallFeedback: obj?.overallFeedback ?? obj?.feedback ?? '',
//                 suggestions: obj?.suggestions ?? '',
//                 rating: obj?.rating ?? ''
//             };
//         } catch {
//             return { overallFeedback: raw, suggestions: '', rating: '' } as any;
//         }
//     }, [feedbackInfo]);
//     return (
//         <div>
//             <Dialog>
//                 <DialogTrigger asChild><Button>Feedback</Button></DialogTrigger>
//                 <DialogContent className="max-w-2xl">
//                     <DialogHeader>
//                     <DialogTitle className="font-bold text-2xl">Interview Feedback</DialogTitle>
//                     <DialogDescription>
//                         <div className="space-y-4 text-gray-800">
//                             <div>
//                                 <h3 className='font-semibold text-lg text-black mb-1'>Feedback</h3>
//                                 <p className="leading-relaxed whitespace-pre-line">
//                                     {parsed.overallFeedback || '—'}
//                                 </p>
//                             </div>
//                             <div>
//                                 <h3 className='font-semibold text-lg text-black mb-1'>Suggestions</h3>
//                                 <p className="leading-relaxed whitespace-pre-line">
//                                     {parsed.suggestions || '—'}
//                                 </p>
//                             </div>
//                             <div>
//                                 <h3 className='font-semibold text-lg text-black mb-1'>Rating</h3>
//                                 <p>{String(parsed.rating || '—')}</p>
//                             </div>
//                         </div>
//                     </DialogDescription>
//                     </DialogHeader>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

// export default FeedbackDialog;
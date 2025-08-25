import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveInterviewQuestion = mutation({
    args: {
        questions: v.any (),
        uid: v.id('UserTable'),
        resumeUrl: v.string(),
        jobTitle : v.string(),
        jobDesciption : v.string()
    },

    handler: async (ctx, args) => {
        const result = await ctx.db.insert('InterviewSessionTable',{
            interviewQuestions: args.questions,
            resumeUrl: args.resumeUrl ?? null,
            jobTitle : args?.jobTitle ?? null,
            jobDesciption : args?.jobDesciption ?? null,
            userId: args.uid,
            status: 'draft',
            feedback: null
        });
        return result;
    }
})

export const GetInterviewQuestion = query({
    args:{
        interviewRecordId : v.id('InterviewSessionTable')
    },
    handler:async(ctx,args) => {
        const result = await ctx.db.query('InterviewSessionTable')
        .filter(q=>q.eq(q.field('_id'),args.interviewRecordId))
        .collect();
        return result;
    }
})

// Save a user's spoken answer as a message tied to an interview
export const SaveInterviewAnswer = mutation({
    args: {
        interviewId: v.id('InterviewSessionTable'),
        questionIndex: v.number(),
        question: v.string(),
        answer: v.string()
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const id = await ctx.db.insert('InterviewMessageTable',{
            interviewId: args.interviewId,
            questionIndex: args.questionIndex,
            question: args.question,
            answer: args.answer,
            createdAt: now
        });
        return id;
    }
})


export const UpdateFeedback = mutation({
    args: {
    recordId: v.id ('InterviewSessionTable'),
     feedback: v. any ()
    },
    handler: async (ctx, args) => {
      const result = await ctx.db.patch(args.recordId, {
        feedback: args. feedback, status: 'complete'
      });
      return result;
    }
  });

// List all saved answers for a given interview
export const ListInterviewAnswers = query({
  args: {
    interviewId: v.id('InterviewSessionTable')
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('InterviewMessageTable')
      .filter(q => q.eq(q.field('interviewId'), args.interviewId))
      .collect();
    // Ensure deterministic order by questionIndex
    return messages.sort((a, b) => (a.questionIndex ?? 0) - (b.questionIndex ?? 0));
  }
})

export const GetInterviewList = query({
  args: {
    userId: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('InterviewSessionTable')
    .filter(q=>q.eq(q.field('userId'),args.userId))
    .order('desc')
    .collect();
    return result;
  }
})
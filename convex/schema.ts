import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
        UserTable : defineTable({
            name : v.string(),
            imageUrl : v.string(),
            email : v.string(),

        }),

        InterviewSessionTable: defineTable({
            interviewQuestions: v.any(),
            resumeUrl: v.union(v.string(),v.null()),
            userId: v.id ( 'UserTable'),
            status: v.string(),
            jobTitle : v.union(v.string(),v.null()),
            jobDesciption : v.union(v.string(),v.null()),
            feedback : v.optional(v.union(v.string(),v.null()))
        }),

        // Stores user spoken answers per question for feedback analysis
        InterviewMessageTable: defineTable({
            interviewId: v.id('InterviewSessionTable'),
            questionIndex: v.number(),
            question: v.string(),
            answer: v.string(),
            createdAt: v.number()
        })
})

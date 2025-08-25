import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUser = mutation({
    args : {
        name : v.string(),
        imageUrl : v.string(),
        email : v.string()
    },
    handler : async(ctx,args) =>{
        // If user Already Exits
        const user = await ctx.db.query('UserTable')
        .filter(q => q.eq(q.field('email'),args.email)).collect()
        // If not then insert user into the database
        if(user?.length == 0){
            const data = {
                name : args.name,
                imageUrl : args?.imageUrl,
                email : args.email
            }
            const result = await ctx.db.insert('UserTable',{
                ...data              
            });

            console.log(result);
            return {
                _id: result,
                ...data
            }
        }
        return user[0];
    }
})
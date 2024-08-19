import { z } from "zod"

export const signupFormValidation = z.object({
    name:z.string().min(2,{
        message: "Name is too short",
    }),
    username: z.string().min(2, {
      message: "Username is too short.",
    }),
    email: z.string().email({message: "Email must be a valid email address"}),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    })
  })

  export const signinFormValidation= z.object({
    email: z.string().email({message: "Email must be a valid email address"}),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    })
  })

  export const PostFormValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(150),
    tags:z.string()

  })

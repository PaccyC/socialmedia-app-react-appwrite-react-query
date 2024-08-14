
import { signupFormValidation } from "../../lib" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { z } from "zod"
import Loader from "../../components/ui/shared/Loader"
import { Link } from "react-router-dom"
import { useToast } from "../../components/ui/use-toast"
import { useCreateUserAccountMutation, useSignInUserMutation } from "../../lib/react-query/queriesAndMutations"


const SignupForm = () => {
const isLoading = false;
const {toast}= useToast()

const {mutateAsync:createUserAccount,isPending:isCreatingUser}= useCreateUserAccountMutation()
const {mutateAsync:signInUser,isPending:isSigningIn}= useSignInUserMutation()


  const form = useForm<z.infer<typeof signupFormValidation>>({
    resolver: zodResolver(signupFormValidation),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password:""
    },
  })

  async function onSubmit(values: z.infer<typeof signupFormValidation>) {
 
   const newUser = await createUserAccount(values)

   if(!newUser) {

   return  toast({
      title: "Sign up failed: Please try again",
    })
   };
   const session = await signInUser({
    email: values.email,
    password: values.password,
   });

   if(!session) {
     return toast({
      title: "Sign in failed: Please try again",
    })
   }

  
  }

  return (
    
      <Form {...form}>
        <div className=" sm:w-420  flex items-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create New Account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
              To use Snapgram, please enter your details
            </p>

        <form onSubmit={form.handleSubmit(onSubmit)}
         className="flex flex-col gap-5 mt-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="shad-input"/>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="shad-input"/>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="shad-input"/>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="shad-input"/>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit"
          
            className=" shad-button_primary">
              
              {isCreatingUser ? (
                <div className=" flex-center gap-2">
                <Loader/> Loading...
                </div>
              ):"Sign Up"}
              </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account? 
          <Link to='/signin' className=" text-primary-500 text-small-semibold ml-1">
            Login
          </Link>
        </p>
        </form>
    </div>
    </Form>
    
  )
}

export default SignupForm
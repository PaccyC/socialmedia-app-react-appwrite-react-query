
import { signinFormValidation } from "../../lib" 
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
import { useSignInUserMutation } from "../../lib/react-query/queriesAndMutations"
import { useUserContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'

const SigninForm = () => {
const navigate= useNavigate();  
const {toast}= useToast()
const {checkAuthUser,isLoading:isUserLoading} = useUserContext();
const {mutateAsync:signInUser}= useSignInUserMutation()


  const form = useForm<z.infer<typeof signinFormValidation>>({
    resolver: zodResolver(signinFormValidation),
    defaultValues: {
      email:"",
      password:""
    },
  })

  async function onSubmit(values: z.infer<typeof signinFormValidation>) {
 
  const session = await signInUser({
    email: values.email,
    password: values.password,
   });

   if(!session) {
     return toast({
      title: "Sign in failed: Please try again",
    })
   }

   const isLoggedIn = await checkAuthUser();

   if(isLoggedIn){
    form.reset();
    navigate("/");
   }
  
   else {
    return  toast({
      title: "Sign up failed: Please try again",
    })
   }
  }

  return (
    
      <Form {...form}>
        <div className=" sm:w-420  flex items-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Login to your Account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
              Welcome back!!! Please enter your details to continue
            </p>

        <form onSubmit={form.handleSubmit(onSubmit)}
         className="flex flex-col gap-5 mt-4 w-full">

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
              
              {isUserLoading ? (
                <div className=" flex-center gap-2">
                <Loader/> Loading...
                </div>
              ):"Sign In"}
              </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
           Doesn't have an account ? 
          <Link to='/signup' className=" text-primary-500 text-small-semibold ml-1">
            Signup
          </Link>
        </p>
        </form>
    </div>
    </Form>
    
  )
}

export default SigninForm
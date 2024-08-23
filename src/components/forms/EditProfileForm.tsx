 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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

import { EditUserFormValidation } from "../../lib"
import { Models } from "appwrite"


interface EditProfileFormProps{
    user?: Models.Document,
}

const EditProfileForm = ({user}:EditProfileFormProps) => {



  const form = useForm<z.infer<typeof EditUserFormValidation>>({
    resolver: zodResolver(EditUserFormValidation),
    defaultValues: {
    //   file:[],
      name: user ? user.name: "",
      username:user ? user.username: "",
      email:user ? user.email: "",
      bio:user ? user.bio: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EditUserFormValidation>) {

   
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
    
     
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Name</FormLabel>
            <FormControl>
              <Input {...field} className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "/>
            </FormControl>
            
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Username</FormLabel>
            <FormControl>
              <Input {...field} className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "/>
            </FormControl>
            
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "/>
            </FormControl>
            
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Bio</FormLabel>
            <FormControl>
              <Input 
              {...field}
           
              className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "/>
            </FormControl>
            
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <div className=" flex gap-3 justify-end items-center">
        <Button 
     
         type="submit"
         className="bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-2 whitespace-nowrap"
         >
        Update Profile
        </Button>
      </div>
    </form>

  </Form>
  )
}

export default EditProfileForm